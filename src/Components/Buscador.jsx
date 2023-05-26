import { useState, useContext } from "react";
import { PokeApiContext } from '../Context'
import axios from 'axios';
import Layout from "./Layout";

function Buscador () {
	const [resultadoPokemon, setResultadoPokemon] = useState(null);
	const [valorInput, setValorInput] = useState('');
	const [loading, setLoading] = useState(false);
	const context = useContext(PokeApiContext);

	const buscarPokemon = () => {
		setLoading(true)
		if(valorInput.length > 0 ) {
			axios.get(`https://pokeapi.co/api/v2/pokemon/${valorInput}`)
				.then(response => {
					setResultadoPokemon(response.data)
					setLoading(false)
				})
				.catch(error => {
					setResultadoPokemon(null)
					setLoading(false)
					return error;
			});
		} else {
			setResultadoPokemon(null)
			setLoading(false)
		}
	}

	const renderizadoBtn = (id) => {
		const esFavorito = context.pokemonesFavoritos.filter(item => item.id === id).length > 0
		console.log(esFavorito);

		if (!esFavorito) {
			return (
				<button 
					className="btn btn-sm btn-warning" 
					onClick={() => context.setPokemonesFavoritos([...context.pokemonesFavoritos, { 
						'id' : resultadoPokemon.id,
						'nombre' : resultadoPokemon.name,
						'imagen' : resultadoPokemon.sprites.front_default,
						'habilidad' : resultadoPokemon.base_experience
					}]) }
				>
					Agregar Favorito	
				</button>
			)
		}

		return (
			<button className="btn btn-sm btn-success" disabled>Favorito</button>
		)
	}

   return (
		<Layout>
			<div className="row">
				<div className="col-10">
					<input 
						type="text" 
						className='form-control' 
						placeholder='Buscar' 
						onChange={(event) => setValorInput(event.target.value)}
					/>
				</div>
				<div className="col-2">
					<button 
						className="btn btn-success"
						onClick={() => buscarPokemon()}
						disabled={ (loading) ? true : false }
					>
						Buscar
					</button>
				</div>
			</div>
			{
				resultadoPokemon ? (
				<div className="mt-3 border rounded">
					<div className="row justify-content-start">
						<div className="col-3">
						<img src={resultadoPokemon.sprites.front_default} alt={resultadoPokemon.name} className="img-thumbnail m-4"/>
						</div>
						<div className="col-4 mt-4 text-left">
							<p className="text-muted"><i><b>Nombre:</b> { resultadoPokemon.name }</i></p>
							<p className="text-muted"><i><b>Habilidad:</b> { resultadoPokemon.base_experience }%</i></p>
						<div>
							{ renderizadoBtn(resultadoPokemon.id) }
						</div>
						</div>
					</div>
				</div>
				) : (
				<div className="mt-3 rounded">
					<i>Sin resultados</i>
				</div>
				)
			}
		</Layout>
   )
}

export default Buscador;