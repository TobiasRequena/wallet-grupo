import React, { useState } from 'react';
import { Typography, Select, Input, Button, Card, Space } from 'antd';
import './transferir.css';

const { Title } = Typography;
const { Option } = Select;

const Transferir = () => {
  const [alias, setAlias] = useState('');
  const [monto, setMonto] = useState('');

  const aliasesDisponibles = ['juan123', 'maria456', 'tobi789']; // Simulación

  const handleTransferencia = () => {
    if (!alias || !monto) {
      return alert('Por favor, completa todos los campos.');
    }

    console.log(`Transferencia a ${alias} por R$ ${monto}`);
    // Aquí iría la lógica de la transferencia real
  };

  return (
    <div className="transferir-container">
      <Title level={1} className="titulo-principal">RauloCoins</Title>

      <Card className="transferir-card" bodyStyle={{ padding: 24 }}>
        <Title level={3}>Transferir</Title>

        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Title level={5}>Alias</Title>
            <Select
              showSearch
              value={alias}
              placeholder="Buscar alias"
              onChange={value => setAlias(value)}
              style={{ width: '100%' }}
              filterOption={(input, option) =>
                option?.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {aliasesDisponibles.map((alias) => (
                <Option key={alias} value={alias}>{alias}</Option>
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

          <Button type="primary" block onClick={handleTransferencia}>
            Transferir
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default Transferir;
