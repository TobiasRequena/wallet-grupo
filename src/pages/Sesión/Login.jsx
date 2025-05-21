import React, { useState } from 'react';
import './login.css'
import { Card, Input, Button, Typography, Space, message } from 'antd';
import { Link } from 'react-router-dom';
import './Login.css'; // Estilos separados
import Endpoints from '../../API/Endpoints'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Login = () => {
  const [alias, setAlias] = useState('');
  const [totp, setTotp] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!alias || !totp) {
      message.warning('Por favor, completa todos los campos.');
      return;
    }

    try{
      setLoading(true);
      const loginConfig = {
        method: 'POST',
        url: Endpoints.getUrl(Endpoints.SESION.LOGIN),
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          username: alias,
          totpToken: totp
        },
      };

      const loginRespose = await axios(loginConfig);
      setData(loginRespose)

      localStorage.setItem('token', loginRespose.data.success);
      localStorage.setItem('user', JSON.stringify(loginRespose.data.user));

      // 2. HISTORIAL DE TRANSACCIONES
      const historialConfig = {
        method: 'POST',
        url: Endpoints.getUrl(Endpoints.TRANSFERENCIA.HISTORIAL), // o Endpoints.getUrl(...) si lo tenés definido
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          username: alias,
          totpToken: totp
        },
      };

      const historialResponse = await axios(historialConfig);

      if (historialResponse.data.success) {
        localStorage.setItem('transactions', JSON.stringify(historialResponse.data.transactions));
        localStorage.setItem('balance', historialResponse.data.user.balance); // opcional
      } else {
        message.warning('Historial no disponible, pero inicio de sesión exitoso.');
      }

      console.log("localStorage", JSON.parse(localStorage.getItem('transactions')));

      message.success('Inicio de sesión exitoso');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      message.error('Error al iniciar sesión. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <Card className="login-card">
        <Title level={1} className="login-title">RauloCoins</Title>
        <Title level={3} className="login-subtitle">Ingresar</Title>

        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Title level={5} className="login-label">Alias</Title>
          <Input placeholder="Alias" value={alias} onChange={(e) => setAlias(e.target.value)}/>
          <Title level={5} className="login-label">TOTP</Title>
          <Input.OTP placeholder="TOTP" value={totp} onChange={setTotp}/>

          <Button type="default" block className="auth0-button">
            Ingresar con Auth0
          </Button>

          <Button type="primary" block onClick={handleLogin} loading={loading}>
            Ingresar
          </Button>

          <div className="login-links">
            <Link to="/sesion/recuperar">Recuperar</Link>
            <Link to="/sesion/registrar">Registrarse</Link>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default Login;
