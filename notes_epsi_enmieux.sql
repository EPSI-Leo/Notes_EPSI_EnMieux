-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 02, 2024 at 11:02 AM
-- Server version: 8.2.0
-- PHP Version: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `notes_epsi_enmieux`
--

-- --------------------------------------------------------

--
-- Table structure for table `classe`
--

DROP TABLE IF EXISTS `classe`;
CREATE TABLE IF NOT EXISTS `classe` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Nom` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `classe`
--

INSERT INTO `classe` (`ID`, `Nom`) VALUES
(1, 'B3 CDA'),
(2, 'B3 ASRBD');

-- --------------------------------------------------------

--
-- Table structure for table `cours`
--

DROP TABLE IF EXISTS `cours`;
CREATE TABLE IF NOT EXISTS `cours` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_Prof` int DEFAULT NULL,
  `Titre` varchar(255) NOT NULL,
  `Description` text,
  PRIMARY KEY (`ID`),
  KEY `ID_Prof` (`ID_Prof`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `cours`
--

INSERT INTO `cours` (`ID`, `ID_Prof`, `Titre`, `Description`) VALUES
(1, 1, 'Algèbre', 'Introduction à l\'algèbre'),
(2, 2, 'Biologie', 'Principes de base de la biologie'),
(3, 2, 'Littérature Moderne', 'Étude des oeuvres modernes'),
(6, 2, 'Chimie', 'Introduction à la chimie'),
(12, 1, 'Cours 6', 'Description du cours 6'),
(13, 1, 'Cours 7', 'Description du cours 7'),
(14, 1, 'Cours 8', 'Description du cours 8'),
(15, 1, 'Cours 9', 'Description du cours 9'),
(16, 1, 'Cours 10', 'Description du cours 10');

-- --------------------------------------------------------

--
-- Table structure for table `coursclasse`
--

DROP TABLE IF EXISTS `coursclasse`;
CREATE TABLE IF NOT EXISTS `coursclasse` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_Cours` int DEFAULT NULL,
  `ID_Classe` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_Cours` (`ID_Cours`),
  KEY `ID_Classe` (`ID_Classe`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `coursclasse`
--

INSERT INTO `coursclasse` (`ID`, `ID_Cours`, `ID_Classe`) VALUES
(1, 3, 1),
(2, 4, 2),
(3, 1, 1),
(4, 1, 2),
(5, 2, 1),
(6, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `evaluation`
--

DROP TABLE IF EXISTS `evaluation`;
CREATE TABLE IF NOT EXISTS `evaluation` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_Cours` int DEFAULT NULL,
  `Sujet` varchar(255) NOT NULL,
  `Date` date NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_Cours` (`ID_Cours`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `evaluation`
--

INSERT INTO `evaluation` (`ID`, `ID_Cours`, `Sujet`, `Date`) VALUES
(1, 1, 'Test Algèbre 1', '2023-03-15'),
(2, 2, 'Test Biologie 1', '2023-04-20'),
(3, 3, 'Dissertation sur le 20e siècle', '2024-01-10'),
(4, 4, 'Examen de physique', '2024-02-15'),
(5, 5, 'Contrôle Géométrie', '2024-03-20'),
(6, 6, 'TP Chimie', '2024-04-22');

-- --------------------------------------------------------

--
-- Table structure for table `note`
--

DROP TABLE IF EXISTS `note`;
CREATE TABLE IF NOT EXISTS `note` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_User` int DEFAULT NULL,
  `ID_Evaluation` int DEFAULT NULL,
  `Valeur` float DEFAULT NULL,
  `Coefficient` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_Evaluation` (`ID_Evaluation`),
  KEY `ID_User` (`ID_User`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `note`
--

INSERT INTO `note` (`ID`, `ID_User`, `ID_Evaluation`, `Valeur`, `Coefficient`) VALUES
(1, 1, 1, 15.5, 1),
(2, 2, 1, 14, 1),
(3, 3, 2, 17, 1),
(4, 4, 2, 16, 1),
(5, 5, 3, 18, 1),
(6, 6, 3, 16.5, 1),
(7, 7, 4, 14, 1),
(8, 8, 4, 19, 1),
(9, 9, 5, 17, 1),
(10, 10, 5, 15, 1),
(11, 11, 6, 18.5, 1),
(12, 12, 6, 15.5, 1),
(13, 1, 1, 12, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Nom` varchar(255) NOT NULL,
  `Prenom` varchar(255) NOT NULL,
  `Role` varchar(255) NOT NULL,
  `ID_classe` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_classe` (`ID_classe`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `Username`, `Password`, `Nom`, `Prenom`, `Role`, `ID_classe`) VALUES
(1, 'jdupont', 'password123', 'Dupont', 'Jean', 'Prof', NULL),
(2, 'amartin', 'password456', 'Martin', 'Alice', 'Prof', NULL),
(3, 'maximeL', 'password789', 'Leroy', 'Maxime', 'Eleve', 1),
(4, 'claireB', 'password101', 'Bernard', 'Claire', 'Eleve', 1),
(5, 'lucasP', 'password102', 'Petit', 'Lucas', 'Eleve', 2),
(6, 'julietteM', 'password103', 'Moreau', 'Juliette', 'Eleve', 2);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
