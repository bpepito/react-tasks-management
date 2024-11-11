import { UserOutlined } from "@ant-design/icons";
import { Form, Input, message, Modal, Select } from "antd";
import { useEffect } from "react";
import UserService from "../services/UserService";
import "../styles/LoginPage.css";
import { useAuth } from "../context/AuthContext";

const { Option } = Select;

const UpdateUser = ({ isModalOpen, onClose }: any) => {
  const { currentUser } = useAuth();

  const [form] = Form.useForm(); // Initialize the Ant Design Form instance

  useEffect(() => {
    if (isModalOpen) {
      form.setFieldsValue({
        name: localStorage.getItem("name"),
        username: localStorage.getItem("username"),
        isAdmin: currentUser.isAdmin,
      });
    }
  }, [isModalOpen, form, currentUser.isAdmin]);

  const handleOk = async () => {
    try {
      const formValues = form.getFieldsValue();
      const updatedUser = {
        ...formValues,
      };

      await UserService.updateUser(localStorage.getItem("id"), updatedUser);

      localStorage.setItem("isAdmin", formValues.isAdmin);

      onClose();
      message.success("Successfully updated user information.");
    } catch (error) {
      console.error("Error", error);
      onClose();
      message.error(
        "An error occurred while updating user. Please try again later."
      );
    }
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={onClose}
      onOk={() => form.submit()}
      closable={false}
      okButtonProps={{
        style: {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
      }}
      cancelButtonProps={{
        style: {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
      }}
      okText="Confirm"
    >
      <div>
        <h3 style={{ textAlign: "start" }}>Update User</h3>
        <Form
          form={form}
          name="update_user_form"
          onFinish={handleOk}
          onFinishFailed={(errorInfo) => {
            console.log("Form submission failed:", errorInfo);
          }}
        >
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Please input your name." },
              { min: 3, message: "Name must be at least 3 characters long." },
            ]}
          >
            <Input
              className="login-input"
              prefix={<UserOutlined style={{ fontSize: 13 }} />}
              style={{ backgroundColor: "#F5F5F5" }}
              readOnly
            />
          </Form.Item>

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
              prefix={<UserOutlined style={{ fontSize: 13 }} />}
              style={{ backgroundColor: "#F5F5F5" }}
              readOnly
            />
          </Form.Item>

          <Form.Item label="Is Admin?" name="isAdmin">
            <Select
              value={currentUser.isAdmin}
              onChange={(value) => form.setFieldsValue({ isAdmin: value })}
              placeholder="Select Role"
            >
              <Option value={true}>Admin</Option>
              <Option value={false}>User</Option>
            </Select>
          </Form.Item>
        </Form>
        <hr />
      </div>
    </Modal>
  );
};

export default UpdateUser;
