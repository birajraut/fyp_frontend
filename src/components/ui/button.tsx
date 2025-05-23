import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "default";
}

const Button: React.FC<ButtonProps> = ({ variant = "default", children, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded ${
        variant === "outline" ? "border border-gray-500 text-gray-700" : "bg-blue-500 text-white"
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
