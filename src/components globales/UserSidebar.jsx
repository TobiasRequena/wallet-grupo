import { Card, Descriptions, Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export const UserSidebar = ({user}) => {
     const navigate = useNavigate();
     const hanldleGoToDash = ()=>{
        navigate("/dashboard")
    }
  return (
    <div
     style={{
        width: "100%",
        padding: "12px 16px",
        margintop: "20px"
      }}
    >
    
    <Card variant hoverable style={{ width: "100%" }}>
      <Title level={5}>{user.name}</Title>
      <p style={{ fontSize: 12, color: "#888" }}>{user.email}</p>

      <Descriptions column={1} size="small" className="mt-4">
        <Descriptions.Item label="Tu Balance">{user.balance}</Descriptions.Item>
        <Descriptions.Item label="Alias">{user.alias}</Descriptions.Item>
      </Descriptions>

      <Button type="primary" block className="mt-4" onClick={hanldleGoToDash}>
        ← Volver a Inicio
      </Button>
    </Card>
    </div>
  );
  
};
