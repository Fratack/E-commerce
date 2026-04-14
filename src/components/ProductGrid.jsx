import React from 'react'
import ProductCard from './ProductCard'

function ProductGrid({ products }) {
  return (
    <section className="products-section">
      <div className="products-header">
        <h2 className="products-title">I Nostri Prodotti</h2>
      </div>
      
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default ProductGrid
