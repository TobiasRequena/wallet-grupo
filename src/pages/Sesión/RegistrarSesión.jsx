import React from 'react';
import { Card, Input, Button, Typography, Space } from 'antd';
import { Link } from 'react-router-dom';
import './Login.css';

const { Title } = Typography;

const RegistrarSesion = () => {
  return (
    <div className="login-container">
      <Card className="login-card">
        <Title level={1} className="login-title">RauloCoins</Title>
        <Title level={3} className="login-subtitle">Registrarse</Title>

        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Title level={5} className="login-label">Nombre Completo</Title>
          <Input placeholder="Nombre Completo" />
          <Title level={5} className="login-label">Alias</Title>
          <Input placeholder="Alias" />
          <Title level={5} className="login-label">Email</Title>
          <Input placeholder="Email" type="email" />

          <Button type="default" block className="auth0-button">
            Registrarse con Auth0
          </Button>

          <Button type="primary" block>
            Registrarse
          </Button>

          <div className="login-links" style={{ justifyContent: 'center' }}>
            <Link to="/sesion/login">Ingresar</Link>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default RegistrarSesion;
