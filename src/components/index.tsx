import React from 'react';

import api from '../services/api';
import Swal from 'sweetalert2';

import {FaSearch, FaTrash} from 'react-icons/fa';

import {
    Card,
    ConfirmButton,
    Container,
    Content, ExternalCircle,
    Header, MiddleCircle,
    MiddleContainer, PokemonContainer,
    Search,
    SearchBox,
    SearchButton,
    Title,
    TradeButton
} from "./styles";

interface IPokemon {
    name: string;
    url: string;
}

interface IBase{
    base_experience: number;
}

interface ISprites {
    id: number;
    base_experience: number;
    url: string;
}

export function Pokemons() {
    const [pokemons, setPokemons] = React.useState<IPokemon[]>([]);
    const [spritesLeft, setSpritesLeft] = React.useState<ISprites[]>([]);
    const [spritesRight, setSpritesRight] = React.useState<ISprites[]>([]);
    const [baseExperienceLeft, setBaseExperienceLeft] = React.useState<IBase[]>([]);
    const [baseExperienceRight, setBaseExperienceRight] = React.useState<IBase[]>([]);
    const [searchLeft, setSearchLeft] = React.useState('');
    const [searchRight, setSearchRight] = React.useState('');
    const [searchMessageLeft, setSearchMessageLeft] = React.useState(false);
    const [searchMessageRight, setSearchMessageRight] = React.useState(false);
    const [canTrade, setCanTrade] = React.useState(false);

    React.useEffect(() => {
        async function getPokemons() {
            console.log('tamanho:', pokemons.length)
            if (pokemons.length === 0) {
                const response = await api.get('?limit=10&offset=20');
                console.log('salvei: ', response.data.results);
                setPokemons(response.data.results);
            }
        }

        getPokemons();
    }, []);

    function removePokemonLeft(imageId: number) {
        try {

            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    const updatedFiles = [...spritesLeft];
                    const FileIndex = updatedFiles.findIndex(image => image.id === imageId);

                    if (FileIndex >= 0) {
                        updatedFiles.splice(FileIndex, 1);
                        setSpritesLeft(updatedFiles);
                    }
                    Swal.fire(
                        'Deleted!',
                        'Your pokemon has been deleted.',
                        'success'
                    )
                }
            })

        } catch (e) {
            console.log(e);
        }
    }

    function removePokemonRight(imageId: number) {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    const updatedFiles = [...spritesRight];
                    const FileIndex = updatedFiles.findIndex(image => image.id === imageId);

                    if (FileIndex >= 0) {
                        updatedFiles.splice(FileIndex, 1);
                        setSpritesRight(updatedFiles);
                    }
                    Swal.fire(
                        'Deleted!',
                        'Your Pokemon has been deleted.',
                        'success'
                    )
                }
            })

        } catch (e) {
            console.log(e);
        }
    }

    async function getPokemonImageLeft(pokemonName: string) {
        try {
            setSearchMessageLeft(false);
            const response = await api.get(`${pokemonName}`);
            const pokemonData = {
                id: new Date().getTime(),
                base_experience: response.data.base_experience,
                url: response.data.sprites.front_default
            }

            if (spritesLeft.length > 5) return;
            setSpritesLeft([...spritesLeft, pokemonData]);
            setBaseExperienceLeft([...baseExperienceLeft, pokemonData.base_experience])
        } catch (e) {
            setSearchMessageLeft(true);
        }
    }

    async function getPokemonDataLeft(pokemonUrl: string) {
        const response = await api.get(`${pokemonUrl}`);
        const pokemonData = {
            id: new Date().getTime(),
            base_experience: response.data.base_experience,
            url: response.data.sprites.front_default
        }
        if (spritesLeft.length > 5) return;
        setSpritesLeft([...spritesLeft, pokemonData]);
        setBaseExperienceLeft([...baseExperienceLeft, pokemonData.base_experience])
    }

    async function getPokemonImageRight(pokemonName: string) {
        try {
            setSearchMessageRight(false);
            const response = await api.get(`${pokemonName}`);
            const pokemonData = {
                id: new Date().getTime(),
                base_experience: response.data.base_experience,
                url: response.data.sprites.front_default
            }

            if (spritesRight.length > 5) return;

            setSpritesRight([...spritesRight, pokemonData]);
            setBaseExperienceRight([...baseExperienceRight,pokemonData.base_experience])

        } catch (e) {
            setSearchMessageRight(true);
        }

    }

    async function getPokemonDataRight(pokemonUrl: string) {
        const response = await api.get(`${pokemonUrl}`);
        const pokemonData = {
            id: new Date().getTime(),
            base_experience: response.data.base_experience,
            url: response.data.sprites.front_default
        }

        if (spritesRight.length > 5) return;

        setSpritesRight([...spritesRight, pokemonData]);
        setBaseExperienceRight([...baseExperienceRight, pokemonData.base_experience])

    }

    React.useEffect(() => {
        let experienceLeft = 0;
        let experienceRight = 0;

        for(let i=0; i < baseExperienceLeft.length; i++){
            let baseNumberLeft = Number(baseExperienceLeft[i]);

            experienceLeft += baseNumberLeft;
        }

        for(let i=0; i < baseExperienceRight.length; i++){
            let baseNumberRight = Number(baseExperienceRight[i]);

            experienceRight += baseNumberRight;
        }

        let diference = Math.abs(experienceLeft - experienceRight);

        if(diference >= 100){
            setCanTrade(true);
        }else{
            setCanTrade(false);
        }
    }, [spritesLeft,spritesRight])

    function trade() {
        alert("trocou");
    }


    return (
        <>
            <Header>
                <Title>Pokemon Trader</Title>
            </Header>

            <MiddleContainer>
                <ExternalCircle>
                    <MiddleCircle>
                        <p>null</p>
                    </MiddleCircle>
                </ExternalCircle>
            </MiddleContainer>

            <Container>
                <div>
                    <div>
                        <SearchBox>
                            <Search onChange={(e) => setSearchLeft(e.target.value)} type="text"
                                    placeholder='Pesquise por um pokemon'/>
                            <SearchButton onClick={() => getPokemonImageLeft(searchLeft)}>
                                <FaSearch/>
                            </SearchButton>
                        </SearchBox>
                        {
                            searchMessageLeft ? <p style={{color: 'red'}}>Digite um pokemon existente</p> : <></>
                        }

                    </div>

                    <div style={{marginTop: '30px', marginLeft: '15px'}}>
                        {
                            pokemons.map(pokemon => {
                                return (
                                    <>
                                        <Card key={pokemon.name}>
                                            {pokemon.name}
                                            <ConfirmButton onClick={() => getPokemonDataLeft(pokemon.url)}>
                                                Select
                                            </ConfirmButton>
                                        </Card >
                                    </>
                                )
                            })
                        }
                    </div>
                </div>

                <Content>
                    {
                        spritesLeft.map(image => {
                            return (
                                <PokemonContainer>
                                    <img src={image.url} alt='pokemon'/>
                                    <button style={{border: 'none', cursor: 'pointer'}}
                                            onClick={() => removePokemonLeft(image.id)}>
                                        <FaTrash/>
                                    </button>
                                </PokemonContainer>
                            )
                        })
                    }
                </Content>

                <div style={{alignSelf: 'center'}}>
                    {
                        canTrade ? <TradeButton onClick={() => trade()}>Trade</TradeButton> : <TradeButton style={{backgroundColor: 'grey'}} >Trade</TradeButton>
                    }
                </div>

                <Content>
                    {
                        spritesRight.map(image => {
                            return (
                                <PokemonContainer>
                                    <img src={image.url} alt='pokemon'/>
                                    <button style={{border: 'none', cursor: 'pointer'}}
                                            onClick={() => removePokemonRight(image.id)}>
                                        <FaTrash/>
                                    </button>
                                </PokemonContainer>
                            )
                        })
                    }
                </Content>
                <div>
                    <div>
                        <SearchBox>
                            <Search onChange={(e) => setSearchRight(e.target.value)} type="text"
                                    placeholder='Pesquise por um pokemon'/>
                            <SearchButton onClick={() => getPokemonImageRight(searchRight)}>
                                <FaSearch/>
                            </SearchButton>
                        </SearchBox>
                        {
                            searchMessageRight ? <p style={{color: 'red'}}>Digite um pokemon existente</p> : <></>
                        }
                    </div>

                    <div style={{marginTop: '30px'}}>
                        {
                            pokemons.map(pokemon => {
                                return (
                                    <>
                                        <Card key={pokemon.name}>
                                            {pokemon.name}
                                            <ConfirmButton onClick={() => getPokemonDataRight(pokemon.url)}>
                                                Select
                                            </ConfirmButton>
                                        </Card>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
            </Container>


        </>
    );

}
