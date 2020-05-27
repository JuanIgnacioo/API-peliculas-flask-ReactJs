
import axios from 'axios';
import Swal from 'sweetalert2';

const getAPImovieCast = (id) => {
    return axios
        .get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=3cee3748aaea0df0145414e5cb47570c`)
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

const getAPItrailer = (id) => {
    return axios
        .get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=3cee3748aaea0df0145414e5cb47570c`)
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

const obtenerHeroe = (id) => {
    return axios
        .post("http://localhost:5000/obtenerPorId", {
            id
        })
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}



export{
    getAPImovieCast,
    getAPItrailer,
    obtenerHeroe
}