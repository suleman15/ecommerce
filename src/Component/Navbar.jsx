import React from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setTab } from "../redux/tabSlice";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { setUser } from "../redux/userSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  return (
    <div className="flex justify-between py-3  items-center px-[20px] lg:flex-row gap-3 flex-col">
      <div className="flex border-2 border-black uppercase items-center gap-3 pl-4 font-bold ">
        quantum <div className="p-3 bg-black text-white">glove</div>
      </div>
      <div className="flex gap-10">
        <div className="pb-1 border-b-2 hover:border-black	">Men</div>
        <div className="pb-1 border-b-2 hover:border-black	">Women</div>
        <div className="pb-1 border-b-2 hover:border-black	">Kid</div>
      </div>
      <div>
        <div className="flex gap-5">
          <div className="flex  border-2 border-black bg-black ">
            <input
              placeholder="Search ..."
              type="search"
              name="search"
              id="search"
              className="p-2 outline-none border-0"
            />
            <div className="w-[30px] text-white flex justify-center items-center m-2 text-black rounded-md cursor-pointer bg-white">
              <FiSearch />
            </div>
          </div>
          {!user?.operationType && (
            <div className="flex gap-3">
              <button onClick={() => dispatch(setTab("login"))}>Login</button>
              <button
                onClick={() => dispatch(setTab("register"))}
                className="bg-black text-white px-6 py-3 rounded-lg "
              >
                Signup
              </button>
            </div>
          )}
          {user?.operationType && (
            <button
              onClick={async () => {
                try {
                  await signOut(auth);
                  dispatch(setUser(""));
                } catch (err) {
                  console.error(err.message);
                }
              }}
              className="bg-black text-white px-6 py-3 rounded-lg "
            >
              Logout
            </button>
          )}

          {user?.user && (
            <div className="flex gap-3 items-center text-sm ">
              <img
                className=" p-1 rounded-full overflow-hidden w-10 h-10"
                src={
                  user?.user?.providerData[0]?.photoURL ??
                  `https://api.dicebear.com/7.x/identicon/svg?seed=${`${user?.user?.email}`}`
                }
                alt="avatar"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
