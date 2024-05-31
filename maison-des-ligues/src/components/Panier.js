import React, { useState } from 'react';

const Panier = () => {
    const [cartItems, setCartItems] = useState([]);

    return (
        <div className="panier-container">
            {cartItems.map(item => (
                <div className="produit" key={item.pid}>
                    <img src={`http://localhost:3000/${item.image}`} alt={item.name} />
                    <div className="produit-info">
                        <h4 className="produit-nom">{item.name}</h4>
                        <p className="produit-prix">{item.price}</p>
                        <p className="produit-quantity">{item.quantity}</p>
                    </div>
                    <button className="remove-button">Remove</button>
                </div>
            ))}
        </div>
    );
};

export default Panier;