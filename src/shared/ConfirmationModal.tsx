import { Flex, Modal } from "antd";
import { FiAlertTriangle } from "react-icons/fi";

const ConfirmationModal = ({
  isModalOpen,
  onClose,
  onConfirm,
  message,
}: any) => {
  return (
    <Modal
      open={isModalOpen}
      onCancel={onClose}
      onOk={onConfirm}
      closable={false}
      width={350}
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
      <Flex gap="middle" vertical>
        <Flex vertical={true} align="center" justify="center">
          <FiAlertTriangle
            style={{
              fontSize: 25,
              paddingTop: 15,
              paddingBottom: 10,
              color: "red",
            }}
          />
          <span style={{ fontSize: 15, paddingBottom: 5, textAlign: "center" }}>
            {message}
          </span>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default ConfirmationModal;
