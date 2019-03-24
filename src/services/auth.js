import api from './api';

export const TOKEN_KEY = "access_token";
export const isAuthenticated = () => {
    let token = localStorage.getItem(TOKEN_KEY);
    if(token === '' || token === undefined){
        return null;
    }
    return token;
}
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => {
    localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
};