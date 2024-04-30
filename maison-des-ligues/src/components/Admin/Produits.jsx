import React, { useState, useEffect } from 'react';
import '../../styles/Admin/Produits.css';

const Produits = () => {
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [error, setError] = useState(null);

    // Nouvel état pour stocker les informations du produit sélectionné pour la modification
    const [editProduct, setEditProduct] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/api/produitsroute/produit")
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error(error));
    }, []);

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setImage(e.target.files[0]);
        } else if (e.target.name === 'name') {
            setName(e.target.value);
        } else if (e.target.name === 'details') {
            setDetails(e.target.value);
        } else if (e.target.name === 'price') {
            setPrice(e.target.value);
        } else if (e.target.name === 'quantity') {
            setQuantity(e.target.value);
        }
    };

    // Gestionnaire de sélection d'un produit pour la modification
    const handleEditProduct = (product) => {
        setEditProduct(product);
        setSelectedProduct(product);
        setName(product.name);
        setDetails(product.details);
        setPrice(product.price);
        setQuantity(product.quantity);
        // Réinitialiser l'image pour éviter les problèmes de cache dans le formulaire de modification
        setImage(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('name', name);
        formDataToSend.append('details', details);
        formDataToSend.append('price', price);
        formDataToSend.append('image', image);
        formDataToSend.append('quantity', quantity); // Ajout de la quantité dans les données à envoyer

        try {
            if (selectedProduct) {
                const response = await fetch(`http://localhost:3000/api/produitsroute/produit/${selectedProduct.pid}`, {
                    method: 'PUT', // Utilisation de la méthode PUT pour la mise à jour
                    body: formDataToSend,
                });

                if (response.ok) {
                    // Mise à jour de l'état du produit modifié
                    const updatedProduct = await response.json();
                    const updatedProducts = products.map(product =>
                        product.pid === updatedProduct.pid ? updatedProduct : product
                    );
                    setProducts(updatedProducts);

                    // Réinitialisation des champs du formulaire
                    setName('');
                    setDetails('');
                    setPrice('');
                    setImage(null);
                    setQuantity('');
                    setSelectedProduct(null);
                    // Réinitialiser l'état du produit en cours de modification
                    setEditProduct(null);
                } else {
                    console.error('Erreur lors de la mise à jour du produit :', response.statusText);
                    setError('Erreur lors de la mise à jour du produit.');
                }
            } else {
                // Logique d'ajout d'un nouveau produit (inchangée)
            }
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire :', error);
            setError('Une erreur s\'est produite lors de la soumission du formulaire.');
        }
    };

    const handleDeleteProduct = async (pid) => {
        try {
            const response = await fetch(`http://localhost:3000/api/produitsroute/produit/${pid}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setProducts(products.filter(product => product.pid !== pid));
            } else {
                console.error('Erreur lors de la suppression du produit :', response.statusText);
                setError('Erreur lors de la suppression du produit.');
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du produit :', error);
            setError('Une erreur s\'est produite lors de la suppression du produit.');
        }
    };

    return (
        <section className="add-products">
            <h1>Ajouter/Modifier un produit</h1>

            <form onSubmit={handleSubmit}>
                <div className="flex">
                    <div className="inputBox">
                        <span>Nom du produit </span>
                        <input type="text" className="box" required maxLength="100" placeholder="Entrer le nom du produit" name="name" value={name} onChange={handleChange} />
                    </div>
                    <div className="inputBox">
                        <span>Prix du produit </span>
                        <input type="number" className="box" required max="9999999" placeholder="Entrer le prix du produit" name="price" value={price} onChange={handleChange} />
                    </div>
                    <div className="inputBox">
                        <span>Quantité du produit </span>
                        <input type="number" className="box" required min="1" placeholder="Entrer la quantité du produit" name="quantity" value={quantity} onChange={handleChange} />
                    </div>
                    <div className="inputBox">
                        <span>Image du produit </span>
                        <input type="file" name="image" accept="image/jpg, image/jpeg, image/png, image/webp" className="box" onChange={handleChange} required />
                    </div>
                    <div className="inputBox">
                        <span>Description du produit </span>
                        <textarea name="details" placeholder="Entrer la description du produit" className="box" required maxLength="500" cols="30" rows="10" value={details} onChange={handleChange} />
                    </div>
                    <input type="submit" value={selectedProduct ? "Modifier le produit" : "Ajouter le produit"} className="btn" name="add_product" />
                </div>
            </form>
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
                            <button className='btn2' onClick={() => handleEditProduct(product)}>Modifier</button>
                            <button className='btn2' onClick={() => handleDeleteProduct(product.pid)}>Supprimer</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Nouveau formulaire pour modifier un produit */}
            {editProduct && (
                <form onSubmit={handleSubmit}>
                    {/* Vous pouvez concevoir ce formulaire selon vos besoins */}
                    {/* Par exemple, vous pouvez afficher les valeurs actuelles du produit sélectionné pour la modification */}
                    {/* Vous pouvez également ajouter des champs supplémentaires si nécessaire */}
                    <input type="text" value={name} onChange={handleChange} name="name" />
                    <input type="text" value={details} onChange={handleChange} name="details" />
                    <input type="number" value={price} onChange={handleChange} name="price" />
                    <input type="number" value={quantity} onChange={handleChange} name="quantity" />
                    <input type="file" onChange={handleChange} name="image" />
                    <button type="submit">Valider la modification</button>
                </form>
            )}
        </section>
    );
};

export default Produits;
