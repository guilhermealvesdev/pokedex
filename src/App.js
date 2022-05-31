import React, {useState, useEffect} from 'react';
import PokemonList from './Components/PokemonList'
import Pagination from './Components/Pagination'
import axios from 'axios'


function App() {
    const [pokemon, setPokemon] = useState([]);
    const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
    const [nextPageUrl, setNextPageUrl] = useState();
    const [prevPageUrl, setPrevPageUrl] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        
        let cancel;

        // O segundo parâmetro passa um token que cancela o request anterior
        axios.get(currentPageUrl, {
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then((res) => {
            setNextPageUrl(res.data.next) //Próxima página
            setPrevPageUrl(res.data.previous) //Página anterior
            setPokemon(res.data.results.map(pokemon => pokemon.name))
            setLoading(false);
        });

        //Cada vez que o useEffect rodar, ele vai rodar a função cancel pra cancelar o request
        return () => cancel();

    }, [currentPageUrl])


    function gotoNextPage() {
        setCurrentPageUrl(nextPageUrl);
    }

    function gotoPrevPage() {
        setCurrentPageUrl(prevPageUrl);
    }

    if (loading) return "Carregando..."

    return (
        <>
            <PokemonList pokemon={pokemon} />
            <Pagination
                gotoNextPage = {nextPageUrl ? gotoNextPage : null} //Caso houver algo no estado do nextPageUrl, ok. Se não tiver, passa null.
                gotoPrevPage = {prevPageUrl ? gotoPrevPage : null}
            />
        </>
    );
}

export default App;
