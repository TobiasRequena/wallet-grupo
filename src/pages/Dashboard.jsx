import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, Space, List, Avatar } from 'antd';
import '../stilos/dasboard.css';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { LogoutOutlined, WalletOutlined, DollarOutlined, ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Dashboard = () => {
  const [data, setData] = useState(null); // null por defecto
  const [transactions, setTransactions] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    const storedTransactions = sessionStorage.getItem('transactions');

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setData(parsedUser);
      } catch (error) {
        console.error('Error al parsear los datos del usuario:', error);
      }
    }

    if (storedTransactions) {
      try {
        const parsedTx = JSON.parse(storedTransactions);
        setTransactions(parsedTx);
      } catch (error) {
        console.error('Error al parsear las transacciones:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');
    sessionStorage.clear();
    navigate('/sesion/login');
  };

	const handleTransferir = () => {
		navigate('/transferir');
	}

  const handleDatos = () => {
    navigate(`/datos-user/${data.user.name}`, { state: data });
  }

  const handleVerMas = () => {
    setVisibleCount(prev => prev + 3);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <Title level={1} className="dashboard-title">RauloCoins</Title>
      </div>

      <div className="dashboard-card-container">
        <div className="dashboard-top-bar">
          <span className="dashboard-greeting">
            {data ? `Hola, ${data.user?.name}!` : 'Cargando...'}
          </span>
          {console.log(data)}
          <Button 
            type="default" 
						color='danger'
						variant='outlined'
            onClick={handleLogout} 
            icon={<LogoutOutlined style={{ color: 'red' }} />} 
            iconPosition="end"
          >
            Salir
          </Button>
        </div>

        <Card className="dashboard-card" bodyStyle={{ padding: '12px' }}>
          <div className="dashboard-card-header">
            <Text strong>Cuenta en Raulos</Text>
          </div>

          <div className="dashboard-balance">
            <Title level={1} style={{ margin: '0' }}>
              {data ? `R$ ${data.user.balance}` : 'Cargando...'}
            </Title>
						<DollarOutlined style={{ color: 'green', fontSize: '38px' }}/>
          </div>

          <div className="dashboard-actions">
            <Space size="middle">
              <Button type="primary" onClick={handleTransferir}>Transferir</Button>
              <Button onClick={handleDatos}>Ver datos</Button>
            </Space>
          </div>
        </Card>
      </div>

      <Card className="dashboard-card" style={{ marginTop: '20px' }} bodyStyle={{ padding: '12px' }}>
        <div className="dashboard-card-header">
          <Text strong>Movimientos recientes</Text>
        </div>

      <List
        itemLayout="horizontal"
        dataSource={transactions.slice(0, visibleCount)}
        renderItem={item => {
          const isReceived = item.type === 'received';
          const icon = isReceived ? <ArrowDownOutlined style={{ color: 'green' }} /> : <ArrowUpOutlined style={{ color: 'red' }} />;
          const user = isReceived ? item.fromUsername : item.toUsername;
          const label = isReceived ? 'Transferencia recibida de' : 'Transferencia enviada a';
          const fecha = moment.unix(item.createdAt).format('DD/MM/YYYY HH:mm');

          return (
            <List.Item onClick={() => navigate('/detalle-transacciones', { state: item })} style={{ cursor: 'pointer' }}>
              <List.Item.Meta
                avatar={<Avatar icon={icon} />}
                title={`${label} ${user}`}
                description={
                  <>
                    <div>{fecha}</div>
                    <div style={{ fontStyle: 'italic', color: 'gray' }}>{item.description}</div>
                  </>
                }
              />
              <Text strong style={{ color: item.type === 'sent' ? 'red' : 'green' }}>
                {isReceived ? '+' : '-'} R$ {Math.abs(item.amount)}
              </Text>
            </List.Item>
          );
        }}
      />

      <div style={{ textAlign: 'center', marginTop: 12 }}>
        {visibleCount < transactions.length ? (
          <Button type="link" onClick={handleVerMas}>
            Ver más
          </Button>
        ) : transactions.length > 3 ? (
          <Button type="link" onClick={() => setVisibleCount(3)}>
            Ver menos
          </Button>
        ) : null}
      </div>

      </Card>
    </div>
  );
};

export default Dashboard;