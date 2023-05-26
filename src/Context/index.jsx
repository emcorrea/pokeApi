import { createContext, useState } from "react";

export const PokeApiContext = createContext()

export const PokeApiProvider = ({children}) => {
	const [pokemonesFavoritos, setPokemonesFavoritos] = useState([]);
	const [resultadoPokemon, setResultadoPokemon] = useState(null);
	const [valorInput, setValorInput] = useState('');
	const [loading, setLoading] = useState(false);

	return (
		<PokeApiContext.Provider value={{
			pokemonesFavoritos,
			setPokemonesFavoritos,
			resultadoPokemon,
			setResultadoPokemon,
			valorInput,
			setValorInput,
			loading,
			setLoading
		}}>
			{ children }
		</PokeApiContext.Provider>
	)
}