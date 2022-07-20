import axios from "axios";

axios.defaults.baseURL = 'https://todo-lists-dar-main.herokuapp.com/';

const response = (response) => response;

const headers = {
    'Access-Control-Allow-Origin': 'https://mtd-app.herokuapp.com/', 'Access-Control-Allow-Headers': 'Origin'
};

const tasksEndpoint = "/tasks";
const usersEndpoint = "/users";

const requests = {
    get: (url) => axios.get(url, {headers}).then(response),
    post: (url, data, params) => axios.post(url, data, {headers, params}).then(response),
}

export const Tasks = {

    list: (uuid, page, size) => requests.get(`${tasksEndpoint}/${uuid}?page=${page}&size=${size}&delay=1`),

}
export const Users = {

    createUser: (data) => requests.post(`${usersEndpoint}`, data),

}