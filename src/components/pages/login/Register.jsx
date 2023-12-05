import React, { useState } from 'react';
import Usuarios from '../../../../DATA/Usuarios.json'; // Importe seu arquivo JSON
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    telefone: '',
    TabelaDados: '',
    carrinho: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { nome, email, senha, telefone } = formData;

    // Encontra o último ID existente no arquivo JSON
    const ultimoId = Usuarios.reduce((maxId, user) => (user.id > maxId ? user.id : maxId), 0);

    // Gere um novo ID para o usuário
    const novoId = ultimoId + 1;

    // Crie o novo objeto de usuário
    const newUserData = {
      id: novoId,
      nome,
      email,
      senha,
      telefone,
      TabelaDados: '',
      carrinho: ''
    };

    // Adicione o novo usuário ao array existente
    Usuarios.push(newUserData);

    // Atualize o arquivo JSON com os novos dados de usuário
    // Aqui você precisa implementar a lógica para salvar o arquivo novamente, dependendo do seu ambiente (backend, Node.js, etc.)
    // Exemplo: supondo que você tenha uma função para salvar o arquivo:
    // saveUsuarios(Usuarios);

    // Salva os dados de nome e email no localStorage
    localStorage.setItem('nome', nome);
    localStorage.setItem('email', email);

    // Redireciona o usuário para a página desejada após o registro
    return (
      <Link to="/login">Ir para a página de login</Link>
    );
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nome de usuário:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmar senha:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegisterPage;
