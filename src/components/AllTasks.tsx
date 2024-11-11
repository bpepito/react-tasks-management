/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Spin, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { useAuth } from "../context/AuthContext";
import { Task, useGetAllTasks } from "../queries/TaskQueries";

const AllTasks: React.FC = () => {
  const { currentUser } = useAuth();

  const { data, isLoading } = useGetAllTasks(currentUser.isAdmin);

  const tasks: Task[] = Array.isArray(data) ? data : [];

  const columns: TableProps<Task>["columns"] = [
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      render: (userId: any) => <a>{userId}</a>,
      filters: [
        ...Array.from(new Set(tasks.map((task) => task.userId))).map(
          (userId) => ({
            text: `User ${userId}`,
            value: userId,
          })
        ),
      ],
      onFilter: (value: any, record: Task) => record.userId === value,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      filterSearch: true,
      onFilter: (value: any, record: Task) =>
        record.title.toLowerCase().includes(value.toLowerCase()),
      filters: tasks
        .map((task) => task.title)
        .filter((value, index, self) => self.indexOf(value) === index)
        .map((title) => ({
          text: title,
          value: title,
        })),
    },
    {
      title: "Status",
      dataIndex: "completed",
      key: "completed",
      render: (completed: boolean) =>
        completed ? (
          <Tag color="green">Completed</Tag>
        ) : (
          <Tag color="orange">In progress</Tag>
        ),
      filters: [
        { text: "Completed", value: true },
        { text: "In Progress", value: false },
      ],
      onFilter: (value: any, record: Task) => record.completed === value,
    },
    //   {
    //     title: "Action",
    //     key: "action",
    //     render: (_, record) => (
    //       <span>
    //         {record.completed ? (
    //           <a
    //             onClick={() => {
    //               setSelectedTaskId(record.id);
    //               setShowConfirmationModal(true);
    //             }}
    //           >
    //             Delete
    //           </a>
    //         ) : (
    //           <>
    //             <a onClick={() => handleMarkAsComplete(record)}>
    //               Mark as Complete
    //             </a>{" "}
    //             {" | "}
    //             <a
    //               onClick={() => {
    //                 handleEdit(record);
    //               }}
    //             >
    //               Edit
    //             </a>
    //             {" | "}
    //             <a
    //               onClick={() => {
    //                 setSelectedTaskId(record.id);
    //                 setShowConfirmationModal(true);
    //               }}
    //             >
    //               Delete
    //             </a>
    //           </>
    //         )}
    //       </span>
    //     ),
    //   },
  ];

  // const handleEdit = (record: Todo) => {
  //   console.log("Editing task:", record);
  // };

  // const handleDelete = async () => {
  //   if (!selectedTaskId) return;

  //   try {
  //     await TaskService.deleteTaskById(selectedTaskId);

  //     setShowConfirmationModal(false);

  //     message.success("Deleted task successfully.");
  //     queryClient.invalidateQueries({ queryKey: ["getAllTasks"] });
  //   } catch (error) {
  //     console.error("Error", error);
  //     setShowConfirmationModal(false);
  //     message.error("Unsuccessful deletion of task.");
  //   }
  // };

  // const handleMarkAsComplete = (record: Todo) => {
  //   console.log("Marking task as complete:", record);
  // };

  return (
    <>
      {isLoading ? (
        <Spin
          size="large"
          tip="Loading tasks..."
          style={{ width: "100%", textAlign: "center", paddingTop: "20px" }}
        />
      ) : (
        <div style={{ paddingLeft: 8, paddingRight: 8 }}>
          <Table<Task>
            columns={columns}
            dataSource={tasks}
            rowKey="id"
            size="middle"
          />
        </div>
      )}

      {/* <ConfirmationModal
        message={"Are you sure you want to delete this task?"}
        onClose={() => setShowConfirmationModal(false)}
        isModalOpen={showConfirmationModal}
        onConfirm={handleDelete}
      /> */}
    </>
  );
};

export default AllTasks;
