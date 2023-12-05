import { Outlet, Link, unstable_HistoryRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Usuarios from "../../../../DATA/Usuarios.json";
import Carrinho from "../../../../DATA/carrinho.json";
import "./Layout.css";
import Logo from "../../../img/Logo branca.svg";
import Logo2 from "../../../img/Logo.svg";

export default function Layout() {
  const [Cep, setCep] = useState("");
  const [CepAux, setCepAux] = useState("");
  const [CepAux2, setCepAux2] = useState("");
  const [CepPopup, setCepPopup] = useState(false);
  const [Cart, setCart] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [UsuarioPopup, setUsuarioPopup] = useState(false);
  const [CarrinhoPopup, setCarrinhoPopup] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [emailAux, setEmailAux] = useState("");
  const [senhaAux, setSenhaAux] = useState("");
  const [logado, setLogado] = useState(false);
  const [manterLogado, setManterLogado] = useState(false);
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "../../../../DATA/carrinho.json" // Insira o caminho correto para o arquivo carrinho.json
        );
        setCarrinho(response.data);
      } catch (error) {
        console.error("Erro ao carregar dados do carrinho:", error);
      }
    };

    fetchData();
  }, []);
  function getUserIdByEmail(email) {
    const user = Usuarios.find((usuario) => usuario.email === email);
    return user ? user.id : null;
  }
  
  // Exemplo de uso:
  const userEmail = "exemplo@email.com";
  const userId = getUserIdByEmail(userEmail);
  console.log(userId); // Aqui está o ID do usuário com o email fornecido
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCarrinho(JSON.parse(storedCart));
    }
  }, []);
  


  useEffect(() => {
    const emailSession = sessionStorage.getItem("email");
    const senhaSession = sessionStorage.getItem("senha");
    const manterLogadoSession = sessionStorage.getItem("manterLogado");
    const nomeSession = sessionStorage.getItem("nome");

    const emailLocal = localStorage.getItem("email");
    const senhaLocal = localStorage.getItem("senha");
    const manterLogadoLocal = localStorage.getItem("manterLogado");
    const nomeLocal = localStorage.getItem("nome");

    const isLoggedIn =
      (emailSession && senhaSession) || (emailLocal && senhaLocal);

    setLogado(isLoggedIn);

    if (emailSession && senhaSession) {
      setEmail(emailSession);
      setSenha(senhaSession);
      setManterLogado(manterLogadoSession === "true");
      setNome(nomeSession);
    } else if (emailLocal && senhaLocal) {
      setEmail(emailLocal);
      setSenha(senhaLocal);
      setManterLogado(manterLogadoLocal === "true");
      setNome(nomeLocal);
    }
  }, []);

  useEffect(() => {
    setUsuarios(Usuarios);

    const loggedInUser = sessionStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setLogado(true);
      setEmail(user.email);
      setNome(user.nome);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const user = usuarios.find(
      (usuario) => usuario.email === emailAux && usuario.senha === senhaAux
    );

    if (user) {
      if (manterLogado) {
        sessionStorage.setItem("loggedInUser", JSON.stringify(user));
      }

      localStorage.setItem("token", "seuTokenAqui");
      localStorage.setItem("nome", user.nome);
      localStorage.setItem("email", user.email);
      setLogado(true);
      setEmail(user.email);
      setNome(user.nome);
    } else {
      console.log("Usuário ou senha incorretos");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("loggedInUser");
    localStorage.clear();
    setLogado(false);
    setEmail("");
    // outras ações de logout, se necessário
  };

  const toggleCepPopup = () => {
    setCepPopup(!CepPopup);
    setCarrinhoPopup(false);
    setUsuarioPopup(false);
  };
  const toggleUsuarioPopup = () => {
    setUsuarioPopup(!UsuarioPopup);
    setCarrinhoPopup(false);
    setCepPopup(false);
  };
  const toggleCarrinhoPopup = () => {
    setCarrinhoPopup(!CarrinhoPopup);
    setUsuarioPopup(false);
    setCepPopup(false);
  };

  const ConfirmCep = () => {
    setCepAux2(CepAux);
    toggleCepPopup();
    setCepAux("");
  };
  axios
    .get(`https://viacep.com.br/ws/${CepAux2}/json/`)
    .then((response) => {
      setCep(response.data.localidade + " - " + response.data.uf);
    })
    .catch((error) => {
      console.log(error);
    });
  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCart(JSON.parse(cart).length);
    }
  }, []);

  return (
    <div>
      <header>
        <div className="top-header">
          <Link to="/">
            <div className="logo-container">
              <img src={Logo} alt="Logo Branca" className="logo logo-white" />
              <img
                src={Logo2}
                alt="Logo Colorida"
                className="logo logo-color"
              />
            </div>
          </Link>

          <div className="">
            <form className="busca" action="">
              <input
                type="text"
                placeholder="Pesquisar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Link to={`/busca/${searchTerm}`}>
                <button type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </button>
              </Link>
            </form>
          </div>
        </div>
        <div className="bot-header">
          <div className="cep" onClick={toggleCepPopup}>
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pin-map-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z"
                />
                <path
                  fill-rule="evenodd"
                  d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"
                />
              </svg>
            </div>
            <div className="content"></div>

            {Cep === "" ? <p>Informe seu CEP</p> : <p>{Cep}</p>}
          </div>
          {CepPopup ? (
            <div className="cep-popup">
              <div className="cep-popup-content">
                <div className="cep-popup-info">
                  <h2 className="cep-popup-title">Informe seu CEP</h2>
                  <form action="">
                    <input
                      className="cep-popup-input"
                      type="text"
                      placeholder="CEP"
                      value={CepAux}
                      onChange={(e) => setCepAux(e.target.value)}
                    />
                    <button className="cep-popup-button" onClick={ConfirmCep}>
                      Confirmar
                    </button>
                  </form>
                  <button className="cep-popup-close" onClick={toggleCepPopup}>
                    X
                  </button>
                </div>
              </div>
            </div>
          ) : null}
          <ul>
            <li onClick={toggleUsuarioPopup}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-person"
                viewBox="0 0 16 16"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
              </svg>
              <div className="desc">
                <p className="text1">Olá,</p>
                {!logado ? (
                  <p className="text2">Entre ou cadastre-se</p>
                ) : (
                  <p className="text2">{nome}, Seja bem-vindo</p>
                )}
              </div>
            </li>
            {UsuarioPopup ? (
              <div className="usuario-popup">
                {!logado ? (
                  <div className="usuario-popup-content">
                    <p className="Login-title">Faça login</p>
                    <form onSubmit={handleLogin}>
                      <input
                        className="usuario-popup-input"
                        type="text"
                        placeholder="Email"
                        value={emailAux}
                        onChange={(e) => setEmailAux(e.target.value)}
                      />
                      <input
                        className="usuario-popup-input"
                        type="password"
                        placeholder="Senha"
                        value={senhaAux}
                        onChange={(e) => setSenhaAux(e.target.value)}
                      />
                      <div className="checkbox">
                        <input
                          className="checkbox-input"
                          type="checkbox"
                          checked={manterLogado}
                          onChange={(e) => setManterLogado(e.target.checked)}
                        />
                        <label className="checkbox-label">
                          Manter-me logado
                        </label>
                      </div>
                      <button className="usuario-popup-button" type="submit">
                        Entrar
                      </button>
                      <Link to="/register">
                        <p className="usuario-popup-cadastro" type="">
                          Cadastre-se
                        </p>
                      </Link>
                    </form>
                  </div>
                ) : (
                  // Se estiver logado, mostrar informações do usuário e opção de logout
                  <div className="logado-content">
                    <button className="anunciar-botao">Anunciar</button>
                    <span className="horizontal-divider"></span>
                    <ul className="logado-opcoes">
                      <li>Minha conta</li>
                      <li>Meus pedidos</li>
                      <li>Carrinho</li>
                    </ul>
                    <button
                      className="usuario-popup-button"
                      onClick={handleLogout}
                    >
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : null}

            <li onClick={toggleCarrinhoPopup}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#ffffff"
                class="bi bi-cart"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
              <div className="desc">
                <div className="cart">{Cart}</div>
                <p className="text2">Carrinho</p>
              </div>
            </li>
            {CarrinhoPopup ? (
              <div className="carrinho-popup">
                <div className="carrinho-popup-content">
                  <div className="carrinho-popup-info">
                    <h2 className="carrinho-popup-title">Carrinho</h2>
                    

                    <p className="carrinho-popup-text">
                      Você não possui itens no carrinho
                    </p>
                  </div>

                  <div className="carrinho-popup-info"></div>
                  <div className="carrinho-popup-botoes">
                    <button
                      className="carrinho-popup-button"
                      Link
                      to="/carrinho"
                    >
                      Acessar Carrinho
                    </button>

                    <button
                      className="carrinho-popup-button"
                      onClick={toggleCarrinhoPopup}
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </ul>
        </div>
      </header>

      <Outlet />
    </div>
  );
}
