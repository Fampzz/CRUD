import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/pages/layout/Layout';
import Home from './components/pages/home/Home';
import Busca from './components/pages/search/Busca';
import NoPage from './components/pages/404/NoPage';
import Produto from './components/pages/product/Produto';
import Categoriaspage from './components/pages/search/Categoriaspage';
import Register from './components/pages/login/Register'
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/busca" element={<Busca />} />
          {/* Defina a rota para a busca com parâmetros dinâmicos */}
          <Route path="/busca/:keywords" element={<Busca />} />
          <Route path="/produto/:id" element={<Produto />} />
          <Route path="/categoria/:categoria" element={<Categoriaspage />} />
          
        </Route>
        <Route path="*" element={<NoPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
