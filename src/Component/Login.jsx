import { RxCross2 } from "react-icons/rx";
import CustomInput from "./CustomInput";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setTab } from "../redux/tabSlice";
import { auth, githubProvider, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { setUser } from "../redux/userSlice";
import { toast } from "react-toastify";

const Login = () => {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const dispatch = useDispatch();

  const onSubmit = async (data, e) => {
    try {
      console.log("Login button clicked!");
      // Handle login logic here
      const loginAcc = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      dispatch(setUser(loginAcc));
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-center  items-center z-50 bg-[#00000056] absolute w-full h-screen  backdrop-filter backdrop-blur-sm">
      <div className="bg-white p-3 py-5 relative">
        <button
          onClick={() => dispatch(setTab(""))}
          className="bg-black absolute w-8 h-8 rounded-full text-white flex items-center justify-center -right-4 -top-4"
        >
          <RxCross2 />
        </button>
        <h1 className="text-2xl text-black  text-center py-3 ">
          Welcome Back!
        </h1>
        <form
          className=" p-3 rounded-lg flex flex-col w-[300px] gap-3 bg-white"
          onSubmit={handleSubmit(onSubmit)}
        >
          <CustomInput
            labelName={"email"}
            type="email"
            inputName="email"
            register={register("email", {
              required: "Password is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,}$/i,
                message: "Enter a valid email address",
              },
            })}
            error={errors.email ? errors.email.message : ""}
          />
          <CustomInput
            labelName="password"
            type="password"
            inputName="password"
            register={register("password", {
              required: "Password is required",
              pattern: {
                value:
                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/,
                message:
                  "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one special character, and one number.",
              },
            })}
            error={errors.password ? errors.password.message : ""}
          />
          <button
            type="submit"
            name="loginButton"
            className="bg-black p-3 text-white "
          >
            Login
          </button>
        </form>
        <div className="flex gap-2 p-3">
          <button
            type="submit"
            name="googleButton"
            className="bg-black p-3 text-white w-full"
            onClick={async () => {
              console.log("Google button clicked!");
              const loginAcc = await signInWithPopup(auth, googleProvider);
              dispatch(setUser(loginAcc));
            }}
          >
            Google
          </button>
          <button
            type="submit"
            name="twitterButton"
            className="bg-black p-3 text-white w-full"
          >
            Twitter
          </button>
          <button
            type="submit"
            name="githubButton"
            className="bg-black p-3 text-white w-full"
            onClick={async () => {
              console.log("Google button clicked!");
              const loginAcc = await signInWithPopup(auth, githubProvider);
              dispatch(setUser(loginAcc));
            }}
          >
            Github
          </button>
        </div>
        <div className="text-sm pt-3 px-3">
          Don't have account?{" "}
          <button
            className="text-sm underline"
            onClick={() => dispatch(setTab("register"))}
          >
            signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
