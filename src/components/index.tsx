import React from 'react';

import api from '../services/api';
import backend from '../services/backend';
import Swal from 'sweetalert2';

import {FaSearch, FaTrash} from 'react-icons/fa';
import {MdOutlineCompareArrows} from 'react-icons/md';

import {
    Card,
    ConfirmButton,
    Container,
    Content, ExternalCircle,
    Header, HistoryContainer, MiddleCircle,
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

interface IBase {
    id: number;
    base_experience: number;
}

interface ISprites {
    id: number;
    name: string;
    base_experience: number;
    url: string;
}

interface IHistory {
    pokeLeft: string;
    pokeRight: string;
    tradedAt: string;
}

export function Pokemons() {
    const [pokemons, setPokemons] = React.useState<IPokemon[]>([]);
    const [history, setHistory] = React.useState<IHistory[]>([]);
    const [spritesLeft, setSpritesLeft] = React.useState<ISprites[]>([]);
    const [spritesRight, setSpritesRight] = React.useState<ISprites[]>([]);
    const [baseExperienceLeft, setBaseExperienceLeft] = React.useState<IBase[]>([]);
    const [baseExperienceRight, setBaseExperienceRight] = React.useState<IBase[]>([]);
    const [totalExperienceLeft, setTotalExperienceLeft] = React.useState<Number>(0);
    const [totalExperienceRight, setTotalExperienceRight] = React.useState<Number>(0);
    const [totalExperience, setTotalExperience] = React.useState<Number>(0);
    const [searchLeft, setSearchLeft] = React.useState('');
    const [searchRight, setSearchRight] = React.useState('');
    const [searchMessageLeft, setSearchMessageLeft] = React.useState(false);
    const [searchMessageRight, setSearchMessageRight] = React.useState(false);
    const [canTrade, setCanTrade] = React.useState(false);

    React.useEffect(() => {
        async function getPokemons() {
            if (pokemons.length === 0) {
                const response = await api.get('?limit=10&offset=20');
                setPokemons(response.data.results);
            }
        }

        getPokemons();
    }, [canTrade]);

    React.useEffect(() => {
        async function getHistory() {
            const response = await backend.get('/trades');
            setHistory(response.data);
        }

        getHistory();
    }, [totalExperience]);

    function removePokemon(
        pokemonId: number,
        sprites: ISprites[],
        arraySprites: (spritesArray: ISprites[]) => void,
        baseExperience: IBase[],
        experience: (experienceArray: IBase[]) => void
    ) {
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
                    const updatedPokemons = [...sprites];
                    const FileIndex = updatedPokemons.findIndex(pokemon => pokemon.id === pokemonId);

                    if (FileIndex >= 0) {
                        updatedPokemons.splice(FileIndex, 1);
                        arraySprites(updatedPokemons);
                    }

                    removePokemonExperience(pokemonId,baseExperience, experience);

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

    function removePokemonExperience(
        pokemonId: number,
        baseExperience: IBase[],
        experience: (experienceArray: IBase[]) => void
    ) {
        const updatedPokemons = [...baseExperience];
        const FileIndex = updatedPokemons.findIndex(pokemon => pokemon.id === pokemonId);

        if (FileIndex >= 0) {
            updatedPokemons.splice(FileIndex, 1);

            experience(updatedPokemons);
        }
    }

    async function getPokemonData(
        pokemonUrl: string, sprites: ISprites[],
        arraySprites: (spritesArray: ISprites[]) => void,
        experience: IBase[],
        arrayExperience: (experienceArray: IBase[]) => void
    ) {
        const response = await api.get(`${pokemonUrl}`);

        const pokemonData = {
            id: new Date().getTime(),
            name: response.data.forms[0].name,
            base_experience: response.data.base_experience,
            url: response.data.sprites.front_default
        }
        const experienceData = {
            id: pokemonData.id,
            base_experience: response.data.base_experience
        }

        if (sprites.length > 5) return;

        arraySprites([...sprites, pokemonData]);
        arrayExperience([...experience, experienceData]);
    }

    async function getPokemonImage(
        pokemonName: string, sprites: ISprites[],
        arraySprites: (spritesArray: ISprites[]) => void,
        experience: IBase[],
        arrayExperience: (experienceArray: IBase[]) => void,
        message: (a: boolean) => void
    ) {
        try {
            message(false);
            const response = await api.get(`${pokemonName}`);

            const pokemonData = {
                id: new Date().getTime(),
                name: response.data.forms[0].name,
                base_experience: response.data.base_experience,
                url: response.data.sprites.front_default
            }

            const experienceData = {
                id: pokemonData.id,
                base_experience: response.data.base_experience
            }

            if (sprites.length > 5) return;

            arraySprites([...sprites, pokemonData]);
            arrayExperience([...experience, experienceData]);

        } catch (e) {
            message(true);
        }

    }

    React.useEffect(() => {
        let experienceLeft = 0;
        let experienceRight = 0;

        if (baseExperienceLeft.length !== 0) {
            for (let i = 0; i < baseExperienceLeft.length; i++) {
                let baseNumberLeft = Number(baseExperienceLeft[i].base_experience);

                experienceLeft += baseNumberLeft;
                setTotalExperienceLeft(experienceLeft);
            }
        } else {
            setTotalExperienceLeft(0)
        }

        if (baseExperienceRight.length !== 0) {
            for (let i = 0; i < baseExperienceRight.length; i++) {
                let baseNumberRight = Number(baseExperienceRight[i].base_experience);

                experienceRight += baseNumberRight;
                setTotalExperienceRight(experienceRight);
            }
        } else {
            setTotalExperienceRight(0);
        }


        let diference = Math.abs(experienceLeft - experienceRight);
        setTotalExperience(diference);

        if (diference >= 100 || spritesLeft.length === 0 || spritesRight.length === 0) {
            setCanTrade(false);
        } else {
            setCanTrade(true);
        }

    }, [baseExperienceLeft, baseExperienceRight])

    async function trade() {
        try {

            let pokeLeft: string[] = [];
            spritesLeft.map(pokemon => {
                pokeLeft.push(pokemon.name);
            })

            let pokeRight: string[] = [];
            spritesRight.map(pokemon => {
                pokeRight.push(pokemon.name);
            })

            const body = {
                pokeLeft: pokeLeft,
                pokeRight: pokeRight,
            }

            await backend.post('/trades/save', body);

            await Swal.fire({
                title: 'Trade',
                text: "Success",
                icon: 'success',
                confirmButtonColor: '#ff0000',
                confirmButtonText: 'Cool!'
            });

            setSpritesLeft([]);
            setSpritesRight([]);
            setBaseExperienceLeft([]);
            setBaseExperienceRight([]);
            setTotalExperienceLeft(0);
            setTotalExperienceRight(0);
            setTotalExperience(0);

        } catch (e) {
            await Swal.fire({
                title: 'Trade',
                text: "Failed, Try again",
                icon: 'error',
                confirmButtonColor: '#ff0000',
            });
        }
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
                            <SearchButton
                                onClick={() => getPokemonImage(searchLeft, spritesLeft, setSpritesLeft, baseExperienceLeft, setBaseExperienceLeft, setSearchMessageLeft)}>
                                <FaSearch/>
                            </SearchButton>
                        </SearchBox>
                        {
                            searchMessageLeft ? <p style={{color: 'red'}}>Digite um pokemon existente</p> : <></>
                        }
                    </div>

                    <div style={{marginTop: '30px', height: '100%'}}>
                        {
                            pokemons.map(pokemon => {
                                return (
                                    <>
                                        <Card key={pokemon.name}>
                                            {pokemon.name}
                                            <ConfirmButton
                                                onClick={() => getPokemonData(pokemon.url, spritesLeft, setSpritesLeft, baseExperienceLeft, setBaseExperienceLeft)}>
                                                Select
                                            </ConfirmButton>
                                        </Card>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>

                <div style={{display: 'flex', flexDirection: 'column', position: 'relative'}}>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <Content style={{position: 'relative'}}>
                            {
                                spritesLeft.map(image => {
                                    return (
                                        <PokemonContainer key={image.id}>
                                            <img src={image.url} alt='pokemon'/>
                                            <button style={{border: 'none', cursor: 'pointer'}}
                                                    onClick={() => removePokemon(image.id ,spritesLeft,setSpritesLeft,baseExperienceLeft,setBaseExperienceLeft)}>
                                                <FaTrash/>
                                            </button>
                                        </PokemonContainer>
                                    )
                                })
                            }
                            <p style={{
                                color: 'black',
                                fontWeight: 'bold',
                                position: 'absolute',
                                bottom: '0'
                            }}>Experiencia: {totalExperienceLeft} exp</p>
                        </Content>

                        <div style={{alignSelf: 'center'}}>
                            <div style={{marginLeft: '15%'}}>
                                <p style={{marginBottom: '5px'}}>Max Diff: <br/> <b>100 exp</b></p>
                                <p style={{marginBottom: '5px'}}>Difference: <br/> <b>{totalExperience} exp</b></p>

                            </div>

                            <div>

                                {
                                    canTrade ?
                                        <TradeButton onClick={() => trade()}>Trade</TradeButton>
                                        :
                                        <TradeButton style={{backgroundColor: 'grey'}}>Trade</TradeButton>
                                }
                            </div>

                        </div>

                        <Content style={{position: 'relative'}}>
                            {
                                spritesRight.map(image => {
                                    return (
                                        <PokemonContainer key={image.id}>
                                            <img src={image.url} alt='pokemon'/>
                                            <button style={{border: 'none', cursor: 'pointer'}}
                                                    onClick={() => removePokemon(image.id,spritesRight, setSpritesRight,baseExperienceRight,setBaseExperienceRight)}>
                                                <FaTrash/>
                                            </button>
                                        </PokemonContainer>
                                    )
                                })
                            }
                            <p style={{
                                color: 'black',
                                fontWeight: 'bold',
                                position: 'absolute',
                                bottom: '0'
                            }}>Experiencia: {totalExperienceRight} exp</p>
                        </Content>
                    </div>
                </div>

                <div>
                    <div>
                        <SearchBox>
                            <Search onChange={(e) => setSearchRight(e.target.value)} type="text"
                                    placeholder='Pesquise por um pokemon'/>
                            <SearchButton
                                onClick={() => getPokemonImage(searchRight, spritesRight, setSpritesRight, baseExperienceRight, setBaseExperienceRight, setSearchMessageRight)}>
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
                                            <ConfirmButton
                                                onClick={() => getPokemonData(pokemon.url, spritesRight, setSpritesRight, baseExperienceRight, setBaseExperienceRight)}>
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
            <hr/>
            <div style={{backgroundColor: '#f5f5f5', width: '100%', display: 'flex', flexDirection: 'column'}}>
                <div>
                    <h1 style={{textAlign: 'center'}}>Trade History</h1>
                </div>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    overflowX: 'scroll',
                    overflowY: 'hidden'
                }}>
                    {
                        history.map(item => {
                            const pokeLeft = item.pokeLeft.split(',');
                            const pokeRight = item.pokeRight.split(',');

                            return (
                                <HistoryContainer key={item.tradedAt}>
                                    <ul style={{listStyleType: 'none'}}>
                                        {pokeLeft.map(poke => {
                                            return (
                                                <li style={{margin: '2px 0'}}>{poke}</li>
                                            )
                                        })}
                                    </ul>
                                    <div style={{margin: '0 20px '}}>
                                        <MdOutlineCompareArrows/>

                                    </div>
                                    <ul style={{
                                        listStyleType: 'none',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        {pokeRight.map(poke => {
                                            return (
                                                <li style={{margin: '2px 0'}}>{poke}</li>
                                            )
                                        })}
                                    </ul>

                                </HistoryContainer>
                            )
                        })
                    }
                </div>

            </div>

        </>
    );

}
