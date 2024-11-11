import { Button, Spin } from "antd";
import { Task, useGetTasksByUserId } from "../queries/TaskQueries";
import TaskCard from "./TaskCard";
import CreateTask from "./CreateTask";
import { useState } from "react";

const TodoList = () => {
  const { data, isLoading } = useGetTasksByUserId();
  const todos: Task[] = Array.isArray(data) ? data : [];
  const [showCreateTask, setShowCreateTask] = useState(false);

  const completed = todos.reduce((acc: number, item: any) => {
    return acc + (item.completed === true ? 1 : 0);
  }, 0);

  const pending = todos.reduce((acc: number, item: any) => {
    return acc + (item.completed === false ? 1 : 0);
  }, 0);

  return (
    <>
      <div style={{ paddingLeft: 25, marginTop: -20, color: "gray" }}>
        {`You have COMPLETED: ${completed} and PENDING: ${pending} tasks as of today.`}
      </div>
      <div
        style={{ display: "flex", justifyContent: "end", alignItems: "center" }}
      >
        <Button
          color="primary"
          variant="solid"
          onClick={() => setShowCreateTask(true)}
        >
          Add Task
        </Button>
      </div>

      {isLoading ? (
        <Spin
          size="large"
          tip="Loading tasks..."
          style={{ width: "100%", textAlign: "center", paddingTop: "20px" }}
        />
      ) : (
        <div style={{ paddingTop: 30 }}>
          <TaskCard tasks={data || []} />
        </div>
      )}

      {showCreateTask && (
        <CreateTask
          isModalOpen={showCreateTask}
          onClose={() => setShowCreateTask(false)}
        />
      )}
    </>
  );
};

export default TodoList;
