import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({
  label,
  id,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label htmlFor={id} className="text-sm font-medium text-slate-300">
        {label}
      </label>

      <input
        id={id}
        className={`bg-slate-800 border border-slate-700 text-white rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors ${className}`}
        {...props}
      />
    </div>
  );
}
