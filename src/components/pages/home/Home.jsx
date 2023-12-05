import React from 'react';
import "./Home.css";
import Footer from "../layout/Footer";
import TopSlider from './TopSlider';
import Produtos from "../../../../DATA/produtos.json";
import IMG from "../../../img/IMG.jpg";
import Categorias from './Categorias';
import { Link } from 'react-router-dom';
export default function Home() {  
  const Top5Cards = () => {
    const [topProdutos, setTopProdutos] = React.useState([]);
    const [selectedProduct, setSelectedProduct] = React.useState(null);

    const togglePopup = (id) => {
      setSelectedProduct(selectedProduct === id ? null : id);
    };
    

    React.useEffect(() => {
      try {
        // Ordena os produtos pela avaliação em ordem decrescente
        const produtosOrdenados = Produtos.sort((a, b) => b.avaliacao_geral - a.avaliacao_geral);

        // Seleciona os top 5 produtos
        const top5Produtos = produtosOrdenados.slice(0, 5);
          
        setTopProdutos(top5Produtos);
      } catch (error) {
        console.error('Erro ao obter os dados dos produtos:', error);
      }
    }, []);
    const RatingStars = ({ avaliacao }) => {
      // Arredonda a avaliação para o número mais próximo
      const roundedAvaliacao = Math.round(avaliacao * 2) / 2;
    
      // Cria um array de estrelas com base na avaliação arredondada
      const stars = [];
      for (let i = 1; i <= 5; i++) {
        if (roundedAvaliacao >= i) {
          stars.push(<span className='stars' key={i}>&#9733;</span>); // Estrela cheia
        } else if (roundedAvaliacao >= i - 0.5) {
          stars.push(<span className='stars' key={i}>&#9734;&#9733;</span>); // Meia estrela
        } else {
          stars.push(<span className='stars' key={i}>&#9734;</span>); // Estrela vazia
        }
      }
    
      return <div>{stars}</div>;
    };
    return (
      <div className="principais-anuncios">
        {topProdutos.map((produto) => (
          <div className='card-extention' key={produto.id}>
             <div className="card">
             <Link to={`/produto/${produto.id}`}>
            <img src={IMG} className='card-img' alt={produto.nome} />
            </Link>
            <h3 className='titulo'>{produto.nome}</h3>
            <RatingStars avaliacao={produto.avaliacao_geral} />
            <p className='preco'>R${produto.preco}</p>
          </div>
            <button className='card-button' onClick={() => togglePopup(produto.id)}>
              Ver mais
            </button>
            {selectedProduct === produto.id && (
                <div className="popup-background">
                <div className="popup">
                  <img src={IMG} alt={produto.nome} />
            
                  <div className="popup-content">
                    <div className="popup-info">
                      <h2 className="popup-title">{produto.nome}</h2>
                      <p className="popup-price">Preço: R${produto.preco}</p>
                      <p className="popup-description">Quantidade em estoque: {produto.quantidade_estoque}</p>
                      <p className="popup-description">Categoria: {produto.categoria}</p>
                      <p className="popup-description">Avaliação Geral: {produto.avaliacao_geral}</p>
            
                      <button className="popup-close" onClick={togglePopup}>
                        X
                      </button>
                      <Link to={`/produto/${produto.id}`}> 
                      <button className="popup-view-product">
                        Ver Produto
                      </button>
                     </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };
  

  return (
    <div className='home'>
      <div className="slider">
      <TopSlider/>
      </div>
      <div className="home-anuncios">
        <ul>
          <li>
            <p>Anuncio 1</p>
          </li>
          <li>
            <p>Anuncio 2</p>
          </li>
          <li>
            <p>Anuncio 3</p>
          </li>
        </ul>
      </div>

      <div className="principais-anuncios-section">
      <h1>Principais Anúncios <span className='title'>Ver mais</span>  </h1>
      <Top5Cards />
      </div>
    <div className="principais-anuncios-section">
    <h1>Categorias</h1>
    </div>
    <Categorias/>

      <Footer/>
    </div>
  );
}
