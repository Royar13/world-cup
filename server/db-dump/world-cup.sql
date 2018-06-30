-- phpMyAdmin SQL Dump
-- version 4.5.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 30, 2018 at 05:47 PM
-- Server version: 5.7.11
-- PHP Version: 7.0.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `world-cup`
--

-- --------------------------------------------------------

--
-- Table structure for table `bets`
--

CREATE TABLE `bets` (
  `id` int(11) NOT NULL,
  `contestant_id` int(11) NOT NULL,
  `fifa_match_id` int(11) NOT NULL,
  `home_team_goals` int(11) NOT NULL,
  `away_team_goals` int(11) NOT NULL,
  `winner_country_code` char(3) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `contestants`
--

CREATE TABLE `contestants` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `winner_bet_country_code` char(3) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `fifa_code` char(3) COLLATE utf8_bin NOT NULL,
  `hebrew_name` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`fifa_code`, `hebrew_name`) VALUES
('ARG', 'ארגנטינה'),
('AUS', 'אוסטרליה'),
('BEL', 'בלגיה'),
('BRA', 'ברזיל'),
('COL', 'קולומביה'),
('CRC', 'קוסטה ריקה'),
('CRO', 'קרואטיה'),
('DEN', 'דנמרק'),
('EGY', 'מצרים'),
('ENG', 'אנגליה'),
('ESP', 'ספרד'),
('FRA', 'צרפת'),
('GER', 'גרמניה'),
('IRN', 'איראן'),
('ISL', 'איסלנד'),
('JPN', 'יפן'),
('KOR', 'דרום קוריאה'),
('KSA', 'ערב הסעודית'),
('MAR', 'מרוקו'),
('MEX', 'מקסיקו'),
('NGA', 'ניגריה'),
('PAN', 'פנמה'),
('PER', 'פרו'),
('POL', 'פולין'),
('POR', 'פורטוגל'),
('RUS', 'רוסיה'),
('SEN', 'סנגל'),
('SRB', 'סרביה'),
('SUI', 'שוויץ'),
('SWE', 'שבדיה'),
('TUN', 'טוניסיה'),
('URU', 'אורוגוואי');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bets`
--
ALTER TABLE `bets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `contestant_id` (`contestant_id`,`fifa_match_id`);

--
-- Indexes for table `contestants`
--
ALTER TABLE `contestants`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`fifa_code`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bets`
--
ALTER TABLE `bets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2541;
--
-- AUTO_INCREMENT for table `contestants`
--
ALTER TABLE `contestants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `bets`
--
ALTER TABLE `bets`
  ADD CONSTRAINT `bets_ibfk_1` FOREIGN KEY (`contestant_id`) REFERENCES `contestants` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
