import React, { useEffect, useState } from "react";
import { Card, Typography, Avatar, Tag, Button } from "antd";
import {
  TeamOutlined,
  UserOutlined,
  MailOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  HomeOutlined,
  CopyOutlined,
  LockOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";

import moment from "moment";
import { useNavigate } from "react-router-dom";
import "../stilos/datos.css";

const { Title, Text } = Typography;

const DatosUser = () => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("Datos del usuario:", parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error(
          "Error al parsear el usuario desde sessionStorage:",
          error
        );
      }
    }
  }, []);

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <Text>Cargando datos del usuario...</Text>
      </div>
    );
  }

  const handleRoute = (route) => {
    navigate(route);
  };

  return (
    <div className="dashboard-container user-profile-bg">
      <div className="user-profile-wrapper">
        <div className="dashboard-header">
          <h1 className="title-h1">Perfil de {user.name}</h1>
        </div>

        <Card className="datos-container user-profile-card" bordered={false}>
          <div className="user-profile-header">
            <Avatar size={16} icon={<UserOutlined />} />
            <div style={{ marginLeft: 24 }}>
              <Text
                copyable={{
                  text: user.username,
                  tooltips: `${user.username}`,
                  icon: <CopyOutlined style={{ color: "black" }} />,
                }}
                type="secondary"
                style={{ fontSize: 38 }}
              >
                @{user.username}
              </Text>
            </div>
          </div>

          <div className="user-profile-info">
            <div>
              <MailOutlined style={{ marginRight: 8 }} />
              <Text strong>Email:</Text> <Text>{user.email}</Text>
            </div>
            <div>
              <TeamOutlined style={{ marginRight: 8 }} />
              <Text strong>Tipo de Usuario:</Text>{" "}
              <Tag color="blue">{user.userType}</Tag>
            </div>
            <div>
              <CheckCircleOutlined
                style={{
                  marginRight: 8,
                  color: user.isVerified ? "green" : "red",
                }}
              />
              <Text strong>Cuenta Verificada:</Text>{" "}
              <Text>{user.isVerified ? "Sí" : "No"}</Text>
            </div>
            <div>
              <CheckCircleOutlined
                style={{
                  marginRight: 8,
                  color: user.totpVerified ? "green" : "red",
                }}
              />
              <Text strong>2FA Verificada:</Text>{" "}
              <Text>{user.totpVerified ? "Sí" : "No"}</Text>
            </div>
            <div>
              <ClockCircleOutlined style={{ marginRight: 8 }} />
              <Text strong>Cuenta creada el:</Text>{" "}
              <Text>
                {moment.unix(user.createdAt).format("DD/MM/YYYY HH:mm")}
              </Text>
            </div>
          </div>
          <div className="btn user-profile-btns">
            <Button
              className="btn-editar-pass"
              onClick={() => navigate("/cambiar-password")}
              style={{
                marginRight: 16,
                backgroundColor: "#bb0a21",
                color: "white",
                border: "none",
                fontSize: 16,
                height: 48,
                padding: "0 32px",
              }}
              icon={<LockOutlined />}
              size="large"
            >
              Cambiar Contraseña
            </Button>

            <Button
              type="primary"
              onClick={() => handleRoute("/dashboard")}
              icon={<ArrowLeftOutlined />}
              size="large"
              style={{ height: 48, padding: "0 32px" }}
            >
              Volver al Inicio
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DatosUser;
