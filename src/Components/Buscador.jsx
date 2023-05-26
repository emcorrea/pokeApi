import { useState, useContext } from "react";
import { PokeApiContext } from '../Context'
import axios from 'axios';
import Layout from "./Layout";

function Buscador () {
	const context = useContext(PokeApiContext);

	const buscarPokemon = () => {
		context.setLoading(true)
		if(context.valorInput.length > 0 ) {
			axios.get(`https://pokeapi.co/api/v2/pokemon/${context.valorInput}`)
				.then(response => {
					context.setResultadoPokemon(response.data)
					context.setLoading(false)
				})
				.catch(error => {
					context.setResultadoPokemon(null)
					context.setLoading(false)
					return error;
			});
		} else {
			context.setResultadoPokemon(null)
			context.setLoading(false)
		}
	}

	const renderizadoBtn = (id) => {
		const esFavorito = context.pokemonesFavoritos.filter(item => item.id === id).length > 0

		if (!esFavorito) {
			return (
				<button 
					className="btn btn-sm btn-warning" 
					onClick={() => context.setPokemonesFavoritos([...context.pokemonesFavoritos, { 
						'id' : context.resultadoPokemon.id,
						'nombre' : context.resultadoPokemon.name,
						'imagen' : context.resultadoPokemon.sprites.front_default,
						'habilidad' : context.resultadoPokemon.base_experience
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
						onChange={(event) => context.setValorInput(event.target.value)}
					/>
				</div>
				<div className="col-2">
					<button 
						className="btn btn-success"
						onClick={() => buscarPokemon()}
						disabled={ (context.loading) ? true : false }
					>
						Buscar
					</button>
				</div>
			</div>
			{
				context.resultadoPokemon ? (
				<div className="mt-3 border rounded">
					<div className="row justify-content-start">
						<div className="col-3">
						<img src={context.resultadoPokemon.sprites.front_default} alt={context.resultadoPokemon.name} className="img-thumbnail m-4"/>
						</div>
						<div className="col-4 mt-4 text-left">
							<p className="text-muted"><i><b>Nombre:</b> { context.resultadoPokemon.name }</i></p>
							<p className="text-muted"><i><b>Habilidad:</b> { context.resultadoPokemon.base_experience }%</i></p>
						<div>
							{ renderizadoBtn(context.resultadoPokemon.id) }
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