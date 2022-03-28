import axios from 'axios';

const backend = axios.create({
    baseURL: 'https://the-poke-trader-api.herokuapp.com',
})

export default backend;
