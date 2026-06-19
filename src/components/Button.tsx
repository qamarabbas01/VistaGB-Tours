import React from 'react';

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    bgColor?: string;
    textColor?: string;
    outline?: boolean;
    className?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    borderColor?: string;
};

function Button({
    children,
    onClick,
    bgColor = "",
    textColor = "",
    outline = false,
    className = "",
    disabled = false,
    type = "button",
    borderColor = "border-transparent"
}: ButtonProps) {

    let base =
        `rounded-full px-8 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60`;

    if (outline) {
        base += ` border ${borderColor} bg-transparent`;
    } else {
        base += ` ${bgColor}`;
    }

    base += ` ${textColor}`;

    return (
        <button
            type={type}
            className={`${base} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button