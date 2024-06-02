import React from "react";

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`w-[11rem] h-[3rem] font-rubik text-[1.3rem] uppercase rounded-full cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
