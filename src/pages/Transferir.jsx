import React, { useState } from 'react';
import { Typography, Select, Input, Button, Card, Space, message, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import { buscarUsuarios } from '../fetchs/transferenciaService';
import axios from 'axios';
import ModalTOTP from '../components globales/ModalTOTP';
import './transferir.css';
import Endpoints from '../API/Endpoints'

const { Title } = Typography;
const { Option } = Select;

const Transferir = () => {
  const navigate = useNavigate();

  const [alias, setAlias] = useState('');
  const [monto, setMonto] = useState('');
  const [opciones, setOpciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nombreDestino, setNombreDestino] = useState('');
  const [usuarioDestino, setUsuarioDestino] = useState(null);
  const [descripcion, setDescripcion] = useState('');

const handleTransferencia = () => {
  const userData = localStorage.getItem('user');
  if (!userData) {
    alert('No se encontró la información del usuario actual.');
    return;
  }

  const usuarioActual = JSON.parse(userData);

  if (!usuarioDestino || !monto) {
    return message.warning('Por favor, completa todos los campos.');
  }

  if (usuarioDestino.username === usuarioActual.username) {
    return message.warning('No puedes transferirte a vos mismo.');
  }

  if (parseFloat(monto) <= 0) {
    return message.warning('El monto debe ser mayor a cero.');
  }

  if (parseFloat(monto) > usuarioActual.balance) {
    return message.warning('No tienes saldo suficiente para realizar esta transferencia.');
  }

  // Buscamos el nombre del destinatario para mostrarlo en el modal
  const destinatario = opciones.find((user) => user.username === alias);
  setNombreDestino(destinatario?.name || '');
  setMostrarModal(true); // Mostramos el modal TOTP
};

const transferirRaulocoins = async ({ fromUsername, toUsername, amount, description, operationToken }) => {
  const config = {
    method: 'POST',
    url: Endpoints.getUrl(Endpoints.TRANSFERENCIA.TRANSFERIR),
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      fromUsername,
      toUsername,
      amount,
      description,
      operationToken,
    },
  };

  const response = await axios(config);

  if (response.status < 200 || response.status >= 300) {
    throw new Error(response.data?.message || 'Error al realizar la transferencia');
  }

  return response.data;
};



const handleConfirmarTotp = async (totp) => {
  const userData = localStorage.getItem('user');
  if (!userData) {
    message.error('No se encontró información del usuario actual.');
    return;
  }

  const usuarioActual = JSON.parse(userData);

  try {
    const resultado = await transferirRaulocoins({
      fromUsername: usuarioActual.username,
      toUsername: usuarioDestino.username,
      amount: parseFloat(monto),
      description: descripcion,
      operationToken: totp
    });

    notification.success({
      message: 'Transferencia exitosa',
      description: resultado.message,
      placement: 'topRight',
    });

    // Actualizar el usuario en localStorage con el nuevo balance (opcional)
    localStorage.setItem('user', JSON.stringify({
      ...usuarioActual,
      balance: resultado.transfer.from.newBalance
    }));

    // Reset de estado
    setMostrarModal(false);
    setMonto('');
    setAlias('');
    setDescripcion('');
    setUsuarioDestino(null);
    setNombreDestino('');
  } catch (error) {
    notification.error({
      message: 'Error en la transferencia',
      description: error.message,
      placement: 'topRight',
    });
  }
};

  const handleBuscarUsuarios = async (valor) => {
    if (valor.length < 3) {
      setOpciones([]);
      return;
    }

    setLoading(true);
    const resultados = await buscarUsuarios(valor);
    setOpciones(resultados);
    setLoading(false);
  };

  return (
    <div className="transferir-container">
      <Title level={1} className="titulo-principal">RauloCoins</Title>
      <Card className="transferir-card" bodyStyle={{ padding: 24 }}>
        <div className="transferir-title">
          <Title level={3} style={{ margin: 0 }}>Transferir</Title>
          <Button color='primary' variant='outlined' icon={<HomeOutlined />} iconPosition="end" onClick={() => navigate('/dashboard')}>Inicio</Button> 
        </div>

        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Title level={5}>Alias</Title>
            <Select
              showSearch
              placeholder="Buscar alias"
              onSearch={handleBuscarUsuarios}
              onChange={(value) => {
                const user = opciones.find(u => u.username === value);
                setUsuarioDestino(user);
              }}
              loading={loading}
              style={{ width: '100%' }}
              filterOption={false}
              notFoundContent={loading ? 'Buscando...' : 'No se encontraron resultados'}
            >
              {opciones.map((user) => (
                <Option key={user.username} value={user.username}>
                  {user.username}
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <Title level={5}>Monto</Title>
            <Input
              type="number"
              placeholder="Monto a transferir"
              value={monto}
              onChange={e => setMonto(e.target.value)}
            />
          </div>
          <div>
            <Title level={5}>Descripcion</Title>
            <Input
              type="text"
              placeholder="Monto a transferir"
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
            />
          </div>

          <Button type="primary" block onClick={handleTransferencia}>
            Transferir
          </Button>
        </Space>
      </Card>

      <ModalTOTP
        visible={mostrarModal}
        onClose={() => setMostrarModal(false)}
        onConfirm={handleConfirmarTotp}
        usuarioDestino={usuarioDestino ? usuarioDestino : {}}
        monto={monto}
      />
    </div>
  );
};

export default Transferir;