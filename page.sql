-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 27, 2016 at 03:22 PM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.6.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pages`
--

-- --------------------------------------------------------

--
-- Table structure for table `page`
--

CREATE TABLE `page` (
  `id` int(11) NOT NULL,
  `page_number` int(11) NOT NULL,
  `title` varchar(11) NOT NULL,
  `project_number` int(11) NOT NULL,
  `jsonObj` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `page`
--

INSERT INTO `page` (`id`, `page_number`, `title`, `project_number`, `jsonObj`) VALUES
(1, 1, 'hi', 0,'{"columns":[{"items":[{"id":0,"type":"image","cssClass":"defaultClass3","image":{"src":"images/shipyard1.jpg","width":100,"height":100,"align":"center"}},{"id":1,"type":"text","cssClass":"defaultClass4","headerStyle":"color:blue;margin-left:30px;","headerText":"Header","size":12,"font":"Arial","text":"<p>blah</p>"}],"$$hashKey":"object:73"}]}'),
(2, 2, '4', 0,'{"columns":[{"items":[{"id":0,"type":"image","cssClass":"defaultClass3","image":{"src":"images/shipyard1.jpg","width":100,"height":100,"align":"center"}},{"id":1,"type":"text","cssClass":"defaultClass4","headerStyle":"color:blue;margin-left:30px;","headerText":"Header","size":12,"font":"Arial","text":"<p>blah</p>"}],"$$hashKey":"object:73"}]}'),
(3, 3, 'tribble', 5,'{"columns":[{"items":[{"id":0,"type":"image","cssClass":"defaultClass3","image":{"src":"images/shipyard1.jpg","width":100,"height":100,"align":"center"}},{"id":1,"type":"text","cssClass":"defaultClass4","headerStyle":"color:blue;margin-left:30px;","headerText":"Header","size":12,"font":"Arial","text":"<p>blah</p>"}],"$$hashKey":"object:73"}]}'),
(4, 5, 'rental', 1,'{"columns":[{"items":[{"id":0,"type":"image","cssClass":"defaultClass3","image":{"src":"images/shipyard1.jpg","width":100,"height":100,"align":"center"}},{"id":1,"type":"text","cssClass":"defaultClass4","headerStyle":"color:blue;margin-left:30px;","headerText":"Header","size":12,"font":"Arial","text":"<p>blah</p>"}],"$$hashKey":"object:73"}]}'),
(5, 6, 'New', 5,'{"columns":[{"items":[{"id":0,"type":"image","cssClass":"defaultClass3","image":{"src":"images/shipyard1.jpg","width":100,"height":100,"align":"center"}},{"id":1,"type":"text","cssClass":"defaultClass4","headerStyle":"color:blue;margin-left:30px;","headerText":"Header","size":12,"font":"Arial","text":"<p>blah</p>"}],"$$hashKey":"object:73"}]}'),
(6, 7, 'none', 6, 0x7b7d),
(7, 8, 'hi', 9, 0x7b7d);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `page`
--
ALTER TABLE `page`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `page`
--
ALTER TABLE `page`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
