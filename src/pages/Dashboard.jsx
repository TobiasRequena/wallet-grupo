import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, Space } from 'antd';
import './dasboard.css';
import { useNavigate } from 'react-router-dom';
import { LogoutOutlined, WalletOutlined, DollarOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Dashboard = () => {
  const [data, setData] = useState(null); // null por defecto
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setData(parsedUser);
      } catch (error) {
        console.error('Error al parsear los datos del usuario:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.clear();
    navigate('/sesion/login');
  };

	const handleTransferir = () => {
		navigate('/transferir');
	}

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <Title level={1} className="dashboard-title">RauloCoins</Title>
      </div>

      <div className="dashboard-card-container">
        <div className="dashboard-top-bar">
          <span className="dashboard-greeting">
            {data ? `Hola, ${data.name}!` : 'Cargando...'}
          </span>
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
              {data ? `R$ ${data.balance}` : 'Cargando...'}
            </Title>
						<DollarOutlined style={{ color: 'green', fontSize: '38px' }}/>
          </div>

          <div className="dashboard-actions">
            <Space size="middle">
              <Button type="primary" onClick={handleTransferir}>Transferir</Button>
              <Button>Movimientos</Button>
              <Button>Ver datos</Button>
            </Space>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
