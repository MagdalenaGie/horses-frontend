import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://horses-database-bd1proj.herokuapp.com'
});

export default instance;