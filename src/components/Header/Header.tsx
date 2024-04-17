import React from "react";
import "./header.css";
import { BankOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import Title from "antd/es/typography/Title";

export default function Header() {
  return (
    <>
      <div className="Header">
        <Typography>
          <Title>Business Procesing System & Technology</Title>
        </Typography>
      </div>
    </>
  );
}
