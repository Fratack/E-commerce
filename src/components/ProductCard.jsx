import React from 'react'

function ProductCard({ product }) {
  // Genera stelle per il rating
  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  return (
    <div className="product-card">
      <div style={{ position: 'relative' }}>
        <img 
          src={product.image} 
          alt={product.name}
          className="product-image"
        />
        {product.badge && (
          <span className="product-badge">
            {product.badge}
          </span>
        )}
      </div>
      
      <div className="product-content">
        <h3 className="product-title">{product.name}</h3>
        
        <div className="product-rating">
          {renderStars(product.rating)}
        </div>
        
        <div className="product-price">
          <span className="price-current">€{product.price}</span>
          {product.oldPrice && (
            <span className="price-old">€{product.oldPrice}</span>
          )}
        </div>
        
        <button className="product-button">
          🛒 Aggiungi al Carrello
        </button>
      </div>
    </div>
  )
}

export default ProductCard
