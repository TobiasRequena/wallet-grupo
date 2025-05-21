import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Typography, Button } from 'antd';
import moment from 'moment';
import { HomeOutlined, CopyOutlined } from '@ant-design/icons';
import '../stilos/detalle.css';

const { Title, Text } = Typography;

const DetalleMovimiento = () => {
  const navigate = useNavigate();
  const { state: transaccion } = useLocation();

  if (!transaccion) {
    return <Text>No se encontró la transacción.</Text>;
  }

  const {
    id,
    amount,
    createdAt,
    fromUsername,
    fromName,
    toUsername,
    toName,
    type
  } = transaccion;

  const tipo =
    type === 'sent' ? 'Transferencia enviada' : 'Transferencia recibida';
  const fecha = moment.unix(createdAt).format('DD/MM/YYYY HH:mm');
  const esEnvio = type === 'sent';
  const monto = `R$ ${Math.abs(amount)}`;

  return (
    <div className='dashboard-container'>
      <Title level={1} className='dashboard-title'>
        RauloCoins
      </Title>
      <Card style={{ width: 400 }}>
        <Title level={4}>{tipo}</Title>

        <Text>
          <strong>ID Transacción:</strong> {id}
        </Text>
        <br />
        <Text>
          <strong>Fecha:</strong> {fecha}
        </Text>
        <br />
        <Text
          copyable={{
            text: fromUsername,
            tooltips: `${fromUsername}`,
            icon: <CopyOutlined style={{ color: 'black' }} />
          }}
        >
          <strong>Desde:</strong> {fromName}
        </Text>
        <br />
        <Text
          copyable={{
            text: toUsername,
            tooltips: `${toUsername}`,
            icon: <CopyOutlined style={{ color: 'black' }} />
          }}
        >
          <strong>A:</strong> {toName}
        </Text>
        <br />
        <br />

        {transaccion.description && (
          <>
            <Text strong>Descripción:</Text>
            <div style={{ fontStyle: 'italic' }}>{transaccion.description}</div>
          </>
        )}
        <br />

        <Title level={3} strong style={{ color: esEnvio ? 'red' : 'green' }}>
          {esEnvio ? 'Enviaste' : 'Recibiste'}: {monto}
        </Title>
        <br />
        <br />

        <div className='contenedor-button'>
          <Button
            color='primary'
            variant='outlined'
            icon={<HomeOutlined />}
            iconPosition='end'
            onClick={() => navigate('/dashboard')}
          >
            Inicio
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default DetalleMovimiento;
