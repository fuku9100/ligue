import React, { useState } from 'react';
import '../styles/Inscription.css';


const InscriptionForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/usersroute/inscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Inscription réussie, redirige vers la page de connexion
                window.location.href = '/connexion';
            } else {
                console.error('Erreur lors de la soumission du formulaire :', response.statusText);
                // Gère l'erreur, par exemple, affiche un message d'erreur à l'utilisateur
            }
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire :', error);
            // Gère l'erreur, par exemple, affiche un message d'erreur à l'utilisateur
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Nom:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />

            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />

            <label>Mot de passe:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required autoComplete="current-password" />

            <button type="submit">S'inscrire</button>
        </form>
    );
};

export default InscriptionForm;