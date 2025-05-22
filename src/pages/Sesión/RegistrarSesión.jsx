import React, { useState } from 'react';
import { Card, Input, Button, Typography, Space, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ModalTOTPRe from '../../components globales/ModalTOTPRe';
import Endpoints from '../../API/Endpoints';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const RegistrarSesion = () => {
  const [form, setForm] = useState({
    name: '',
    username: '',
    email: ''
  });

  const [loading, setLoading] = useState(false);
  const [showModalTOTP, setShowModalTOTP] = useState(false);
  const [totpSetup, setTotpSetup] = useState(null);

    const navigate = useNavigate();

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await axios.post(Endpoints.getUrl(Endpoints.SESION.REGISTER), form);
      const data = response.data;

      if (data.success) {
        message.success(data.message);
        setTotpSetup(data.totpSetup);
        setShowModalTOTP(true);
      } else {
        message.error(data.message || 'Error al registrarse');
      }
    } catch (error) {
      message.error(
        error.response?.data?.message || 'Error de conexión con el servidor'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTotpSuccess = (data) => {
    console.log('Verificación completa:', data);
    // Redirigir al home, guardar token, etc.
    sessionStorage.setItem('token', data.token);
    navigate('/dashboard')
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <Title level={1} className="login-title">RauloCoins</Title>
        <Title level={3} className="login-subtitle">Registrarse</Title>

        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Title level={5} className="login-label">Nombre Completo</Title>
          <Input
            placeholder="Nombre Completo"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />

          <Title level={5} className="login-label">Alias</Title>
          <Input
            placeholder="Alias"
            value={form.username}
            onChange={(e) => handleChange('username', e.target.value)}
          />

          <Title level={5} className="login-label">Email</Title>
          <Input
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />

          <Button type="default" block className="auth0-button" style={{ cursor: 'not-allowed' }} disabled>
            Registrarse con Auth0
          </Button>

          <Button
            type="primary"
            block
            loading={loading}
            onClick={handleRegister}
          >
            Registrarse
          </Button>

          <div className="login-links" style={{ justifyContent: 'center' }}>
            <Link to="/sesion/login">Ingresar</Link>
          </div>
        </Space>
      </Card>

      <ModalTOTPRe
        visible={showModalTOTP}
        onClose={() => setShowModalTOTP(false)}
        username={form.username}
        totpSetup={totpSetup}
        onSuccess={handleTotpSuccess}
      />
    </div>
  );
};

export default RegistrarSesion;
