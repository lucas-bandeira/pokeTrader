import axios from 'axios';

const backend = axios.create({
    baseURL: 'https://the-poke-trader.herokuapp.com/',
})

export default backend;
