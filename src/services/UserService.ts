import { AxiosRequestConfig } from "axios";
import http from "./http";

export interface User {
  id: any;
  username: string;
  name: string;
  password: string;
  isAdmin: boolean;
}

class UserService {
  getAxiosConfig = (): AxiosRequestConfig => {
    const token = localStorage.getItem("accessToken");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  createUser(user: User) {
    return http.post("/users", user, this.getAxiosConfig());
  }

  updateUser(
    id: any,
    user: { name: string; username: string; password: string; isAdmin: boolean }
  ) {
    return http.put(`/users/${id}`, user, this.getAxiosConfig());
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();
