import React from 'react';

interface AddToCartButtonProps {
    onClick: () => void;
    stock: number;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({onClick, stock}) => {
    const isDisabled = stock <= 0;

    return (
        <button disabled={isDisabled} onClick={onClick} className={`py-3 px-6 rounded-lg text-white font-semibold transition-colors duration-300 focus:outline-none
                ${isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"}`}>
            {isDisabled ? "Slut i lager" : "Lägg i varukorg"}
        </button>
    );
};

export default AddToCartButton;
