-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 12 mars 2024 à 07:55
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `notes_epsi_enmieux`
--

-- --------------------------------------------------------

--
-- Structure de la table `classe`
--

DROP TABLE IF EXISTS `classe`;
CREATE TABLE IF NOT EXISTS `classe` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nom` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `classe`
--

INSERT INTO `classe` (`ID`, `Nom`) VALUES
(1, 'B3 CDA'),
(2, 'B3 ASRBD');

-- --------------------------------------------------------

--
-- Structure de la table `cours`
--

DROP TABLE IF EXISTS `cours`;
CREATE TABLE IF NOT EXISTS `cours` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Prof` int(11) DEFAULT NULL,
  `Titre` varchar(255) NOT NULL,
  `Description` text,
  PRIMARY KEY (`ID`),
  KEY `ID_Prof` (`ID_Prof`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `cours`
--

INSERT INTO `cours` (`ID`, `ID_Prof`, `Titre`, `Description`) VALUES
(1, 1, 'CDA1', 'Introduction à l\'algèbre'),
(2, 2, 'CDA2', 'Principes de base de la biologie'),
(3, 2, 'ASRBD1', 'Étude des oeuvres modernes'),
(4, 2, 'ASRBD2', 'Introduction à la chimie');

-- --------------------------------------------------------

--
-- Structure de la table `coursclasse`
--

DROP TABLE IF EXISTS `coursclasse`;
CREATE TABLE IF NOT EXISTS `coursclasse` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Cours` int(11) DEFAULT NULL,
  `ID_Classe` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_Cours` (`ID_Cours`),
  KEY `ID_Classe` (`ID_Classe`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `coursclasse`
--

INSERT INTO `coursclasse` (`ID`, `ID_Cours`, `ID_Classe`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 2),
(4, 4, 2);

-- --------------------------------------------------------

--
-- Structure de la table `evaluation`
--

DROP TABLE IF EXISTS `evaluation`;
CREATE TABLE IF NOT EXISTS `evaluation` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Cours` int(11) DEFAULT NULL,
  `Sujet` varchar(255) NOT NULL,
  `Date` date NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_Cours` (`ID_Cours`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `evaluation`
--

INSERT INTO `evaluation` (`ID`, `ID_Cours`, `Sujet`, `Date`) VALUES
(1, 1, 'Test CDA 1', '2023-03-15'),
(2, 1, 'Test CDA 2', '2023-04-20'),
(3, 2, 'Test CDA 3', '2024-01-10'),
(4, 2, 'Test CDA 4', '2024-02-15'),
(5, 3, 'Test ASRBD 1', '2024-03-20'),
(6, 3, 'Test ASRBD 2', '2024-04-22'),
(7, 4, 'Test ASRBD 3', '2024-03-20'),
(8, 4, 'Test ASRBD 4', '2024-04-22');

-- --------------------------------------------------------

--
-- Structure de la table `note`
--

DROP TABLE IF EXISTS `note`;
CREATE TABLE IF NOT EXISTS `note` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_User` int(11) DEFAULT NULL,
  `ID_Evaluation` int(11) DEFAULT NULL,
  `Valeur` float DEFAULT NULL,
  `Coefficient` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_Eleve` (`ID_User`),
  KEY `ID_Evaluation` (`ID_Evaluation`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `note`
--

INSERT INTO `note` (`ID`, `ID_User`, `ID_Evaluation`, `Valeur`, `Coefficient`) VALUES
(1, 3, 1, 15.5, 1),
(2, 4, 1, 14, 2),
(3, 3, 2, 17, 2),
(4, 4, 2, 16, 1),
(5, 3, 3, 18, 1),
(6, 4, 3, 16.5, 3),
(7, 3, 4, 14, 1),
(8, 4, 4, 19, 1),
(9, 5, 5, 17, 1),
(10, 6, 5, 15, 1),
(11, 5, 6, 18.5, 1),
(12, 6, 6, 15.5, 3),
(13, 5, 7, 17, 1),
(14, 6, 7, 15, 5),
(15, 5, 8, 18.5, 1),
(16, 6, 8, 15.5, 1);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Nom` varchar(255) NOT NULL,
  `Prenom` varchar(255) NOT NULL,
  `Role` varchar(255) NOT NULL,
  `ID_classe` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_classe` (`ID_classe`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`ID`, `Username`, `Password`, `Nom`, `Prenom`, `Role`, `ID_classe`) VALUES
(1, 'jdupont', 'password123', 'Dupont', 'Jean', 'Prof', NULL),
(2, 'amartin', 'password456', 'Martin', 'Alice', 'Prof', NULL),
(3, 'maximeL', 'password789', 'Leroy', 'Maxime', 'Eleve', 1),
(4, 'claireB', 'password101', 'Bernard', 'Claire', 'Eleve', 1),
(5, 'lucasP', 'password102', 'Petit', 'Lucas', 'Eleve', 2),
(6, 'julietteM', 'password103', 'Moreau', 'Juliette', 'Eleve', 2);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `coursclasse`
--
ALTER TABLE `coursclasse`
  ADD CONSTRAINT `coursclasse_ibfk_1` FOREIGN KEY (`ID_Cours`) REFERENCES `cours` (`ID`),
  ADD CONSTRAINT `coursclasse_ibfk_2` FOREIGN KEY (`ID_Classe`) REFERENCES `classe` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
