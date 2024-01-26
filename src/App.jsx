import { useEffect } from "react";
import "./App.css";
import { Login, Navbar, Register } from "./Component";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { active } = useSelector((state) => state.tab);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <>
      {active == "login" && <Login />}
      {active == "register" && <Register />}
      <Navbar />
      <ToastContainer />

      {JSON.stringify(user)}
    </>
  );
}

export default App;
