import {
  ArrowDownOutlined,
  QrcodeOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Space, Typography, Row, Col, Button } from "antd";
import { useState } from "react";
const { Text } = Typography;

export const TransferCard = ({ transfer }) => {
  const isSent = transfer.type === "Enviada";
  
  return (
     <div
      style={{
        width: "100%",
        padding: "12px 16px",
      }}
    >
      <Row align="middle" style={{ width: "100%" }}>
        {/* Columna de  name y fecha */}
        <Col xs={24} sm={8}>
          <div style={{ textAlign: "left" }}>
            <Text strong>{transfer.name}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              {transfer.date}
            </Text>
          </div>
        </Col>

       
        <Col xs={24} sm={8}>
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <Text>{transfer.amount}</Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {transfer.type}
            </Text>
            <ArrowDownOutlined
              rotate={isSent ? 0 : 180}
              style={{ fontSize: 16, color: isSent ? "#a90101" : "#52c41a" }}
            />
          </div>
        </Col>

        {/* Derecha: iconoss  de acción */}
        <Col xs={24} sm={8}>
          <div style={{ textAlign: "right" }}>
            <Space>
              
              <DownloadOutlined style={{ fontSize: 16 }} />
            </Space>
          </div>
        </Col>
      </Row>
      
       
    </div>
    
  );
  
};
