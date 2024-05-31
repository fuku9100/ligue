// AddProduct.jsx
import React, { useState } from 'react';

function AddProduct() {
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');

    const addProduct = () => {
        // Function to add a product
    };

    return (
        <div>
            {/* Render your form to add a product here */}
        </div>
    );
}

export default AddProduct;