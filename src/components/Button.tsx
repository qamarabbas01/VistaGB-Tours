import React from 'react';
import Link from 'next/link';

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
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
    href,
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

    const combinedClassName = `${base} ${className}`;

    if (href) {
        return (
            <Link href={href} className={combinedClassName} onClick={onClick}>
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            className={combinedClassName}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button;
