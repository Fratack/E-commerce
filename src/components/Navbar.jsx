import React from 'react'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          <img src="/logo.svg" alt="Aitycons" style={{ height: '88px', width: 'auto' }} />
        </a>
        
        <ul className="navbar-menu">
          <li>
            <a href="/" className="active">
              🏠 Home
            </a>
          </li>
          <li>
            <a href="/prodotti">
              🛍️ Prodotti
            </a>
          </li>
          <li>
            <a href="/info">
              ℹ️ Info
            </a>
          </li>
        </ul>
        
        <div className="navbar-icons">
          <div className="navbar-icon" title="Cerca">
            🔍
          </div>
          <div className="navbar-icon" title="Carrello">
            🛒
          </div>
          <div className="navbar-icon" title="Account">
            👤
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
