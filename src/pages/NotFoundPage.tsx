import React from "react";
import { BsEmojiTear } from "react-icons/bs";

import { Button, Flex } from "antd";

import "../styles/NotFoundPage.css";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container-notfound">
      <Flex gap="middle" vertical>
        <Flex vertical align="center" justify="center">
          <div style={{ fontSize: 70 }}>
            4<BsEmojiTear style={{ paddingTop: 10 }} />4
          </div>
          <div
            style={{ marginTop: -10, fontWeight: "bold", textAlign: "center" }}
          >
            OOPS! PAGE NOT FOUND
          </div>
          <div
            style={{
              color: "lightgrey",
              fontSize: 12,
              paddingTop: 20,
              textAlign: "center",
            }}
          >
            Sorry but the page you are looking for does not exist, have been
          </div>
          <div
            style={{ color: "lightgrey", fontSize: 12, textAlign: "center" }}
          >
            removed, name changed or is temporary unavailable
          </div>
          <Button
            style={{
              marginTop: 30,
              color: "white",
              backgroundColor: "orange",
              borderRadius: 15,
            }}
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            Go to Login Page
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default NotFoundPage;
