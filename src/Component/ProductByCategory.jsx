import { useState, useEffect } from "react";
import axios from "axios";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { BsCart, BsFullscreenExit } from "react-icons/bs";
import { motion } from "framer-motion";

export const renderStars = (rating) => {
  const stars = [];
  const roundedRating = Math.round(rating * 2) / 2;

  for (let i = 1; i <= 5; i++) {
    if (i <= roundedRating) stars.push(<FaStar key={i} />);
    else if (i - 0.5 === roundedRating) stars.push(<FaStarHalfAlt key={i} />);
    else stars.push(<FaStar key={i} />);
  }

  return stars;
};

const ProductByCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedValue, setSelectedValue] = useState("smartphones");
  const [categoryProduct, setCategoryProduct] = useState([]);

  const handleRadioChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    axios
      .get(`https://dummyjson.com/products/category/${value}`)
      .then((res) => setCategoryProduct(res?.data?.products))
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    // Fetch data based on selectedValue
    axios
      .get(`https://dummyjson.com/products/category/${selectedValue}`)
      .then((res) => setCategoryProduct(res?.data?.products))
      .catch((err) => console.log(err.message));
  }, [selectedValue]); // Trigger on every change of selectedValue

  useEffect(() => {
    // Fetch initial categories data
    axios
      .get("https://dummyjson.com/products/categories")
      .then((res) => setCategories(res?.data));

    // Fetch initial data for the default category
    axios
      .get(`https://dummyjson.com/products/category/smartphones`)
      .then((res) => setCategoryProduct(res?.data?.products))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className="grid grid-cols-4 gap-3 my-3 p-3">
      {/* Category Selection */}
      <div className="p-3 flex flex-col gap-2">
        <div className="text-xl m-3 gap-3 text-gray-800">
          Product By Category
        </div>
        <div>
          {categories.map((category, index) => (
            <div key={category} className="w-full flex text-sm">
              <input
                type="radio"
                id={category}
                name="category"
                className="hidden"
                value={category}
                checked={selectedValue === category}
                onChange={handleRadioChange}
              />
              <motion.label
                className={`w-full py-1 px-2 capitalize text-gray-600 ${
                  category === selectedValue
                    ? "text-[black] font-bold left-1 relative"
                    : ""
                }`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                htmlFor={category}
              >
                {category}
              </motion.label>
            </div>
          ))}
        </div>
      </div>

      {/* Display Products */}
      <div className="col-span-3">
        <div className="grid grid-cols-3 gap-3">
          {categoryProduct.map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`} // Change the key based on some unique identifier
              className="flex flex-col gap-2 "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {" "}
              <div className=" overflow-hidden bg-black w-full relative rounded-lg">
                {/* Image */}
                <div
                  className="bg-white min-h-[200px] bg-cover bg-no-repeat bg-center relative transition-transform transform hover:scale-110"
                  style={{ backgroundImage: `url(${item?.images[0]})` }}
                ></div>
                {/* Image Index */}
                <div className="text-white absolute right-2 px-3 py-1 text-xs top-2 z-30 bg-black  flex justify-center items-center rounded-md">
                  <p> {item.brand}</p>
                </div>
                <div className="text-black absolute left-2 h-8 w-8 text-bold top-2 z-30 bg-white   flex justify-center items-center rounded-md">
                  <p>
                    {" "}
                    <BsFullscreenExit />
                  </p>
                </div>
              </div>
              {/* Product Details */}
              <h1 className="text-lg font-semibold">{item.title}</h1>
              {/* <p>{item.description}</p> */}
              <div className="flex items-center gap-2 text-md text-xs">
                <div className="flex gap-1 items-center text-yellow-800">
                  {renderStars(item.rating)}{" "}
                  <div className="  text-black">({item.rating})</div>
                </div>
              </div>
              <div className="flex gap-1 items-center justify-between">
                <div className="flex gap-1 items-center">
                  <div className="font-bold font-mono"> ${item.price} </div>
                  <div className="text-gray-700 text-xs">
                    {" "}
                    {item.discountPercentage > 0 &&
                      `(After ${item.discountPercentage}% off)`}
                  </div>
                </div>
                <div className="text-xs">{item.stock} remain</div>
              </div>
              {/* Add To Cart Button */}
              <button className="relative text-white bg-black p-3 rounded-lg flex items-center justify-center">
                <BsCart className="absolute left-3" />
                Cart
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductByCategory;
