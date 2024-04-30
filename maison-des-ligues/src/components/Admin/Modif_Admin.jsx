import React, { useState, useEffect } from 'react';
import '../../styles/Modif_Admin.css';
import bcrypt from 'bcryptjs';

const Modif_Admin = () => {
    const [administrateurs, setAdministrateurs] = useState([]);
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        fetch("http://localhost:3000/api/usersroute/administrateurs")
            .then((response) => response.json())
            .then((data) => setAdministrateurs(data))
            .catch((error) => console.error(error));
    }, []);

    const handleModification = async (uid) => {
        try {
            // Cryptez le nouveau mot de passe avec bcryptjs
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            const response = await fetch('http://localhost:3000/api/usersroute/modifieradmin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid,
                    newName,
                    newEmail,
                    newPassword: hashedPassword,  // Envoyez le mot de passe crypté
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                // Mettez à jour la liste des administrateurs après la modification réussie
                setAdministrateurs((admins) =>
                    admins.map((admin) =>
                        admin.uid === uid
                            ? { ...admin, name: newName, email: newEmail }
                            : admin
                    )
                );
                // Réinitialisez les champs de saisie après la modification réussie
                setNewName('');
                setNewEmail('');
                setNewPassword('');
            } else {
                console.error('Erreur lors de la modification de l\'administrateur :', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de la modification de l\'administrateur :', error);
        }
    };

    return (
        <section className="modify-admins">
            <h1>Modification des administrateurs</h1>

            <div>
                {administrateurs.map((admin) => (
                    <div key={admin.uid} className="admin-box">
                        <h2>{admin.name}</h2>
                        <p>Email: {admin.email}</p>
                        <div>
                            <input
                                name='name'
                                type="text"
                                placeholder="Nouveau Nom"
                                // value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                            />
                            <input
                                name='email'
                                type="text"
                                placeholder="Nouvel Email"
                                // value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                            />
                            <input
                                name='password'
                                type="password"
                                placeholder="Nouveau Mot de Passe"
                                // value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <button onClick={() => handleModification(admin.uid)}>
                                Modifier
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Modif_Admin;
