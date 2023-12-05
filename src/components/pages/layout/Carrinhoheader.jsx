import React, { useState, useEffect } from "react";

const CarrinhoUsuario = ({ usuarioLogado }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Obter os itens do carrinho (aqui assume que você tem os itens do carrinho em localStorage)
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Função para encontrar os itens do carrinho do usuário logado
  const findUserCartItems = () => {
    if (!usuarioLogado || !cartItems || cartItems.length === 0) {
      return [];
    }

    const userCartItems = cartItems.filter(
      (item) => item.usuario === usuarioLogado.id
    );
    return userCartItems;
  };

  const userCartItems = findUserCartItems();

  return (
    <div className="carrinho-usuario">
      <h2>Carrinho do Usuário</h2>
      <ul>
        {userCartItems.map((item) => (
          <li key={item.id}>
            <p>Produto: {item.produto}</p>
            <p>Quantidade: {item.qnt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};