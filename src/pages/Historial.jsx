import { TransferCard } from "../components globales/TransferCard";
import { UserSidebar } from "../components globales/UserSidebar";


import { List, Typography, Row, Col, Card, Button } from "antd";
import { useState } from "react";


const user_hardcod = {
    id: "1",
    name: "Tobias Requena",
    email: "tobias.requena@prueba.com",
    alias: "tobias.alias",
    balance: 45
    
}



const { Title } = Typography;

const transfers = [
  {
    id: "1",
    name: "Tobias Requena",
    date: "31/05/2025 15:00",
    amount: "10$R",
    type: "Enviada",
  },
  {
    id: "2",
    name: "Julian Gomez",
    date: "31/05/2025 15:00",
    amount: "10$R",
    type: "Recibida",
  },
  {
    id: "3",
    name: "Francisco Prueba",
    date: "31/05/2025 15:00",
    amount: "10$R",
    type: "Enviada",
  },
  {
    id: "4",
    name: "Tobias Requena",
    date: "31/05/2025 15:00",
    amount: "10$R",
    type: "Enviada",
  },
  {
    id: "5",
    name: "Julian Gomez",
    date: "31/05/2025 15:00",
    amount: "10$R",
    type: "Recibida",
  },
  {
    id: "6",
    name: "Francisco Prueba",
    date: "31/05/2025 15:00",
    amount: "10$R",
    type: "Enviada",
  },
];

export default function Historial() {
    const [visibleCount, setVisibleCount] = useState(3);

  const handleVerMas = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <div
      style={{
        marginTop: 20,
        marginLeft: 50,
        marginRight: 50,
        minHeight: "100vh",
        background: "transparent",
      }}
    >
      <Row gutter={[24, 24]}>
        <Col xs={24} md={16}>
          <Title level={4} style={{ color: "#d32029" }}>
            Historial de Transferencias ↔
          </Title>

          <Card>
            <List
              itemLayout="horizontal"
              dataSource={transfers.slice(0, visibleCount)}
              renderItem={(item) => (
                <List.Item>
                  <TransferCard transfer={item} />
                </List.Item>
              )}
            />

            {/* ✅ Botón Ver Más dentro del Card */}
            <div style={{ textAlign: "right", marginTop: 16 }}>
              {visibleCount < transfers.length && (
                <Button type="primary" onClick={handleVerMas}>
                  Ver Más
                </Button>
              )}
            </div>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <UserSidebar user={user_hardcod} />
        </Col>
      </Row>
    </div>
  );
} 