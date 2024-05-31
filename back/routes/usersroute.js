const express = require('express');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const usercontroller = require('../controllers/userscontroller');
const { isAdmin } = require('../midleware/middleware');
const { authenticator } = require('../midleware/middleware');
const cookieParser = require('cookie-parser');
const app = express();


const router = express.Router();

router.post('/connexion', usercontroller.connexion);
router.post('/inscription', usercontroller.inscription);
router.get('/utilisateurs', usercontroller.utilisateurs);
router.get('/administrateurs', authenticator, isAdmin, usercontroller.administrateurs);
router.delete('/utilisateurs/:uid', usercontroller.delete);
router.post('/deconnexion', usercontroller.deconnexion);
router.post('/connexionadmin', usercontroller.connexionAdmin);

module.exports = router;