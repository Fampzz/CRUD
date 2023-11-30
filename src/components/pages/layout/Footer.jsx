import React from 'react'
import "./Footer.css"
export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h2>Seções</h2>
          <ul>
            <li><a href="#inicio">Início</a></li>
            <li><a href="#produtos">Produtos</a></li>
            <li><a href="#contato">Contato</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h2>Contato</h2>
          <p>Endereço: Rua Exemplo, 123</p>
          <p>Email: exemplo@email.com</p>
          <p>Telefone: 123-456-7890</p>
        </div>
        <div className="footer-section">
          <h2>Redes Sociais</h2>
          <ul className="social-links">
            <li><a href="https://www.facebook.com">Facebook</a></li>
            <li><a href="https://www.twitter.com">Twitter</a></li>
            <li><a href="https://www.instagram.com">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 Shopease.com . Todos os direitos reservados.</p>
      </div>
    </div>
  )
}
