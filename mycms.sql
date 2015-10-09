-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Июн 19 2015 г., 09:24
-- Версия сервера: 5.5.25
-- Версия PHP: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `mycms`
--

-- --------------------------------------------------------

--
-- Структура таблицы `content`
--

CREATE TABLE IF NOT EXISTS `content` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '',
  `alias_content` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `tizer` text NOT NULL,
  `price` float(7,2) NOT NULL DEFAULT '0.00',
  `img` varchar(255) NOT NULL DEFAULT '',
  `parent_content` int(5) NOT NULL DEFAULT '0',
  `date_content` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `public_content` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `alias` (`alias_content`),
  KEY `name` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- Дамп данных таблицы `content`
--

INSERT INTO `content` (`id`, `name`, `alias_content`, `description`, `tizer`, `price`, `img`, `parent_content`, `date_content`, `public_content`) VALUES
(1, 'Домашняя', 'home', 'Наша главная страница', ' ', 0.00, ' ', 0, '2015-06-15 21:21:10', 1),
(2, 'О нас', 'about', 'описание о нас', '', 0.00, '', 0, '2015-06-01 19:41:35', 1),
(3, 'Услуги', 'services', 'описание о нас', '', 0.00, '', 0, '2015-06-01 19:41:50', 1),
(4, 'Анализ', 'analysis', 'Наш анализ ', '', 0.00, '', 0, '2015-06-10 07:45:03', 1),
(5, 'Ремонт', 'repairs', 'Наш ремонт', '', 0.00, '', 0, '2015-06-10 07:45:10', 1),
(6, 'Все продукты', 'products', 'Получаем описание всех продуктов', 'Получаем описание', 0.00, '', 0, '2015-06-16 22:09:13', 1),
(7, 'Продукт 1', 'product_1', 'Здесь описание первого продукта', 'Коротко - первый продукт', 10.00, '', 6, '2015-06-16 22:09:41', 1),
(8, 'Продукт2', 'product_2', 'Здесь описание второго продукта', 'Коротко - второй продукт', 15.00, '', 6, '2015-06-17 20:13:30', 1),
(9, 'Продукт3', 'product_3', 'Здесь описание третьего продукта', 'Коротко - третий продукт', 15.00, '', 6, '2015-06-17 20:27:41', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `menu`
--

CREATE TABLE IF NOT EXISTS `menu` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `link` varchar(50) NOT NULL,
  `parent_id` int(5) NOT NULL DEFAULT '0',
  `id_content` int(5) NOT NULL,
  `public_menu` int(1) NOT NULL DEFAULT '1',
  `alias` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `alias` (`alias`),
  KEY `link` (`link`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Дамп данных таблицы `menu`
--

INSERT INTO `menu` (`id`, `link`, `parent_id`, `id_content`, `public_menu`, `alias`) VALUES
(1, 'главная', 0, 1, 1, 'home'),
(2, 'о нас ', 0, 2, 1, 'about'),
(3, 'услуги', 0, 3, 1, 'services'),
(4, 'анализ', 3, 4, 1, 'analysis'),
(5, 'ремонт', 3, 5, 1, 'repairs'),
(6, 'продукты', 0, 6, 1, 'products');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
