import React, { useState, useEffect } from "react";
import "../../styles/Admin/Dashboard.css"
import { Link } from 'react-router-dom';
function Dashboard() {

    const [productCount, setProductCount] = useState(0);
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        fetch("http://localhost:3000/api/produitsroute/produit")
            .then((response) => response.json())
            .then((data) => setProductCount(data.length))
            .catch((error) => console.error(error));

        fetch("http://localhost:3000/api/usersroute/utilisateurs")
            .then((response) => response.json())
            .then((data) => setUserCount(data.length))
            .catch((error) => console.error(error));
    }, []);

    return (
        <section className="tbd">

            <h1>TABLEAU DE BORD</h1>

            <div className="box-container">

                <div className="box">
                    <h3>Bienvenue</h3>
                    <p>Admin</p>
                    <Link to="/Admin/Modif_Admin" className="btn">Modifier votre profil</Link>
                </div>
                <div className="box">
                    <h3>{productCount}</h3>
                    <p>Produits disponibles</p>
                    <Link to="/Admin/Produits" className="btn">Voir et ajouter des produits</Link>
                </div>
                <div className="box">
                    <h3>0</h3>
                    <p>Liste des commandes</p>
                    <Link to="/Admin/Commandes" className="btn">Voir les commandes</Link>
                </div>
                <div className="box">
                    <h3>{userCount}</h3>
                    <p>Liste des utilisateurs</p>
                    <Link to="/Admin/Utilisateurs" className="btn">Voir les utilisateurs</Link>
                </div>
            </div>

        </section>
    );
}

export default Dashboard;