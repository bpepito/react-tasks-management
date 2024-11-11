import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import "./App.css";
import LayoutPage from "./pages/LayoutPage";
import AllTasks from "./components/AllTasks";
import UserTask from "./components/UserTask";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignupPage />} />
      <Route path="/not-found" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/not-found" />} />

      {/* Route for dashboard with nested routes */}
      <Route path="/dashboard" element={<LayoutPage />}>
        <Route path="users" element={<AllTasks />} />
        <Route path="my-task" element={<UserTask />} />
      </Route>
    </Routes>
  );
}

export default App;
