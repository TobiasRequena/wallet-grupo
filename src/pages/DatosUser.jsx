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
        setUser(parsedUser.user);
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
    <div className="dashboard-container">
      <div style={{ maxWidth: 500, margin: "0 auto", marginTop: 20 }}>
        <div className="dashboard-header">
          <h1 className="title-h1">Perfil del usuario</h1>
        </div>

        <Card title="" className="datos-container">
          <div
            style={{ display: "flex", alignItems: "center", marginBottom: 16 }}
          >
            <Avatar size={64} icon={<UserOutlined />} />
            <div style={{ marginLeft: 16 }}>
              <h4 className="title-h4">{user.name}</h4>
              <Text
                copyable={{
                  text: user.username,
                  tooltips: `${user.username}`,
                  icon: <CopyOutlined style={{ color: "black" }} />,
                }}
                type="secondary"
              >
                @{user.username}
              </Text>
            </div>
          </div>

          <div style={{ marginBottom: 8 }}>
            <MailOutlined style={{ marginRight: 8 }} />
            <Text strong>Email:</Text> <Text>{user.email}</Text>
          </div>

          <div style={{ marginBottom: 8 }}>
            <TeamOutlined style={{ marginRight: 8 }} />
            <Text strong>Tipo de Usuario:</Text>{" "}
            <Tag color="blue">{user.userType}</Tag>
          </div>

          <div style={{ marginBottom: 8 }}>
            <CheckCircleOutlined
              style={{
                marginRight: 8,
                color: user.isVerified ? "green" : "red",
              }}
            />
            <Text strong>Cuenta Verificada:</Text>{" "}
            <Text>{user.isVerified ? "Sí" : "No"}</Text>
          </div>

          <div style={{ marginBottom: 8 }}>
            <CheckCircleOutlined
              style={{
                marginRight: 8,
                color: user.totpVerified ? "green" : "red",
              }}
            />
            <Text strong>2FA Verificada:</Text>{" "}
            <Text>{user.totpVerified ? "Sí" : "No"}</Text>
          </div>

          <div style={{ marginBottom: 8 }}>
            <ClockCircleOutlined style={{ marginRight: 8 }} />
            <Text strong>Cuenta creada el:</Text>{" "}
            <Text>
              {moment.unix(user.createdAt).format("DD/MM/YYYY HH:mm")}
            </Text>
          </div>
          <div className="btn">
            <Button
              className="btn-editar-pass"
              onClick={() => navigate("/cambiar-password")}
              style={{
                marginRight: 8,
                backgroundColor: "#bb0a21",
                color: "white",
                border: "none",
              }}
              icon={<LockOutlined />}
            >
              Cambiar Contraseña
            </Button>

            <Button
              type="primary"
              onClick={() => handleRoute("/dashboard")}
              icon={<ArrowLeftOutlined />}
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
