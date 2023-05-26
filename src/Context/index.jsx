import { createContext, useState } from "react";

export const PokeApiContext = createContext()

export const PokeApiProvider = ({children}) => {
	const [pokemonesFavoritos, setPokemonesFavoritos] = useState([]);

	return (
		<PokeApiContext.Provider value={{
			pokemonesFavoritos,
			setPokemonesFavoritos
		}}>
			{ children }
		</PokeApiContext.Provider>
	)
}