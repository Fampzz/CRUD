import React, { useState } from 'react';
import axios from 'axios';

const Cep = () => {
  const [cep, setCep] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setCep(event.target.value);
  };

  const fetchData = () => {
    axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => {
        setData(response.data);
        setError('');
      })
      .catch(error => {
        setData(null);
        setError('Erro ao buscar as informações do CEP. Verifique se o CEP é válido.');
      });
  };

  return (
    <div>
      <input
        type="text"
        value={cep}
        onChange={handleInputChange}
        placeholder="Digite um CEP"
      />
      <button onClick={fetchData}>Buscar</button>

      {error && <p>{error}</p>}

      {data && (
        <div>
          <h2>Informações do CEP:</h2>
          <p>CEP: {data.cep}</p>
          <p>Logradouro: {data.logradouro}</p>
          <p>Bairro: {data.bairro}</p>
          <p>Cidade: {data.localidade}</p>
          <p>Estado: {data.uf}</p>
        </div>
      )}
    </div>
  );
};

export default Cep;
