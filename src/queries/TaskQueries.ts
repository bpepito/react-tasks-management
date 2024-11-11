import { useQuery } from "@tanstack/react-query";
import TaskService from "../services/TaskService";

export interface Task {
  id: any;
  title: string;
  completed: boolean;
  userId: number;
}

export const useGetAllTasks = (isAdmin: boolean) => {
  return useQuery<Task, Error>({
    queryKey: ["getAllTasks", isAdmin],
    queryFn: async () => {
      const { data } = await TaskService.getAllTasks();
      return data;
    },
    retry: false,
  });
};

export const useGetTasksByUserId = () => {
  return useQuery<Task, Error>({
    queryKey: ["getTasksByUserId"],
    queryFn: async () => {
      const { data } = await TaskService.getTasksByUserId();
      return data;
    },
    retry: false,
  });
};
