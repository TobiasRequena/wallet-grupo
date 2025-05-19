import React from 'react';
import './login.css'
import { Card, Input, Button, Typography, Space } from 'antd';
import { Link } from 'react-router-dom';
import './Login.css'; // Estilos separados

const { Title } = Typography;

const Login = () => {
  return (
    <div className="login-container">
      <Card className="login-card">
        <Title level={1} className="login-title">RauloCoins</Title>
        <Title level={3} className="login-subtitle">Ingresar</Title>

        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Title level={5} className="login-label">Alias</Title>
          <Input placeholder="Alias" />
          <Title level={5} className="login-label">TOTP</Title>
          <Input.OTP placeholder="TOTP" />

          <Button type="default" block className="auth0-button">
            Ingresar con Auth0
          </Button>

          <Button type="primary" block>
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
