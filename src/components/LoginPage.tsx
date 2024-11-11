import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { MdWavingHand } from "react-icons/md";
import { Form, Input, Button, FormProps } from "antd";
import { useAuth } from "../context/AuthContext";

import "../styles/LoginPage.css";
import { Link } from "react-router-dom";

export interface Login {
  username: string;
  password: string;
}

const LoginPage = () => {
  const { login } = useAuth();

  const onFinish: FormProps<Login>["onFinish"] = async (values) => {
    await login(values);
  };

  const onFinishFailed: FormProps<Login>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed", errorInfo);
  };

  return (
    <>
      <div className="container-login ">
        <div className="main-login">
          <h3 style={{ textAlign: "center" }}>
            Hi, Welcome Back!{" "}
            <MdWavingHand style={{ paddingLeft: "10px", color: "#E6BF00" }} />
          </h3>
          <Form
            name="normal_login"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <label style={{ color: "darkgray" }}>Username</label>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username." },
                {
                  min: 3,
                  message: "Username must be at least 3 characters long.",
                },
              ]}
            >
              <Input
                className="login-input"
                prefix={<UserOutlined type="user" style={{ fontSize: 13 }} />}
                placeholder="Username"
              />
            </Form.Item>
            <label style={{ marginTop: "-12px", color: "darkgray" }}>
              Password
            </label>
            <Form.Item
              className="password-input"
              name="password"
              rules={[
                { required: true, message: "Please input your password." },
              ]}
            >
              <Input.Password
                className="login-input"
                prefix={<LockOutlined type="user" style={{ fontSize: 13 }} />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Login
              </Button>
            </Form.Item>
            <hr />
          </Form>
          <h6 style={{ textAlign: "center", paddingTop: "10px" }}>
            Don't have an account? <Link to="/sign-up">Sign Up</Link>
          </h6>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
