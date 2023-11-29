import ReactDOM from 'react-dom/client'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path="/" >
      <Route index element={<Home />} />
    </Route>
  </Routes>
</BrowserRouter>
)
