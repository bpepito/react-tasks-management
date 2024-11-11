import { Button, Flex, message } from "antd";
import { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import TaskService from "../services/TaskService";
import { useQueryClient } from "@tanstack/react-query";
import ConfirmationModal from "../shared/ConfirmationModal";
import { Task } from "../queries/TaskQueries";
import UpdateTask from "./UpdateTask";

const TaskCard = ({ tasks }: any) => {
  const queryClient = useQueryClient();

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [actionType, setActionType] = useState<"delete" | "complete" | null>(
    null
  );

  const handleDelete = async () => {
    if (!selectedTaskId) return;

    try {
      await TaskService.deleteTaskById(selectedTaskId);
      setShowConfirmationModal(false);
      message.success("Deleted task successfully.");
      queryClient.invalidateQueries({ queryKey: ["getTasksByUserId"] });
    } catch (error) {
      console.error("Error", error);
      setShowConfirmationModal(false);
      message.error("Unsuccessful deletion of task.");
    }
  };

  const handleMarkAsComplete = async () => {
    if (!selectedTask) return;
    try {
      await TaskService.updateTaskById(selectedTaskId, {
        ...selectedTask,
        completed: true,
      });
      setShowConfirmationModal(false);
      message.success("Marked task as completed.");
      queryClient.invalidateQueries({ queryKey: ["getTasksByUserId"] });
    } catch (error) {
      console.error("Error", error);
      setShowConfirmationModal(false);
      message.error("Unsuccessful in marking task as complete.");
    }
  };

  const handleAction = () => {
    if (actionType === "delete") {
      handleDelete();
    } else if (actionType === "complete") {
      handleMarkAsComplete();
    }
  };

  return (
    <>
      {tasks.map((item: Task) => (
        <Flex gap="middle" align="center" vertical key={item.id}>
          <Flex
            style={{
              height: 50,
              width: 750,
              borderRadius: 15,
              border: "1px solid #40a9ff",
              marginBottom: "20px",
            }}
            justify={"space-between"}
            align={"center"}
          >
            <div>
              <span
                style={{ paddingLeft: 20, paddingRight: 20, fontSize: "18px" }}
              >
                {item.completed ? (
                  <AiOutlineCheckCircle style={{ color: "green" }} />
                ) : (
                  <AiOutlineExclamationCircle style={{ color: "orange" }} />
                )}
              </span>
              <span style={{ fontSize: "15px" }}>
                {item.title.length > 50
                  ? `${item.title.slice(0, 50)}...`
                  : item.title}
              </span>
            </div>
            <div style={{ paddingRight: 20 }}>
              {item.completed ? (
                <>
                  <Button
                    style={{
                      color: "blue",
                      border: "none",
                      backgroundColor: "transparent",
                      padding: 1,
                      boxShadow: "none",
                    }}
                    onClick={() => {
                      setSelectedTaskId(item.id);
                      setSelectedTask(item);
                      setShowUpdateModal(true);
                    }}
                  >
                    Edit |
                  </Button>
                  <Button
                    style={{
                      color: "red",
                      border: "none",
                      backgroundColor: "transparent",
                      padding: 1,
                      boxShadow: "none",
                    }}
                    onClick={() => {
                      setActionType("delete");
                      setSelectedTaskId(item.id);
                      setSelectedTask(item);
                      setConfirmationMessage(
                        "Are you sure you want to delete this task?"
                      );
                      setShowConfirmationModal(true);
                    }}
                  >
                    Delete
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    style={{
                      color: "green",
                      border: "none",
                      backgroundColor: "transparent",
                      padding: 1,
                      boxShadow: "none",
                    }}
                    onClick={() => {
                      setActionType("complete");
                      setSelectedTaskId(item.id);
                      setSelectedTask(item);
                      setConfirmationMessage(
                        "Are you sure you want to mark this task as complete?"
                      );
                      setShowConfirmationModal(true);
                    }}
                  >
                    Mark as Complete |
                  </Button>
                  <Button
                    style={{
                      color: "blue",
                      border: "none",
                      backgroundColor: "transparent",
                      padding: 1,
                      boxShadow: "none",
                    }}
                    onClick={() => {
                      setSelectedTaskId(item.id);
                      setSelectedTask(item);
                      setShowUpdateModal(true);
                    }}
                  >
                    Edit |
                  </Button>
                  <Button
                    style={{
                      color: "red",
                      border: "none",
                      backgroundColor: "transparent",
                      padding: 1,
                      boxShadow: "none",
                    }}
                    onClick={() => {
                      setActionType("delete");
                      setSelectedTaskId(item.id);
                      setSelectedTask(item);
                      setConfirmationMessage(
                        "Are you sure you want to delete this task?"
                      );
                      setShowConfirmationModal(true);
                    }}
                  >
                    Delete
                  </Button>
                </>
              )}
            </div>
          </Flex>
        </Flex>
      ))}

      <ConfirmationModal
        message={confirmationMessage}
        onClose={() => setShowConfirmationModal(false)}
        isModalOpen={showConfirmationModal}
        onConfirm={handleAction}
      />
      {showUpdateModal && (
        <UpdateTask
          isModalOpen={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          data={selectedTask || null}
        />
      )}
    </>
  );
};

export default TaskCard;
