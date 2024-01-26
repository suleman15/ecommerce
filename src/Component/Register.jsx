import { RxCross2 } from "react-icons/rx";
import CustomInput from "./CustomInput";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { BiLogoGithub, BiLogoGoogle, BiLogoTwitter } from "react-icons/bi";
import { setTab } from "../redux/tabSlice";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../redux/userSlice";
import { toast } from "react-toastify";

const Register = () => {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const createAccount = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      dispatch(setUser(createAccount));
    } catch (err) {
      console.log(err.message);
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
          Don't Have an Account
        </h1>
        <form
          className=" p-3 rounded-lg flex flex-col w-[450px] gap-3 bg-white"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-2 gap-3">
            <CustomInput
              labelName={"First Name"}
              type="firstName"
              inputName="firstName"
              register={register("firstName", {
                required: "Password is required",
              })}
              error={errors.firstName ? errors.firstName.message : ""}
            />
            <CustomInput
              labelName={"Last Name"}
              type="lastName"
              inputName="lastName"
              register={register("lastName", {
                required: "Password is required",
              })}
              error={errors.lastName ? errors.lastName.message : ""}
            />
          </div>
          <CustomInput
            labelName={"email"}
            type="email"
            inputName="email"
            register={register("email", {
              required: "FirstName is required",
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
          <button type="submit" className="bg-black p-3 text-white ">
            Register
          </button>
        </form>

        <div className="flex gap-2  px-3">
          <button className="bg-black p-3 flex  items-center gap-3 justify-center text-white w-full">
            <BiLogoGoogle />
            Google
          </button>
          <button className="bg-black p-3 flex  items-center gap-3 justify-center text-white w-full">
            <BiLogoTwitter />
            Twitter
          </button>
          <button className="bg-black p-3 flex  items-center gap-3 justify-center text-white w-full">
            <BiLogoGithub /> Github
          </button>
        </div>
        <div className="text-sm pt-3 px-3">
          Don't have account?{" "}
          <button
            className="text-sm underline"
            onClick={() => dispatch(setTab("login"))}
          >
            login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
