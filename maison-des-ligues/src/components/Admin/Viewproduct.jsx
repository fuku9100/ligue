// ViewProducts.jsx
import React, { useEffect, useState } from 'react';

function ViewProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/produitsroute/produit")
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            {/* Render your products here */}
        </div>
    );
}

export default ViewProducts;