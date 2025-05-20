const BASE_URL = 'https://raulocoin.onrender.com/api';

const SESION = {
  LOGIN: 'user-details',
  REGISTER: 'register',
  RECUPERAR: 'regenerate-totp'
};

const TRANSFERENCIA = {
  BUSCARALIAS: 'search-users',
  TRANSFERIR: 'transfer',
}

const getUrl = (endpoint) => `${BASE_URL}/${endpoint}`;

export default { BASE_URL, SESION, getUrl, TRANSFERENCIA };
