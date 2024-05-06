-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 29 avr. 2024 à 22:30
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `apiprod`
--

-- --------------------------------------------------------

--
-- Structure de la table `panier`
--

CREATE TABLE `panier` (
  `id` int(11) NOT NULL,
  `pid` char(36) NOT NULL,
  `uid` char(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `details` varchar(200) NOT NULL,
  `price` int(10) NOT NULL,
  `image` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `panier`
--

INSERT INTO `panier` (`id`, `pid`, `uid`, `name`, `details`, `price`, `image`, `quantity`) VALUES
(71, '264543c5-5713-4016-8923-806713440b97', '1fa940b2-93cb-42c9-9ef7-951ad8e80ab4', 'Chasuble', 'Ils sentent bon ne vous inquiétez pas', 4, 'uploads\\1714387397909.png', 1),
(72, '3450bcb8-a439-4d2d-8623-62b8389e47f9', '1fa940b2-93cb-42c9-9ef7-951ad8e80ab4', 'Gants de Boxe', 'Taper les gens avec ', 9, 'uploads\\1714387337239.png', 1),
(73, '4ca56f90-0612-11ef-8a7c-ac50de9f44be', '1fa940b2-93cb-42c9-9ef7-951ad8e80ab4', 'Ballon de foot', 'Ballon de basket', 9, 'uploads\\1714386194401.jpg', 1),
(74, '264543c5-5713-4016-8923-806713440b97', '1fa940b2-93cb-42c9-9ef7-951ad8e80ab4', 'Chasuble', 'Ils sentent bon ne vous inquiétez pas', 4, 'uploads\\1714387397909.png', 1),
(75, '3450bcb8-a439-4d2d-8623-62b8389e47f9', '1fa940b2-93cb-42c9-9ef7-951ad8e80ab4', 'Gants de Boxe', 'Taper les gens avec ', 9, 'uploads\\1714387337239.png', 1),
(76, '264543c5-5713-4016-8923-806713440b97', '1fa940b2-93cb-42c9-9ef7-951ad8e80ab4', 'Chasuble', 'Ils sentent bon ne vous inquiétez pas', 4, 'uploads\\1714387397909.png', 1);

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

CREATE TABLE `products` (
  `pid` char(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `details` varchar(200) NOT NULL,
  `price` int(10) NOT NULL,
  `image` varchar(100) NOT NULL,
  `quantity` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `products`
--

INSERT INTO `products` (`pid`, `name`, `details`, `price`, `image`, `quantity`) VALUES
('264543c5-5713-4016-8923-806713440b97', 'Chasuble', 'Ils sentent bon ne vous inquiétez pas', 4, 'uploads\\1714387397909.png', 33),
('3450bcb8-a439-4d2d-8623-62b8389e47f9', 'Gants de Boxe', 'Taper les gens avec ', 9, 'uploads\\1714387337239.png', 14),
('4ca56f90-0612-11ef-8a7c-ac50de9f44be', 'Ballon de foot', 'Ballon de basket', 9, 'uploads\\1714386194401.jpg', 8),
('674e3a80-ea39-4be0-859d-0934f777e71b', 'Ballon de basket', 'Ballon pour jouer', 1, 'uploads\\1714386521744.png', 90);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `uid` char(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `admin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`uid`, `name`, `email`, `password`, `admin`) VALUES
('0143b557-e989-4120-97c7-2e88b171a893', 'admin', 'q@q', 'a', 0),
('0ea13da9-8043-4c36-9f83-377dcb6ef395', 'marwan', 'm@m', '$2b$10$tMAHXv3jYBvYvN4Xr9qSc.tnImip0IfjIEIqQhpzz9Hg7SpumK/qW', 1),
('f6888154-bc6d-448b-9a57-e9e3b5d02afb', 'Antoine', 'antoine@gmail', '$2b$10$weexK6idFON3OsTnN1/lou6jd5zPqF.17W37zA1Ff39yyLnnO3IWO', 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `panier`
--
ALTER TABLE `panier`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_panier_uid` (`uid`),
  ADD KEY `fk_panier_pid` (`pid`);

--
-- Index pour la table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`pid`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `panier`
--
ALTER TABLE `panier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `panier`
--
ALTER TABLE `panier`
  ADD CONSTRAINT `fk_panier_pid` FOREIGN KEY (`pid`) REFERENCES `products` (`pid`),
  ADD CONSTRAINT `fk_panier_uid` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`),
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
