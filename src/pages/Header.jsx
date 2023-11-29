import { React, useState } from 'react'
import './Styles/header.css'
import logo from '../img/Logo branca.svg'
import Popup from 'reactjs-popup';

export default function Header() {

    const [Cart, setCart] = useState(0)
    const [Cep, setCep] = useState('0')
    const [Cepaux, setCepaux] = useState('')
    const [showPopup, setShowPopup] = useState(false);

    const openPopup = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    function validarCep(Cepaux) {
        Cepaux = Cepaux.replace(/\D/g, "");
        if (Cepaux !== "") {
            var validacep = /^[0-9]{8}$/;
            if (validacep.test(Cepaux)) {
                setCep(Cepaux)
                return true;
            }
        }
        return false;
    }

    function buscarCep(cep) {
        if (validarCep(cep)) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then((response) => response.json())
                .then((data) => {
                    setCepaux(data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
    

    return (
        <div>
            <header className='header'>
                <div className='header-top'>
                    <img src={logo}></img>
                    <div className='header-search'>
                        <input type='text' placeholder='Pesquisar'></input>
                        <button type='submit'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg></button>
                    </div>
                    
                </div>
                <div className="header-bottom">
                    <div className="cep">
                        <div className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pin-map-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z" />
                            <path fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z" />
                        </svg></div>
                        <div className="content">
                        </div>

                        {Cep === '0' ? (
                            <p onClick={openPopup}>Informe seu CEP</p>
                        ) : (
                            <p>CEP: {Cep}</p>
                        )}
                        
                    </div>
                    <ul>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />

                            </svg>
                            <div className="desc">
                                <p className='text1'>Olá,</p>
                                <p className='text2'>Entre ou cadastre-se</p>
                            </div>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-cart" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                            </svg>
                            <div className="desc">
                                <div className="cart">{Cart}</div>
                                <p className='text2'>Carrinho</p>
                            </div>
                        </li>
                    </ul>
                    {showPopup && (
                            <div className="popup">
                                <div className="popup-content">
                                    <span className="close" onClick={closePopup}>
                                        &times;
                                    </span>
                                    <p>Informe seu CEP</p>
                                    <div className="input">
                                    <input type='text'  placeholder='CEP'></input>
                                    <button>Confirmar</button>
                                    </div>
                                </div>
                            </div>
                        )}

                </div>

            </header>

        </div>
    )
}
