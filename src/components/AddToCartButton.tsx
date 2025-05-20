import React from 'react';

interface AddToCartButtonProps {
    onClick: () => void;
    stock: number;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ onClick, stock }) => {
    const isOutOfStock = stock <= 0;

    const baseStyles = "py-3 px-6 rounded-lg text-white font-semibold transition-colors duration-300 focus:outline-none";
    const enabledStyles = "bg-teal-600 hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50";
    const disabledStyles = "bg-gray-400 cursor-not-allowed";

    const buttonText = isOutOfStock ? "Slut i lager" : "Lägg i varukorg";
    const buttonStyles = isOutOfStock ? `${baseStyles} ${disabledStyles}` : `${baseStyles} ${enabledStyles}`;

    return (
        <button onClick={onClick}
            disabled={isOutOfStock}
            className={buttonStyles}>
            {buttonText}
        </button>
    );
};

export default AddToCartButton;
