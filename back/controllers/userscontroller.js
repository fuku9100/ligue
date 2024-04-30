const { db } = require('../Database/database');
const express = require('express');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const app = express();
const jwt = require('jsonwebtoken');
exports.connexion = async (req, res) => {
    const { email, password } = req.body;

    try {
        const connection = await db.getConnection();

        const [result] = await connection.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        connection.release();

        if (result.length === 0) {
            return res.status(401).json({ error: 'Utilisateur non trouvé' });
        }

        const user = result[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Mot de passe incorrect' });
        }

        const isAdmin = user.admin === 1; // Vérifiez si l'utilisateur est administrateur

        // Création du token JWT en incluant l'uid de l'utilisateur
        const token = jwt.sign({
            uid: user.uid, // Inclure l'uid de l'utilisateur
            email: user.email,
            isAdmin: isAdmin // Inclure le statut d'administrateur dans les données du jeton
        }, process.env.API_KEY, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        res.status(500).json({ error: 'Une erreur de connexion' });
    }
};
exports.inscription = async (req, res) => {
    const { name, email, password } = req.body;
    const uid = crypto.randomUUID(); // Génère un UUID cryptographiquement sécurisé
    try {
        // Utilisation de bcrypt pour hacher le mot de passe avant de le stocker dans la base de données
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // Insertion des informations de l'utilisateur dans la base de données
        const [result] = await db.execute(
            'INSERT INTO users (uid, name, email, password) VALUES (?, ?, ?, ?)',
            [uid, name, email, hashedPassword]
        );
        // Réponse réussie en cas d'inscription réussie
        res.status(200).json({ message: 'Inscrit avec succès' });
    } catch (error) {
        // En cas d'erreur, renvoie une erreur 500 avec un message d'erreur
        console.error(error);
        res.status(500).json({ error: 'Une erreur s\'est produite' });
    }
};

exports.administrateurs = async (req, res) => {
    try {
        // Récupération de la liste des administrateurs depuis la base de données
        const [result] = await db.query('SELECT uid, name, email FROM users WHERE admin = 1');
        // Réponse réussie avec la liste des administrateurs
        res.status(200).json(result);
    } catch (error) {
        // En cas d'erreur, renvoie une erreur 500 avec un message d'erreur
        console.error(error);
        res.status(500).send({ error: 'Une erreur s\'est produite' });
    }
};

exports.modifieradmin = async (req, res) => {
    const { uid, newName, newEmail, newPassword } = req.body;
    try {
        // Vérifiez si l'utilisateur existe
        const [userResult] = await db.execute(
            'SELECT uid, password FROM users WHERE uid = ?',
            [uid]
        );

        if (userResult.length > 0) {
            const user = userResult[0];

            // Vérifiez et mettez à jour le nom et l'email
            await db.execute(
                'UPDATE users SET name = ?, email = ? WHERE uid = ?',
                [newName, newEmail, uid]
            );

            // Vérifiez et mettez à jour le mot de passe si un nouveau mot de passe est fourni
            if (newPassword) {
                // Cryptez le nouveau mot de passe avec bcrypt
                const hashedPassword = await bcrypt.hash(newPassword, 10);
                await db.execute(
                    'UPDATE users SET password = ? WHERE uid = ?',
                    [hashedPassword, uid]
                );
            }

            res.status(200).json({ message: 'Administrateur modifié avec succès' });
        } else {
            res.status(404).json({ error: 'Administrateur non trouvé' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur s\'est produite' });
    }
};

exports.utilisateurs = async (req, res) => {
    try {
        // Récupération de la liste des utilisateurs qui ne sont pas administrateurs depuis la base de données
        const [result] = await db.query('SELECT uid, name, email FROM users WHERE admin = 0');
        // Réponse réussie avec la liste des utilisateurs
        res.status(200).json(result);
    } catch (error) {
        // En cas d'erreur, renvoie une erreur 500 avec un message d'erreur
        console.error(error);
        res.status(500).send({ error: 'Une erreur s\'est produite' });
    }
};

exports.delete = async (req, res) => {
    const uid = req.params.uid;

    try {
        // Vérifie si l'utilisateur existe
        const [userResult] = await db.execute(
            'SELECT uid FROM users WHERE uid = ?',
            [uid]
        );

        if (userResult.length > 0) {
            // Supprime l'utilisateur de la base de données
            await db.execute('DELETE FROM users WHERE uid = ?', [uid]);

            res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
        } else {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur s\'est produite' });
    }
};


exports.deconnexion = async (req, res) => {
    try {
        // Ajoutez ici d'autres actions côté serveur liées à la déconnexion
        // ...

        res.clearCookie('token'); // Supprimez le cookie du token côté serveur si vous en avez créé un
        res.status(200).json({ message: 'Déconnexion réussie' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la déconnexion' });
    }
};

exports.connexionAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const connection = await db.getConnection();

        const [result] = await connection.query(
            'SELECT * FROM users WHERE email = ? AND admin = 1',
            [email]
        );

        connection.release();

        if (result.length === 0) {
            return res.status(401).json({ error: 'Accès refusé. Vous n\'êtes pas administrateur.' });
        }

        const user = result[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Mot de passe incorrect' });
        }

        // Création du token JWT pour l'administrateur
        const token = jwt.sign({
            uid: user.uid,
            email: user.email,
            isAdmin: true
        }, process.env.API_KEY, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Erreur lors de la connexion admin :', error);
        res.status(500).json({ error: 'Une erreur de connexion' });
    }
};
