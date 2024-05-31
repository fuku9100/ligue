const { db } = require('../Database/database');
const crypto = require('crypto');

const validateProductData = (req, res) => {
    const { name, details, price, quantity } = req.body;
    const image = req.file ? req.file.path : null;

    if (!name) {
        return res.status(400).json({ error: 'Le champ "Name" est manquant.' });
    }
    if (!details) {
        return res.status(400).json({ error: 'Le champ "Description" est manquant.' });
    }
    if (!price) {
        return res.status(400).json({ error: 'Le champ "Price" est manquant.' });
    }
    if (!quantity) {
        return res.status(400).json({ error: 'Le champ "Quantity" est manquant.' });
    }
    if (!image) {
        return res.status(400).json({ error: 'L\'image est manquante.' });
    }
    if (!req.file) {
        return res.status(400).json({ error: 'L\'image du produit est requise' });
    }

    return null;
};

exports.ajoutproduit = async (req, res) => {
    const validationError = validateProductData(req, res);
    if (validationError) {
        return validationError;
    }

    const { name, details, price, quantity } = req.body;
    const pid = crypto.randomUUID();
    const image = req.file.path;

    try {
        const [result] = await db.execute(
            'INSERT INTO products (pid, name, details, price, image, quantity) VALUES (?, ?, ?, ?, ?, ?)',
            [pid, name, details, price, image, quantity]
        );

        res.status(200).json({ message: 'Objet ajouté avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur s\'est produite' });
    }
};



exports.afficheproduit = async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM products');
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Une erreur s\'est produite' });
    }
};
exports.updateProduct = async (req, res) => {
    const { pid } = req.params;
    const { name, details, price, quantity } = req.body;
    const image = req.file ? req.file.path : null;

    try {
        if (!name) {
            console.log('Le champ "Name" est manquant.');
            return res.status(400).json({ error: 'Le champ "Name" est manquant.' });
        }
        if (!details) {
            console.log('Le champ "Description" est manquant.');
            return res.status(400).json({ error: 'Le champ "Description" est manquant.' });
        }
        if (!price) {
            console.log('Le champ "Price" est manquant.');
            return res.status(400).json({ error: 'Le champ "Price" est manquant.' });
        }
        if (!quantity) {
            console.log('Le champ "Quantity" est manquant.');
            return res.status(400).json({ error: 'Le champ "Quantity" est manquant.' });
        }

        let updateQuery = 'UPDATE products SET name = ?, details = ?, price = ?, quantity = ?';
        const queryParams = [name, details, price, quantity];

        if (image) {
            updateQuery += ', image = ?';
            queryParams.push(image);
        }

        updateQuery += ' WHERE pid = ?';
        queryParams.push(pid);

        const [result] = await db.execute(updateQuery, queryParams);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Produit mis à jour avec succès' });
        } else {
            res.status(404).json({ error: 'Produit non trouvé' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la mise à jour du produit' });
    }
};

exports.ajouterAuPanier = async (req, res) => {
    const { pid, uid, name, details, price, image, quantity } = req.body; // Ajoutez la quantité à récupérer depuis le corps de la requête

    // Vérifiez si pid, uid, name, details, price, image, et quantity sont définis
    if (!pid || !uid || !name || !details || !price || !image || !quantity) {
        return res.status(400).json({ error: 'Paramètres manquants' });
    }

    try {
        // Vérifiez si le produit existe
        const [productRow] = await db.execute('SELECT * FROM products WHERE pid = ?', [pid]);

        if (productRow.length === 0) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }

        // Vérifiez si la quantité disponible est suffisante
        if (productRow[0].quantity < quantity) { // Vérifiez si la quantité demandée est supérieure à la quantité disponible
            return res.status(400).json({ error: 'La quantité demandée est supérieure à la quantité disponible' });
        }

        // Mettez à jour la quantité disponible du produit
        const newQuantity = productRow[0].quantity - quantity; // Décrémentez la quantité disponible en fonction de la quantité demandée
        await db.execute('UPDATE products SET quantity = ? WHERE pid = ?', [newQuantity, pid]);

        // Ajoutez le produit au panier dans la base de données avec la quantité spécifiée
        await db.execute('INSERT INTO panier (pid, uid, name, details, price, image, quantity) VALUES (?, ?, ?, ?, ?, ?, ?)', [pid, uid, name, details, price, image, quantity]);

        console.log('Produit ajouté au panier avec succès:', { pid, uid, name, details, price, image });

        res.status(200).json({ message: 'Produit ajouté au panier avec succès' });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du produit au panier:', error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'ajout du produit au panier' });
    }
};


exports.getContenuPanier = async (req, res) => {
    const { uid } = req.query;

    try {
        // Récupérez le contenu du panier pour l'utilisateur spécifié
        const [panierRows] = await db.execute('SELECT * FROM panier WHERE uid = ?', [uid]);

        res.status(200).json(panierRows);
    } catch (error) {
        console.error('Erreur lors de la récupération du contenu du panier:', error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération du contenu du panier' });
    }
};

exports.supprimerDuPanier = async (req, res) => {
    const { pid, uid } = req.query;

    try {
        // Supprimez l'article du panier pour l'utilisateur spécifié
        await db.execute('DELETE FROM panier WHERE uid =? AND pid =?', [uid, pid]);

        res.status(200).json({ message: 'Article supprimé du panier' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'article du panier:', error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la suppression de l\'article du panier' });
    }
};
exports.supprimerproduit = async (req, res) => {
    const pid = req.params.pid; // Récupérer l'ID du produit à supprimer depuis les paramètres de l'URL

    try {
        const [result] = await db.execute(
            'DELETE FROM products WHERE pid = ?',
            [pid]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Objet supprimé avec succès' });
        } else {
            res.status(404).json({ error: 'Produit non trouvé' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la suppression du produit' });
    }
}; 