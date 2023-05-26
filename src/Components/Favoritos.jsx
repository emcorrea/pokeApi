import { useContext } from "react";
import { PokeApiContext } from '../Context'
import Layout from "./Layout";

function Favoritos () {
   const context = useContext(PokeApiContext);
	
	const eliminarFavorito = id => {
		const favoritos = context.pokemonesFavoritos.filter(item => item.id != id);
		context.setPokemonesFavoritos(favoritos);
	}

   return (
		<Layout>
         <span>Mis Favoritos</span>
			{
				<table className="table table-bordered table-sm mt-4">
					<thead className="bg-dark">
						<tr>
							<th className="text-white">ID</th>
							<th className="text-white">Pokemon</th>
							<th className="text-white">Nombre</th>
							<th className="text-white">Habilidad</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{
							context.pokemonesFavoritos?.map(valor => (
								<tr>
									<td className="text-center">{valor.id}</td>
									<td className="text-center"><img src={valor.imagen} alt={valor.nombre} /></td>
									<td className="text-center">{valor.nombre}</td>
									<td className="text-center"><span class="badge text-bg-info">{valor.habilidad}%</span></td>
									<td className="text-center">
										<button className="btn btn-sm btn-danger" onClick={() => eliminarFavorito(valor.id)}>
											Eliminar
										</button>
									</td>
								</tr>
							))
						}
					</tbody>
				</table>

			}
		</Layout>
   )
}

export default Favoritos;