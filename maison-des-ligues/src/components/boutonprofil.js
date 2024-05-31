import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import logo_profil from '../assets/person-badge-fill.svg';
import '../styles/bouton.css';
import Cookies from 'js-cookie';

const MyComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Récupérer le token à partir du cookie
    const token = Cookies.get('token');

    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const handleLogout = async () => {
    try {
      // Effectuer une requête vers le point de terminaison de déconnexion de votre serveur
      const response = await fetch('http://localhost:3000/api/usersroute/deconnexion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Vous pouvez inclure les données nécessaires dans le corps
        // Par exemple, l'ID d'utilisateur ou le jeton si nécessaire
        body: JSON.stringify({}),
      });

      if (response.ok) {
        // Effectuer des actions côté client après une déconnexion réussie
        Cookies.remove('token');
        localStorage.clear(); // Effacer les données utilisateur stockées
        window.location.href = '/'; // Rediriger vers la page d'accueil ou la page de connexion
      } else {
        const errorData = await response.json();
        console.error(errorData.error);
        // Gérer la réponse d'erreur du serveur
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
      // Gérer toute erreur inattendue
    }
  };

  return (
    <div>
      <button onClick={handleClick}><img src={logo_profil} className="img_profil" alt="Profil"></img></button>
      {isVisible && (
        <div className="bouton-profil">
          {isAuthenticated ? (
            <>
              
              <button className="deco" onClick={handleLogout}>Déconnexion</button>
            </>
          ) : (
            <>
              <button><Link to="/connexion">Connexion</Link></button>
              <button><Link to="/inscription">Inscription</Link></button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MyComponent;
