import { AxiosRequestConfig } from "axios";
import http from "./http";

export interface Todo {
  id: any;
  title: string;
  completed: boolean;
  userId: number;
}

class TaskService {
  getAxiosConfig = (): AxiosRequestConfig => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.error("Token is missing in localStorage");
      window.location.href = "/";
    }

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  getAllTasks() {
    return http.get("/tasks/all", {
      ...this.getAxiosConfig(),
    });
  }

  getTasksByUserId() {
    return http.get("/tasks", {
      ...this.getAxiosConfig(),
    });
  }

  createTask(todo: Todo) {
    return http.post("/tasks", todo, this.getAxiosConfig());
  }

  getTasksById(id: any) {
    return http.get(`/tasks/${id}`, {
      ...this.getAxiosConfig(),
    });
  }

  updateTaskById(id: any, todo: Todo) {
    return http.put(`tasks/${id}`, todo, this.getAxiosConfig());
  }

  deleteTaskById(id: any) {
    return http.delete(`tasks/${id}`, this.getAxiosConfig());
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new TaskService();
