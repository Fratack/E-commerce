import React from 'react'
import Navbar from './components/Navbar'
import ProductGrid from './components/ProductGrid'
import productsData from './data/products.json'

function App() {
  return (
    <div className="app">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="hero">
          <h1 className="hero-title">
            Benvenuto nel Nostro Negozio
          </h1>
          <p className="hero-subtitle">
            Scopri i migliori prodotti tech del momento con il nostro stile esclusivo
          </p>
        </section>
        
        {/* Products Grid */}
        <ProductGrid products={productsData.products} />
      </main>
      
      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">
          © 2026 E-Commerce React. Tutti i diritti riservati.
        </p>
      </footer>
    </div>
  )
}

export default App
