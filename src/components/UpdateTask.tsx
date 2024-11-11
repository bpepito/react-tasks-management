import { Form, Input, message, Modal, Select } from "antd";
import { useEffect } from "react";
import TaskService from "../services/TaskService";
import { useQueryClient } from "@tanstack/react-query";

const { Option } = Select;

const UpdateTask = ({ isModalOpen, onClose, data }: any) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm(); // Initialize the Ant Design Form instance
  console.log(isModalOpen);

  console.log("data from updateTask", data);
  useEffect(() => {
    if (isModalOpen && data) {
      form.setFieldsValue({
        title: data.title,
        completed: data.completed,
        userId: data.userId,
      });
    }
  }, [isModalOpen, form, data]);

  const handleOk = async () => {
    try {
      const formValues = form.getFieldsValue();
      const updatedTask = {
        ...formValues,
      };

      await TaskService.updateTaskById(data.id, updatedTask);

      onClose();
      message.success("Successfully updated task.");
      queryClient.invalidateQueries({ queryKey: ["getTasksByUserId"] });
    } catch (error) {
      console.error("Error", error);
      onClose();
      message.error(
        "An error occurred while updating task. Please try again later."
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
        <h3 style={{ textAlign: "start" }}>Update Task</h3>
        <Form
          form={form}
          name="update_task_form"
          onFinish={handleOk}
          onFinishFailed={(errorInfo) => {
            console.log("Form submission failed:", errorInfo);
          }}
        >
          <Form.Item
            name="title"
            rules={[
              { required: true, message: "Please input the title." },
              { min: 3, message: "Title must be at least 3 characters long." },
            ]}
          >
            <Input className="login-input" />
          </Form.Item>

          <Form.Item label="Is Completed?" name="completed">
            <Select
              value={data.completed}
              onChange={(value) => form.setFieldsValue({ isAdmin: value })}
              placeholder="Select Role"
            >
              <Option value={true}>Complete</Option>
              <Option value={false}>Pending</Option>
            </Select>
          </Form.Item>
        </Form>
        <hr />
      </div>
    </Modal>
  );
};

export default UpdateTask;
