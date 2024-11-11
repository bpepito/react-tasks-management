import { Login } from "../components/LoginPage";
import axios from "axios";

class AuthService {
  async login(login: Login) {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/auth`,
        login
      );

      console.log("response", response.data.accessToken);

      return {
        accessToken: response.data.accessToken,
      };
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();
