const BASE_URL = 'https://raulocoin.onrender.com/api';

const SESION = {
  LOGIN: 'user-details',
  REGISTER: 'register',
  RECUPERAR: 'regenerate-totp',
  VERIFICAR: 'verify-totp-setup',
};

const TRANSFERENCIA = {
  BUSCARALIAS: 'search-users',
  TRANSFERIR: 'transfer',
  HISTORIAL: 'transactions'
}

const getUrl = (endpoint) => `${BASE_URL}/${endpoint}`;

export default { BASE_URL, SESION, getUrl, TRANSFERENCIA };
