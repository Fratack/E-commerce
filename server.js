import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { networkInterfaces } from 'os';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const DATA_DIR = path.join(__dirname, 'data');
const PORT = process.env.PORT || 3001;
const ADMIN_PASSWORD = '$ono1Milionario!';

app.use(express.json());
app.use(express.static(__dirname)); // serve index.html, immagini, svg, ecc.

// ── Helpers ──────────────────────────────────────────────
const readJSON = (file) => {
    const fp = path.join(DATA_DIR, file);
    if (!fs.existsSync(fp)) return null;
    return JSON.parse(fs.readFileSync(fp, 'utf8'));
};

const writeJSON = (file, data) => {
    fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2));
};

const requireAuth = (req, res, next) => {
    if (req.headers['x-admin-password'] !== ADMIN_PASSWORD)
        return res.status(401).json({ error: 'Non autorizzato' });
    next();
};

// ── Prodotti ─────────────────────────────────────────────
app.get('/api/products', (req, res) => {
    res.json(readJSON('products.json') || []);
});

app.post('/api/products', requireAuth, (req, res) => {
    const products = readJSON('products.json') || [];
    const product = { ...req.body, inStock: true };
    products.push(product);
    writeJSON('products.json', products);
    res.json(product);
});

app.put('/api/products/:id', requireAuth, (req, res) => {
    const products = readJSON('products.json') || [];
    const idx = products.findIndex(p => String(p.id) === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Prodotto non trovato' });
    products[idx] = { ...req.body, inStock: true };
    writeJSON('products.json', products);
    res.json(products[idx]);
});

app.delete('/api/products/:id', requireAuth, (req, res) => {
    const products = readJSON('products.json') || [];
    const filtered = products.filter(p => String(p.id) !== req.params.id);
    writeJSON('products.json', filtered);
    res.json({ ok: true });
});

// ── Navigazione ───────────────────────────────────────────
app.get('/api/nav', (req, res) => {
    res.json(readJSON('nav.json'));
});

app.post('/api/nav', requireAuth, (req, res) => {
    writeJSON('nav.json', req.body);
    res.json({ ok: true });
});

// ── Catch-all: serve index.html per le route del frontend ─────────────────
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ── Avvio ─────────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Sito avviato su http://localhost:${PORT}`);
    const nets = networkInterfaces();
    for (const iface of Object.values(nets)) {
        for (const net of iface) {
            if (net.family === 'IPv4' && !net.internal) {
                console.log(`📱 Da mobile (stesso WiFi): http://${net.address}:${PORT}`);
            }
        }
    }
});
