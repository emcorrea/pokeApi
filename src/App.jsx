
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { PokeApiProvider } from '../src/Context'
import Favoritos from "./Components/Favoritos";
import Buscador from "./Components/Buscador";

function App() {

  return (
    <PokeApiProvider>
      <div className='card m-5'>
        <div className="card-header bg-dark text-white">
          Poke API
        </div>
        <div className="card-body">
          <div className='row'>
              <Buscador />
              <Favoritos />
          </div>
        </div>
      </div>
    </PokeApiProvider>
  )
}

export default App
