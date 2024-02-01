import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setTab } from "../redux/tabSlice";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { setUser } from "../redux/userSlice";
import {
  BsCart,
  BsFullscreenExit,
  BsMoonStarsFill,
  BsSun,
} from "react-icons/bs";
import { setTheme } from "../redux/themeSlice";
import { motion } from "framer-motion";
import axios from "axios";
import { renderStars } from "./ProductByCategory";
import { useEffect } from "react";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchProduct, setSearchProduct] = useState([]);
  const [activeTab, setActiveTab] = useState({ profile: false });
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/search?q=${searchValue}`
        );
        setSearchProduct(response?.data?.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Check if searchValue is not empty before making the API request
    if (searchValue.length) {
      fetchData();
    } else {
      setSearchProduct([]); // Clear search results when the input is empty
    }
  }, [searchValue]);

  return (
    <div className="flex justify-between py-3  items-center px-[20px] lg:flex-row gap-3 flex-col">
      <div className="flex border-2 border-black uppercase items-center gap-3 pl-4 font-bold ">
        quantum <div className="p-3 bg-black text-white">glove</div>
      </div>

      <div>
        <div className="flex gap-5 items-center">
          <div className="relative">
            <div className="flex   items-center relative">
              <input
                placeholder="Search ..."
                type="search"
                name="search"
                id="search"
                value={searchValue}
                className="outline-none px-3 py-2 text-xs w-40 transition-width duration-300 border-2 rounded-full focus:w-[300px] appearance-none"
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
                onKeyDown={(e) => {
                  // Check if Enter key is pressed (key code 13)
                  console.log(searchValue);
                  if (e.key === "Backspace" && searchValue.length == 1) {
                    setSearchProduct([]);
                  }
                }}
              />
              <label
                htmlFor="search"
                className="absolute right-3 text-gray-500"
              >
                <FiSearch />
              </label>
            </div>
            <div className="absolute z-50 bg-white p-3 rounded-lg shadow-lg w-[400px] right-0 max-h-[calc(100vh-100px)] top-12 overflow-auto">
              {/* {JSON.stringify(searchProduct)} */}
              {searchProduct?.map((singleProduct, index) => {
                return (
                  <motion.div
                    key={`${singleProduct.id}-${index}`} // Change the key based on some unique identifier
                    className="flex  gap-2 "
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div
                      className=" overflow-hidden w-[50px] h-[50px] bg-black bg-cover bg-center   relative rounded-lg"
                      style={{
                        backgroundImage: `url(${singleProduct?.images[0]})`,
                      }}
                    ></div>
                    {/* Product Details */}
                    <div className="flex  flex-col w-full">
                      <h1 className="text-lg font-semibold flex justify-between">
                        <div className="text-md">{singleProduct.title}</div>
                        <button className="bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                            />
                          </svg>
                        </button>
                      </h1>
                      <div className="flex gap-1 items-center justify-between ">
                        <div className="flex gap-1 items-center">
                          <div className="font-bold font-mono">
                            ${singleProduct.price}
                          </div>
                          <div className="text-gray-700 text-xs">
                            {singleProduct.discountPercentage > 0 &&
                              `(After ${singleProduct.discountPercentage}% off)`}
                          </div>
                        </div>
                        <div className="text-xs font-bold">
                          {singleProduct.stock} stock
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          <div className="relative">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={"1"}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </div>
          </div>
          <div className="relative">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </div>
          </div>
          <div className="relative">
            <div
              onClick={() =>
                setActiveTab({ ...activeTab, profile: !activeTab.profile })
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={activeTab.profile ? "2" : "1"}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>
            {activeTab?.profile && (
              <motion.div
                className="text-sm absolute z-40 right-0 top-10 border-2 p-4 bg-white shadow-2xl flex flex-col gap-2 w-[250px]"
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.2 }}
                variants={{
                  hidden: { opacity: 0, y: -30, scale: 0.8 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
              >
                <div
                  onClick={() => dispatch(setTheme(!theme))}
                  className="hover:bg-gray-100 px-6 py-3 rounded-lg flex justify-center items-center relative"
                >
                  <div className="absolute left-3 text-md">
                    {!theme ? <BsSun /> : <BsMoonStarsFill />}
                  </div>
                  {!theme ? "Light" : "Dark"}
                </div>
                {!user?.operationType && (
                  <div className="flex gap-1 flex-col">
                    <button
                      onClick={() => dispatch(setTab("login"))}
                      className="hover:bg-gray-100 px-6 py-3 rounded-lg"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => dispatch(setTab("register"))}
                      className="bg-black text-white px-6 py-3 rounded-lg"
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
                    className="bg-black text-white px-6 py-3 rounded-lg"
                  >
                    Logout
                  </button>
                )}
              </motion.div>
            )}
          </div>

          {/* {user?.user && (
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
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
