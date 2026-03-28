import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "danger" | "secondary" | "netral";
}

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseClases = "px-3 py-2 rounded-md font-semibold cursor-pointer";

  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    secondary: "bg-yellow-600 hover:bg-yellow-700 text-white",
    netral: "",
  };

  const selectedVariantClass = variantStyles[variant];

  return (
    <button
      className={`${baseClases} ${selectedVariantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
