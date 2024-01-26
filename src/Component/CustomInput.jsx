import React from "react";

const CustomInput = React.forwardRef(
  ({ type, labelName, inputName, rest, inputStyle, error, register }, ref) => {
    return (
      <div className="flex flex-col  ">
        <label htmlFor={inputName} className="uppercase">
          {labelName} : {register && <span className="text-[red]">*</span>}
        </label>
        <input
          type={type || "text"}
          name={inputName || "email"}
          ref={ref}
          {...register}
          id={inputName || "email"}
          className={`p-3 outline-none border-2 border-black ${inputStyle}`}
        />
        {error && <div className="text-xs mt-1 text-[red]">{error}</div>}
      </div>
    );
  }
);

export default CustomInput;
