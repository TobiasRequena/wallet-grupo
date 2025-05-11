import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Login() {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div style={{ padding: 20 }}>
      {isAuthenticated ? (
        <>
          <h2>Bienvenido, {user.name}</h2>
          <p>Email: {user.email}</p>
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Cerrar sesión
          </button>
        </>
      ) : (
        <button onClick={() => loginWithRedirect()}>Iniciar sesión</button>
      )}
      {console.log(user)}
    </div>
  );
}

export default Login;
