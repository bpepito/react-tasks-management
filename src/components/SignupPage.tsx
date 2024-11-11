import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, Button, FormProps, message } from "antd";

import "../styles/SignupPage.css";
import { Link, useNavigate } from "react-router-dom";
import UserService, { User } from "../services/UserService";

const SignupPage = () => {
  const navigate = useNavigate();

  const onFinish: FormProps<User>["onFinish"] = async (values) => {
    try {
      const newUser = {
        ...values,
        isAdmin: false,
      };
      console.log("Success", newUser);
      await UserService.createUser(newUser);

      message.success("User created successfully");
      navigate("/");
    } catch (error) {
      console.error("Error", error);
      message.error("Error creating user. Please try agin later.");
      navigate("/");
    }
  };

  const onFinishFailed: FormProps<User>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed", errorInfo);
  };

  return (
    <>
      <div className="container-signup ">
        <div className="main-signup">
          <h3 style={{ textAlign: "center" }}>Create an account</h3>
          <Form
            name="normal_signup"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Please input your name." },
                { min: 3, message: "Name must be at least 3 characters long." },
              ]}
            >
              <Input
                className="signup-input"
                prefix={<UserOutlined type="user" style={{ fontSize: 13 }} />}
                placeholder="Enter Your name"
              />
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input a username." },
                {
                  min: 3,
                  message: "Username must be at least 3 characters long.",
                },
              ]}
            >
              <Input
                className="signup-input"
                prefix={<UserOutlined type="user" style={{ fontSize: 13 }} />}
                placeholder="Enter Your Username"
              />
            </Form.Item>
            <Form.Item
              className="password-input"
              name="password"
              rules={[{ required: true, message: "Please enter password." }]}
            >
              <Input.Password
                className="signup-input"
                prefix={<LockOutlined type="user" style={{ fontSize: 13 }} />}
                type="password"
                placeholder="Enter Your Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="signup-form-button"
              >
                Sign Up
              </Button>
            </Form.Item>
            <hr />
          </Form>
          <h6 style={{ textAlign: "center", paddingTop: "10px" }}>
            Already have an account? <Link to="/">Login</Link>
          </h6>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
