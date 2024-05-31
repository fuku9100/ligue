import React, { useState, useEffect } from 'react';
import '../../styles/Admin/Produits.css';

const Produits = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/produitsroute/produit")
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <section className="add-products">
            <h1>Liste des Produits :</h1>
            <div className='liste'>
                {products.map(product => (
                    <div key={product.pid} className="box-product">
                        {product.image && <img src={`http://localhost:3000/${product.image}`} alt={product.name} style={{ maxWidth: '100%' }} />}
                        <div className="details">
                            <p>{product.name}</p>
                            <p>{product.details}</p>
                            <p>Prix : {product.price} €</p>
                            <p>Quantité disponible : {product.quantity}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Produits;