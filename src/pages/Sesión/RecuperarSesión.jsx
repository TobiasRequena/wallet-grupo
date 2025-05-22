import React, { useState } from 'react';
import { Card, Input, Button, Typography, Space, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Endpoints from '../../API/Endpoints';
import ModalTOTPRe from '../../components globales/ModalTOTPRe';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const RecuperarSesion = () => {
  const [alias, setAlias] = useState('');
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [totpSetup, setTotpSetup] = useState(null);

  const navigate = useNavigate();

  const handleRecuperar = async () => {
    if (!alias || !email) {
      message.warning('Por favor, completá alias y email.');
      return;
    }

    try {
      const response = await axios.post(Endpoints.getUrl(Endpoints.SESION.RECUPERAR), {
        username: alias,
        email: email
      });

      if (response.data.success) {
        message.success(response.data.message);
        setTotpSetup(response.data.totpSetup);
        setModalVisible(true);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.response?.data?.message || 'No se pudo procesar la recuperación');
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <Title level={1} className="login-title">RauloCoins</Title>
        <Title level={3} className="login-subtitle">Recuperar sesión</Title>

        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Title level={5} className="login-label">Alias</Title>
          <Input value={alias} onChange={(e) => setAlias(e.target.value)} placeholder="Alias" />
          <Title level={5} className="login-label">Email</Title>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />

          <Button type="primary" block className="recovery-button" onClick={handleRecuperar}>
            Recuperar
          </Button>

          <div className="login-links">
            <Link to="/sesion/login">Ingresar</Link>
            <Link to="/sesion/registrar">Registrarse</Link>
          </div>
        </Space>
      </Card>

      <ModalTOTPRe
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        username={alias}
        totpSetup={totpSetup}
        onSuccess={() => {
          setModalVisible(false);
          message.success('Sesión verificada correctamente.');
        }}
      />
    </div>
  );
};

export default RecuperarSesion;
