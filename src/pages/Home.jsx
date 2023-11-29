import Header from "./Header"
import Slider from "./anuncios/Slider"
import './Styles/home.css'
import Topicos from "./anuncios/Topicos"

export default function Home() {
  return (
    <div>
      <Header />
      <div className="slider-container">
        <Slider />
        <Topicos />
      </div>
    </div>
  )
}
