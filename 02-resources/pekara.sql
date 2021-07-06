-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 05, 2021 at 03:04 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pekara`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kategorija`
--

CREATE TABLE `kategorija` (
  `id` int(11) NOT NULL,
  `naziv` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `kategorija`
--

INSERT INTO `kategorija` (`id`, `naziv`) VALUES
(1, 'lisnata peciva'),
(2, 'slana peciva'),
(3, 'slatka peciva');

-- --------------------------------------------------------

--
-- Table structure for table `proizvod`
--

CREATE TABLE `proizvod` (
  `id` int(11) NOT NULL,
  `naziv` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `slika` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `opis` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `jedinica_mere` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `energetska_vrednost` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `kategorija_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `proizvod`
--

INSERT INTO `proizvod` (`id`, `naziv`, `slika`, `opis`, `jedinica_mere`, `energetska_vrednost`, `kategorija_id`) VALUES
(1, 'žu-žu', 'https://i.pinimg.com/originals/14/a2/1f/14a21fe414c874e75866d77dfc045740.jpg', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 'kilogram', '344.0 kcal', 1),
(2, 'Lisnati pužići', 'https://tvkuhinja.com/wp-content/uploads/2020/11/hqdefault-4.jpg', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.', 'kilogram', '264.0 kcal', 1),
(3, 'Surimi štapići', 'https://bonapeti.rs/files/lib/600x350/rulca-raci-testo1.jpg', 'Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage.', 'komad', '321.0 kcal', 1),
(4, 'Lisnate kiflice', 'https://recepti.zena.blic.rs/resources/images/f6/f6de322460825d1f312469bc6eaa29fb/resize/dc3aa6b6d3039953ab484dd78e026880_670x0.png', 'Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero.', 'pakovanje', '196.0 kcal', 1),
(5, 'Proja sa sirom', 'https://static.juznasrbija.info/files/proja-sa-sirom-1.jpg', 'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.', 'komad', '363.0 kcal', 2),
(6, 'Burek sa sirom', 'https://static.juznasrbija.info/files/burek-sa-sirom.jpg', 'It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.', 'komad', '246.0 kcal', 2),
(7, 'Bavarske perece', 'https://i2.wp.com/kuhinjazaposlenezene.com/wp-content/uploads/2015/09/Bavarskeperece.jpg?w=1200&ssl=1', 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.', 'komad', '210.0 kcal', 2),
(8, 'Štrudla sa makom', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_J5NATmYNYfaFMKrjzL5ctKLtJKF4UjYHKQ&usqp=CAU', 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account.', 'kilogram', '366.0 kcal', 3),
(9, 'Krofne sa čokoladom', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjiZMVqt96clqnwamRMUDlHPCYQ4V59QT31g&usqp=CAU', 'No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter.', 'komad', '315.7 kcal', 3),
(10, 'Pužići sa suvim\r\ngrožđem', 'https://podravkaiovariations.azureedge.net/f7adc912-640a-11eb-a58b-0242ac120042/v/f2b1f6a6-64bc-11eb-b6c2-0242ac130010/1600x1200-f2b21938-64bc-11eb-9498-0242ac130010.webp', 'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.', 'pakovanje', '241.0 kcal', 3);

-- --------------------------------------------------------

--
-- Table structure for table `proizvod_sastojak`
--

CREATE TABLE `proizvod_sastojak` (
  `id` int(11) NOT NULL,
  `proizvod_id` int(11) NOT NULL,
  `sastojak_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `proizvod_sastojak`
--

INSERT INTO `proizvod_sastojak` (`id`, `proizvod_id`, `sastojak_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 2, 5),
(6, 2, 6),
(7, 2, 7),
(8, 2, 8),
(9, 3, 5),
(10, 3, 9),
(11, 3, 10),
(12, 3, 11),
(13, 4, 5),
(14, 4, 12),
(15, 4, 10),
(16, 4, 13),
(17, 4, 14),
(18, 4, 1),
(19, 5, 15),
(20, 5, 1),
(21, 5, 14),
(22, 5, 4),
(23, 5, 12),
(24, 5, 16),
(25, 6, 17),
(26, 6, 12),
(27, 6, 3),
(28, 6, 4),
(29, 6, 16),
(30, 7, 1),
(31, 7, 4),
(32, 7, 16),
(33, 7, 3),
(34, 8, 18),
(35, 8, 19),
(36, 8, 1),
(37, 8, 20),
(38, 9, 4),
(39, 9, 18),
(40, 9, 1),
(41, 9, 19),
(42, 9, 16),
(43, 9, 21),
(44, 10, 4),
(45, 10, 16),
(46, 10, 19),
(47, 10, 22);

-- --------------------------------------------------------

--
-- Table structure for table `sastojak`
--

CREATE TABLE `sastojak` (
  `id` int(11) NOT NULL,
  `naziv` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `vegan` tinyint(1) NOT NULL,
  `vegeterijanac` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sastojak`
--

INSERT INTO `sastojak` (`id`, `naziv`, `vegan`, `vegeterijanac`) VALUES
(1, 'brašno', 1, 1),
(2, 'puter', 1, 1),
(3, 'so', 1, 1),
(4, 'voda', 1, 1),
(5, 'lisnato testo', 1, 1),
(6, 'ajvar', 1, 1),
(7, 'šunka', 0, 0),
(8, 'kačkavalj', 0, 1),
(9, 'surimi štapići', 1, 1),
(10, 'slanina', 0, 0),
(11, 'majonez', 0, 1),
(12, 'sir', 0, 1),
(13, 'kiseli krastavci', 1, 1),
(14, 'jogurt', 0, 1),
(15, 'kukuruzno brašno', 1, 1),
(16, 'ulje', 1, 1),
(17, 'kore za pite i gibanice', 1, 1),
(18, 'mleko', 0, 1),
(19, 'šećer', 1, 1),
(20, 'mleveni mak', 1, 1),
(21, 'čokolada', 0, 1),
(22, 'suvo grožđe', 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kategorija`
--
ALTER TABLE `kategorija`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `proizvod`
--
ALTER TABLE `proizvod`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kategorija` (`kategorija_id`);

--
-- Indexes for table `proizvod_sastojak`
--
ALTER TABLE `proizvod_sastojak`
  ADD PRIMARY KEY (`id`),
  ADD KEY `proizvod` (`proizvod_id`),
  ADD KEY `sastojak` (`sastojak_id`);

--
-- Indexes for table `sastojak`
--
ALTER TABLE `sastojak`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `proizvod`
--
ALTER TABLE `proizvod`
  ADD CONSTRAINT `proizvod_ibfk_1` FOREIGN KEY (`kategorija_id`) REFERENCES `kategorija` (`id`);

--
-- Constraints for table `proizvod_sastojak`
--
ALTER TABLE `proizvod_sastojak`
  ADD CONSTRAINT `proizvod_sastojak_ibfk_1` FOREIGN KEY (`proizvod_id`) REFERENCES `proizvod` (`id`),
  ADD CONSTRAINT `proizvod_sastojak_ibfk_2` FOREIGN KEY (`sastojak_id`) REFERENCES `sastojak` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
