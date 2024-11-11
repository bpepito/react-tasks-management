import React, { useState, useEffect } from "react";
import { FaTasks } from "react-icons/fa";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, Input, Avatar, Layout, Menu, Button } from "antd";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import UpdateUser from "../components/UpdateUser";
import "../styles/LayoutPage.css";

const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

const admin = [
  {
    key: "logo",
    icon: null,
    label: (
      <div style={{ fontSize: "24px", color: "white", fontWeight: "bold" }}>
        Tasks App
      </div>
    ),
    disabled: true,
  },
  {
    key: "1",
    icon: <UserOutlined />,
    label: "Users",
  },
  {
    key: "2",
    icon: <FaTasks />,
    label: "My Tasks",
  },
];

const user = [
  {
    key: "logo",
    icon: null,
    label: (
      <div style={{ fontSize: "24px", color: "white", fontWeight: "bold" }}>
        Tasks App
      </div>
    ),
    disabled: true,
  },
  {
    key: "1",
    icon: <FaTasks />,
    label: "My Tasks",
  },
];

const LayoutPage: React.FC = () => {
  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
  const { currentUser, logout } = useAuth();
  const [selectedKey, setSelectedKey] = useState<string>("1");

  const userType = currentUser.isAdmin === true ? "admin" : "user";

  const navigate = useNavigate();
  const location = useLocation();

  const adminItems = [
    {
      label: "Update User",
      key: "0",
      onClick: () => setShowUpdateUserModal(true),
    },
    {
      label: "Logout",
      key: "1",
      onClick: () => logout(),
    },
  ];

  const userItem = [
    {
      label: "Logout",
      key: "0",
      onClick: () => logout(),
    },
  ];

  useEffect(() => {
    if (location.pathname === "/dashboard/users") {
      setSelectedKey("1");
    } else if (location.pathname === "/dashboard/my-task") {
      setSelectedKey("2");
    }
  }, [location]);

  const handleMenuSelect = ({ key }: { key: string }) => {
    setSelectedKey(key);
    if (key === "1" && userType === "admin") {
      navigate("/dashboard/users");
    } else if (key === "2") {
      navigate("/dashboard/my-task");
    }
  };

  return (
    <>
      <Layout hasSider>
        <Sider style={siderStyle}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            selectedKeys={[selectedKey]}
            onSelect={handleMenuSelect}
            items={currentUser.isAdmin === true ? admin : user}
          />
        </Sider>
        <Layout style={{ marginInlineStart: 200 }}>
          <Header
            style={{
              backgroundColor: "white",
              position: "sticky",
              top: 0,
              right: 0,
              padding: "0 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Search
              placeholder="Search here"
              enterButton
              size="middle"
              style={{ width: "350px", paddingLeft: "25px" }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar
                style={{ backgroundColor: "#7265e6", verticalAlign: "middle" }}
              >
                {currentUser.name.slice(0, 1)}
              </Avatar>
              <Dropdown
                menu={{ items: userType === "admin" ? adminItems : userItem }}
              >
                <Button
                  onClick={(e) => e.preventDefault()}
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    padding: 1,
                    boxShadow: "none",
                  }}
                >
                  <DownOutlined style={{ paddingLeft: "10px" }} />
                </Button>
              </Dropdown>
            </div>
          </Header>

          <Content
            style={{
              margin: "40px 40px 0 40px",
              height: "calc(100vh - 140px)",
              backgroundColor: "#fff",
              padding: 10,
              borderRadius: 8,
              overflowY: "auto",
            }}
          >
            <p
              style={{
                textAlign: "start",
                fontSize: "20px",
                marginBlockStart: "15px",
                marginLeft: "15px",
              }}
            >{`Welcome ${currentUser.name} !`}</p>

            {/* This is the key part! Rendering nested routes */}
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center", color: "gray" }}>
            Tasks App ©{new Date().getFullYear()}
          </Footer>
        </Layout>
      </Layout>

      <UpdateUser
        isModalOpen={showUpdateUserModal}
        onClose={() => setShowUpdateUserModal(false)}
      />
    </>
  );
};

export default LayoutPage;
