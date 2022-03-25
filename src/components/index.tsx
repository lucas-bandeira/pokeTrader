import React from 'react';

import api from '../services/api';
import Swal from 'sweetalert2'

import { FaSearch, FaTrash } from 'react-icons/fa';

import {
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

interface ISprites {
    id: number;
    url: string;
}

export function Pokemons(){
    const [pokemons, setPokemons] = React.useState<IPokemon[]>([]);
    const [spritesLeft, setSpritesLeft] = React.useState<ISprites[]>([]);
    const [spritesRight, setSpritesRight] = React.useState<ISprites[]>([]);
    const [searchLeft, setSearchLeft] = React.useState('');
    const [searchRight, setSearchRight] = React.useState('');
    const [searchMessageLeft, setSearchMessageLeft] = React.useState(false);
    const [searchMessageRight, setSearchMessageRight] = React.useState(false);

    React.useEffect(() => {
        async function getPokemons() {
            console.log('tamanho:', pokemons.length)
            if(pokemons.length === 0){
                const response = await api.get('?limit=15&offset=30');
                console.log('salvei: ', response.data.results);
                setPokemons(response.data.results);
            }

        }
        getPokemons();
    }, []);

    function removePokemonLeft (imageId: number) {
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

        } catch(e) {
            console.log(e);
        }
    }
    function removePokemonRight (imageId: number) {
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

        } catch(e) {
            console.log(e);
        }
    }

    async function getPokemonImageLeft(pokemonName: string) {
        try{
            setSearchMessageLeft(false);
            const response = await api.get(`${pokemonName}`);
            const pokemonData = {
                id: new Date().getTime(),
                url: response.data.sprites.front_default
            }
            if(spritesLeft.length > 5) return;
            setSpritesLeft([...spritesLeft, pokemonData]);
        }catch (e){
            setSearchMessageLeft(true);
        }
    }
    async function getPokemonDataLeft(pokemonUrl: string) {
        const response = await api.get(`${pokemonUrl}`);
        const pokemonData = {
            id: new Date().getTime(),
            url: response.data.sprites.front_default
        }
        if(spritesLeft.length > 5) return;
        setSpritesLeft([...spritesLeft, pokemonData]);
    }

    async function getPokemonImageRight(pokemonName: string) {
        try{
            setSearchMessageRight(false);
            const response = await api.get(`${pokemonName}`);
            const pokemonData = {
                id: new Date().getTime(),
                url: response.data.sprites.front_default
            }
            if(spritesRight.length > 5) return;
            setSpritesRight([...spritesRight, pokemonData]);
        }catch (e){
            setSearchMessageRight(true);
        }

    }
    async function getPokemonDataRight(pokemonUrl: string) {
        const response = await api.get(`${pokemonUrl}`);
        const pokemonData = {
            id: new Date().getTime(),
            url: response.data.sprites.front_default
        }

        if(spritesRight.length > 5) return;

        setSpritesRight([...spritesRight, pokemonData]);
    }



    return (
        <>
            <Header>
                <Title >Pokemon Trader</Title>
            </Header>

                <MiddleContainer>
                    <ExternalCircle>
                        <MiddleCircle>
                            <p>null</p>
                        </MiddleCircle>
                    </ExternalCircle>
                </MiddleContainer>

            <Container >
                <div>
                    <div>
                        <SearchBox>
                            <Search onChange={(e) => setSearchLeft(e.target.value)} type="text" placeholder='Pesquise por um pokemon'/>
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
                                return(
                                    <>
                                        <ul>
                                            <li style={{marginTop: '20px', marginBottom: '20px', position: 'relative'}} key={pokemon.name}>

                                                {pokemon.name}
                                                <ConfirmButton onClick={() => getPokemonDataLeft(pokemon.url)}>Confirm</ConfirmButton>
                                                <hr style={{width: '80%'}}/>
                                            </li>
                                        </ul>
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
                                    <button style={{border: 'none', cursor: 'pointer'}} onClick={() => removePokemonLeft(image.id)}>
                                        <FaTrash/>
                                    </button>
                                </PokemonContainer>
                            )
                        })
                    }
                </Content>

                <div style={{alignSelf: 'center'}}>
                    <TradeButton>Trade</TradeButton>
                </div>

                <Content>
                    {
                        spritesRight.map(image => {
                            return (
                                <PokemonContainer>
                                    <img src={image.url} alt='pokemon'/>
                                    <button style={{border: 'none', cursor: 'pointer'}} onClick={() => removePokemonRight(image.id)}>
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
                            <Search onChange={(e) => setSearchRight(e.target.value)} type="text" placeholder='Pesquise por um pokemon'/>
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
                                return(
                                    <>
                                        <ul>
                                            <li style={{marginTop: '20px', marginBottom: '20px', position: 'relative'}} key={pokemon.name}>
                                                {pokemon.name}
                                                <ConfirmButton onClick={() => getPokemonDataRight(pokemon.url)}>Confirm</ConfirmButton>
                                                <hr style={{width: '80%'}}/>
                                            </li>
                                        </ul>
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
