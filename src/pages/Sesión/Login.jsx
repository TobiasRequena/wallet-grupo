import React, { useState } from 'react';
import './login.css'
import { Card, Input, Button, Typography, Space, message } from 'antd';
import { Link } from 'react-router-dom';
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

      sessionStorage.setItem('token', loginRespose.data.success);
      sessionStorage.setItem('user', JSON.stringify(loginRespose.data));

      const historialConfig = {
        method: 'POST',
        url: Endpoints.getUrl(Endpoints.TRANSFERENCIA.HISTORIAL),
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
        sessionStorage.setItem('transactions', JSON.stringify(historialResponse.data.transactions));
        sessionStorage.setItem('balance', historialResponse.data.user.balance);
      }

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
      <h1 className="login-title title-h1">RauloCoins</h1>
      <Card className="login-card" bodyStyle={{ padding: '12px' }}>
        <h3 className="title-h3">INGRESAR</h3>

        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <h5 className="title-h5">Alias</h5>
          <Input placeholder="Alias" value={alias} onChange={(e) => setAlias(e.target.value)}/>
          <h5 className="title-h5">TOTP</h5>
          <Input.OTP placeholder="TOTP" value={totp} onChange={setTotp}/>

          <Button style={{ cursor: 'not-allowed' }} disabled type="default" block className="auth0-button">
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
