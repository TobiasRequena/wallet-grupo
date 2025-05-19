import React from 'react';
import { Card, Input, Button, Typography, Space } from 'antd';
import { Link } from 'react-router-dom';
import './Login.css'; // Reutilizamos los estilos

const { Title } = Typography;

const Recuperar = () => {
  return (
    <div className="login-container">
      <Card className="login-card">
        <Title level={1} className="login-title">RauloCoins</Title>
        <Title level={3} className="login-subtitle">Recuperar sesión</Title>

        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Title level={5} className="login-label">Alias</Title>
          <Input placeholder="Alias" />
          <Title level={5} className="login-label">Email</Title>
          <Input placeholder="Email" type="email" />

          <Button type="primary" block className="recovery-button">
            Recuperar
          </Button>

          <div className="login-links">
            <Link to="/sesion/login" >Ingresar</Link>
            <Link to="/sesion/registrar" >Registrarse</Link>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default Recuperar;
