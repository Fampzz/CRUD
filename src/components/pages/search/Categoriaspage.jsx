import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import jsonData from "../../../../DATA/produtos.json";
import img from "../../../img/IMG.jpg";
import Footer from "../layout/Footer";
import "./busca.css";

const CategoriasPage = () => {
  const [produtosCategoria, setProdutosCategoria] = useState([]);
  const { categoria } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const togglePopup = (id) => {
    setSelectedProduct(selectedProduct === id ? null : id);
  };

  useEffect(() => {
    if (categoria) {
      const produtosFiltrados = jsonData.filter(
        (produto) => produto.categoria.toLowerCase() === categoria.toLowerCase()
      );
      setProdutosCategoria(produtosFiltrados);
    }
  }, [categoria]);
  const filterByPriceLowToHigh = () => {
    const sortedResults = [...produtosCategoria].sort(
      (a, b) => a.preco - b.preco
    );
    setProdutosCategoria(sortedResults);
  };

  const filterByPriceHighToLow = () => {
    const sortedResults = [...produtosCategoria].sort(
      (a, b) => b.preco - a.preco
    );
    setProdutosCategoria(sortedResults);
  };

  const filterByRating = () => {
    const sortedResults = [...produtosCategoria].sort(
      (a, b) => b.avaliacao_geral - a.avaliacao_geral
    );
    setProdutosCategoria(sortedResults);
  };
  const filterByAtoZ = () => {
    const sortedResults = [...produtosCategoria].sort((a, b) =>
      a.nome.localeCompare(b.nome)
    );
    setProdutosCategoria(sortedResults);
  };
  const filterByZtoA = () => {
    const sortedResults = [...produtosCategoria].sort((a, b) =>
      b.nome.localeCompare(a.nome)
    );
    setProdutosCategoria(sortedResults);
  };


  const RatingStars = ({ avaliacao }) => {
    const roundedAvaliacao = Math.round(avaliacao * 2) / 2;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (roundedAvaliacao >= i) {
        stars.push(
          <span className="stars" key={i}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-star-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
          </span>
        );
      } else if (roundedAvaliacao >= i - 0.5) {
        stars.push(
          <span className="stars" key={i}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-star-half"
              viewBox="0 0 16 16"
            >
              <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z" />
            </svg>
          </span>
        );
      } else {
        stars.push(
          <span className="stars " key={i}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-star"
              viewBox="0 0 16 16"
            >
              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
            </svg>
          </span>
        );
      }
    }
    return <div>{stars}</div>;
  };
  const renderCategoryTitle = (categoria) => {
    switch (categoria) {
      case "Eletrônicos":
        return "Produtos Eletrônicos e Celulares";
      case "Roupas":
        return "Roupas";
      case "Beleza":
        return "Produtos de Beleza e Autocuidados";
      case "Casa":
        return "Produtos para sua Casa";
      case "Livros":
        return "Livros";
      case "Esportes":
        return "Produtos Esportivos";
      case "Jóias":
        return "Jóias e Acessórios";
      case "Personalizados":
        return "Produtos Personalizados";
      case "Calçados":
        return "Calçados";
      case "Acessórios":
        return "Acessórios";
      case "Decoração":
        return "Produtos de Decoração";
      case "Brinquedos":
        return "Brinquedos";
      case "Crianças":
        return "Produtos para Crianças";
      default:
        return categoria;
    }
  };

  return (
    <div>
      <div className="container">
        <div className="sidebar">
          <div className="sidebar-busca">
            <p className="busca-title">{renderCategoryTitle(categoria)}</p>
          </div>

          <h3>Filtrar por:</h3>
          <div className="filter-buttons">
            <button onClick={filterByPriceLowToHigh}>Menor preço</button>
            <button onClick={filterByPriceHighToLow}>Maior preço</button>
            <button onClick={filterByRating}>Melhor avaliação</button>
            <button onClick={filterByAtoZ}>A - Z</button>
            <button onClick={filterByZtoA}>Z - A</button>
            {/* Adicione mais botões de filtro conforme necessário */}
          </div>
          <div className="sidebar-horizontal-divider"></div>
          <h3>Categorias</h3>
          <div className="filter-buttons">
          <Link to="/categoria/Eletrônicos"> 
          <button>Produtos Eletrônicos e Celulares</button>
          </Link>

          <Link to="/categoria/Roupas">
            <button>Roupas</button>
          </Link>

          <Link to="/categoria/Beleza">
            <button>Produtos de Beleza e Autocuidados</button>
          </Link>

          <Link to="/categoria/Casa">
            <button>Produtos para sua Casa</button>
          </Link>

          <Link to="/categoria/Livros">
            <button>Livros</button>
          </Link>

          <Link to="/categoria/Esportes">
            <button>Produtos Esportivos</button>
          </Link>

          <Link to="/categoria/Jóias">
            <button>Jóias e Acessórios</button>
          </Link>

          <Link to="/categoria/Personalizados">
            <button>Produtos Personalizados</button>
          </Link>

          <Link to="/categoria/Calçados">
            <button>Calçados</button>
          </Link>

          <Link to="/categoria/Acessórios">
            <button>Acessórios</button>
          </Link>

          <Link to="/categoria/Decoração">
            <button>Produtos de Decoração</button>
          </Link>

          <Link to="/categoria/Brinquedos">
            <button>Brinquedos</button>
          </Link>

          <Link to="/categoria/Crianças">
            <button>Produtos para Crianças</button>
          </Link>
          </div>

        </div>

        <div className="busca-card-area">
          {produtosCategoria.length > 0 ? (
            <div className="busca-anuncios">
              {produtosCategoria.map((produto) => (
                <div className="busca-card-extention" key={produto.id}>
                  <div className="busca-card">
                    <Link to={`/produto/${produto.id}`}>
                      <img
                        src={img}
                        className="busca-card-img"
                        alt={produto.nome}
                      />
                    </Link>
                    <h3 className="busca-titulo">{produto.nome}</h3>
                    <RatingStars avaliacao={produto.avaliacao_geral} />
                    <p className="busca-preco">R${produto.preco}</p>
                  </div>
                  <Link to={`/produto/${produto.id}`}>
                    <button
                      className="busca-card-button"
                      onClick={() => togglePopup(produto.id)}
                    >
                      Ver mais
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-results">
              Nenhum resultado encontrado ou carregando...
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoriasPage;
