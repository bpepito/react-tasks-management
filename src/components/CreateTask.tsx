import { Form, Input, message, Modal } from "antd";

import TaskService from "../services/TaskService";
import { useQueryClient } from "@tanstack/react-query";

const CreateTask = ({ isModalOpen, onClose }: any) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm(); // Initialize the Ant Design Form instance

  const handleOk = async () => {
    try {
      const formValues = form.getFieldsValue();
      const newTask = {
        ...formValues,
        completed: false,
        userId: localStorage.getItem("id"),
      };

      await TaskService.createTask(newTask);

      onClose();
      message.success("Successfully created task.");
      queryClient.invalidateQueries({ queryKey: ["getTasksByUserId"] });
    } catch (error) {
      console.error("Error", error);
      onClose();
      message.error(
        "An error occurred while creating task. Please try again later."
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
        <h3 style={{ textAlign: "start" }}>Create Task</h3>
        <Form
          form={form}
          name="create_task_form"
          onFinish={handleOk}
          onFinishFailed={(errorInfo) => {
            console.log("Form submission failed:", errorInfo);
          }}
        >
          <label style={{ color: "black" }}>Title</label>
          <Form.Item
            name="title"
            rules={[
              { required: true, message: "Please input the title." },
              { min: 3, message: "Title must be at least 3 characters long." },
            ]}
          >
            <Input className="login-input" />
          </Form.Item>
          <label style={{ color: "darkgray" }}>Status</label>
          <Form.Item name="completed">
            <Input
              className="login-input"
              placeholder="Pending"
              readOnly
              style={{ backgroundColor: "#F5f5f5" }}
            />
          </Form.Item>
        </Form>
        <hr />
      </div>
    </Modal>
  );
};
export default CreateTask;
