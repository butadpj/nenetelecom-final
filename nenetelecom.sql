-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 05, 2021 at 09:50 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nenetelecom`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts_customuser`
--

CREATE TABLE `accounts_customuser` (
  `id` int(11) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `complete_address` varchar(100) DEFAULT NULL,
  `mobile_number` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accounts_customuser`
--

INSERT INTO `accounts_customuser` (`id`, `password`, `last_login`, `is_superuser`, `email`, `is_staff`, `is_active`, `date_joined`, `username`, `first_name`, `last_name`, `complete_address`, `mobile_number`) VALUES
(1, 'pbkdf2_sha256$216000$raGQrDYaWdKw$b8GWKjroUqSWoLCeeWujecvaTLzdbxT0RIunVfRVwdk=', '2021-03-03 19:13:34.630968', 1, '', 1, 1, '2021-02-27 07:03:16.000000', 'admin', 'Paul', 'Butad', '9100@ Upper Cambridge', '09507867559');

-- --------------------------------------------------------

--
-- Table structure for table `accounts_customuser_groups`
--

CREATE TABLE `accounts_customuser_groups` (
  `id` int(11) NOT NULL,
  `customuser_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `accounts_customuser_user_permissions`
--

CREATE TABLE `accounts_customuser_user_permissions` (
  `id` int(11) NOT NULL,
  `customuser_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add content type', 4, 'add_contenttype'),
(14, 'Can change content type', 4, 'change_contenttype'),
(15, 'Can delete content type', 4, 'delete_contenttype'),
(16, 'Can view content type', 4, 'view_contenttype'),
(17, 'Can add session', 5, 'add_session'),
(18, 'Can change session', 5, 'change_session'),
(19, 'Can delete session', 5, 'delete_session'),
(20, 'Can view session', 5, 'view_session'),
(21, 'Can add user', 6, 'add_customuser'),
(22, 'Can change user', 6, 'change_customuser'),
(23, 'Can delete user', 6, 'delete_customuser'),
(24, 'Can view user', 6, 'view_customuser'),
(25, 'Can add product', 7, 'add_product'),
(26, 'Can change product', 7, 'change_product'),
(27, 'Can delete product', 7, 'delete_product'),
(28, 'Can view product', 7, 'view_product'),
(29, 'Can add product image', 8, 'add_productimage'),
(30, 'Can change product image', 8, 'change_productimage'),
(31, 'Can delete product image', 8, 'delete_productimage'),
(32, 'Can view product image', 8, 'view_productimage'),
(33, 'Can add customer', 9, 'add_customer'),
(34, 'Can change customer', 9, 'change_customer'),
(35, 'Can delete customer', 9, 'delete_customer'),
(36, 'Can view customer', 9, 'view_customer'),
(37, 'Can add order', 10, 'add_order'),
(38, 'Can change order', 10, 'change_order'),
(39, 'Can delete order', 10, 'delete_order'),
(40, 'Can view order', 10, 'view_order'),
(41, 'Can add order product', 11, 'add_orderproduct'),
(42, 'Can change order product', 11, 'change_orderproduct'),
(43, 'Can delete order product', 11, 'delete_orderproduct'),
(44, 'Can view order product', 11, 'view_orderproduct'),
(45, 'Can add shipping', 12, 'add_shipping'),
(46, 'Can change shipping', 12, 'change_shipping'),
(47, 'Can delete shipping', 12, 'delete_shipping'),
(48, 'Can view shipping', 12, 'view_shipping');

-- --------------------------------------------------------

--
-- Table structure for table `cart_order`
--

CREATE TABLE `cart_order` (
  `transaction_id` char(32) NOT NULL,
  `transaction_date` datetime(6) DEFAULT NULL,
  `complete` tinyint(1) NOT NULL,
  `confirmed` tinyint(1) NOT NULL,
  `paid` tinyint(1) NOT NULL,
  `customer_id` char(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart_order`
--

INSERT INTO `cart_order` (`transaction_id`, `transaction_date`, `complete`, `confirmed`, `paid`, `customer_id`) VALUES
('11f5e530688f43458ed2309c9f5dd0a0', '2021-02-27 07:44:19.446831', 1, 0, 0, 'f809b446fd38479ab6c6e61328f8c9ff'),
('958c78c0bb034e38b12edd4a9def20fc', '2021-02-27 07:30:12.594692', 1, 0, 0, '200127746b2c46c596cea69d1a473fed'),
('9b716b61cff54b99b11d8a2f266e1f6b', '2021-02-27 07:45:50.714217', 1, 0, 0, 'f809b446fd38479ab6c6e61328f8c9ff'),
('acea278003134c2da428174b49d1e6df', '2021-03-03 19:15:09.473845', 0, 0, 0, '200127746b2c46c596cea69d1a473fed');

-- --------------------------------------------------------

--
-- Table structure for table `cart_orderproduct`
--

CREATE TABLE `cart_orderproduct` (
  `id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `selected` tinyint(1) NOT NULL,
  `order_id` char(32) DEFAULT NULL,
  `product_id` char(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart_orderproduct`
--

INSERT INTO `cart_orderproduct` (`id`, `quantity`, `selected`, `order_id`, `product_id`) VALUES
(1, 2, 1, '958c78c0bb034e38b12edd4a9def20fc', '0b4870e04a0f4ce0a393a48c7f6038d9'),
(2, 1, 1, '11f5e530688f43458ed2309c9f5dd0a0', '0b4870e04a0f4ce0a393a48c7f6038d9'),
(3, 1, 1, '9b716b61cff54b99b11d8a2f266e1f6b', '0b4870e04a0f4ce0a393a48c7f6038d9'),
(4, 2, 1, 'acea278003134c2da428174b49d1e6df', '8aa8af9e0aa346858ad0564c55bef6af');

-- --------------------------------------------------------

--
-- Table structure for table `checkout_shipping`
--

CREATE TABLE `checkout_shipping` (
  `id` int(11) NOT NULL,
  `address` varchar(100) NOT NULL,
  `city` varchar(50) NOT NULL,
  `province` varchar(50) NOT NULL,
  `zip_code` varchar(10) NOT NULL,
  `date_placed` datetime(6) NOT NULL,
  `delivered` tinyint(1) NOT NULL,
  `customer_id` char(32) DEFAULT NULL,
  `order_id` char(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `checkout_shipping`
--

INSERT INTO `checkout_shipping` (`id`, `address`, `city`, `province`, `zip_code`, `date_placed`, `delivered`, `customer_id`, `order_id`) VALUES
(1, 'Sambaville', 'Antipolo', 'Rizal', '1870', '2021-02-27 07:30:32.652686', 0, '200127746b2c46c596cea69d1a473fed', '958c78c0bb034e38b12edd4a9def20fc'),
(2, '9100@ Upper Cambridge, Brgy. San Luis', 'Antipolo', 'Rizal', '1870', '2021-02-27 07:44:19.628432', 0, 'f809b446fd38479ab6c6e61328f8c9ff', '11f5e530688f43458ed2309c9f5dd0a0'),
(3, 'Sitio Kaybagsik', 'Antipolo', 'Rizal', '1940', '2021-02-27 07:45:50.817560', 0, 'f809b446fd38479ab6c6e61328f8c9ff', '9b716b61cff54b99b11d8a2f266e1f6b');

-- --------------------------------------------------------

--
-- Table structure for table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `django_admin_log`
--

INSERT INTO `django_admin_log` (`id`, `action_time`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`) VALUES
(1, '2021-02-27 07:11:10.381706', '20012774-6b2c-46c5-96ce-a69d1a473fed', 'None None (None)', 1, '[{\"added\": {}}]', 9, 1),
(2, '2021-02-27 07:22:24.247595', 'f809b446-fd38-479a-b6c6-e61328f8c9ff', 'Customer object (f809b446-fd38-479a-b6c6-e61328f8c9ff)', 1, '[{\"added\": {}}]', 9, 1),
(3, '2021-02-27 07:24:09.220843', 'f809b446-fd38-479a-b6c6-e61328f8c9ff', 'Customer object (f809b446-fd38-479a-b6c6-e61328f8c9ff)', 2, '[{\"changed\": {\"fields\": [\"Mobile number\"]}}]', 9, 1),
(4, '2021-02-27 07:26:25.852471', '1', 'Paul', 2, '[{\"changed\": {\"fields\": [\"Complete address (AU)\"]}}]', 6, 1),
(5, '2021-02-27 07:29:50.525859', '0b4870e0-4a0f-4ce0-a393-a48c7f6038d9', 'IPhone 8 plus 32gb Factory Unlock', 1, '[{\"added\": {}}, {\"added\": {\"name\": \"product image\", \"object\": \"IPhone 8 plus 32gb Factory Unlock\"}}, {\"added\": {\"name\": \"product image\", \"object\": \"IPhone 8 plus 32gb Factory Unlock\"}}, {\"added\": {\"name\": \"product image\", \"object\": \"IPhone 8 plus 32gb Factory Unlock\"}}]', 7, 1),
(6, '2021-02-28 14:42:00.784785', 'f25403fa-d586-40bc-9d43-e9c8443e37ec', 'Test User (09206796099)', 1, '[{\"added\": {}}]', 9, 1),
(7, '2021-02-28 14:42:14.783050', 'f25403fa-d586-40bc-9d43-e9c8443e37ec', 'Test User (09206796099)', 3, '', 9, 1),
(8, '2021-02-28 14:43:48.724078', '2', 'Test', 3, '', 6, 1),
(9, '2021-02-28 14:46:11.066617', '3', 'test', 3, '', 6, 1),
(10, '2021-02-28 14:47:19.522796', '4', 'test', 3, '', 6, 1),
(11, '2021-02-28 14:48:07.476192', '5', 'test', 3, '', 6, 1),
(12, '2021-02-28 14:51:18.582305', '6', 'george', 3, '', 6, 1),
(13, '2021-02-28 14:51:40.213549', '7', 'test', 3, '', 6, 1),
(14, '2021-02-28 14:53:40.909064', '8', 'test', 3, '', 6, 1),
(15, '2021-02-28 14:54:50.817006', '9', 'test', 3, '', 6, 1),
(16, '2021-02-28 14:56:56.032838', '10', 'sadasdas', 3, '', 6, 1),
(17, '2021-02-28 14:57:22.283591', '11', 'dasdas', 3, '', 6, 1),
(18, '2021-03-02 05:30:44.453457', '12', 'Paul', 3, '', 6, 1),
(19, '2021-03-02 05:35:39.959927', '13', 'asdasd', 3, '', 6, 1),
(20, '2021-03-02 06:01:28.554314', '14', 'goerge', 3, '', 6, 1),
(21, '2021-03-02 06:02:57.592377', '15', 'asdsadasd', 3, '', 6, 1),
(22, '2021-03-02 06:08:17.866208', '16', 'hjgyguj', 3, '', 6, 1),
(23, '2021-03-02 06:08:57.539155', '17', 'asdsa', 3, '', 6, 1),
(24, '2021-03-02 06:12:05.419226', '18', 'asdas', 3, '', 6, 1),
(25, '2021-03-02 07:08:36.749768', '19', 'asdasadasd', 3, '', 6, 1),
(26, '2021-03-03 19:14:45.429100', '8aa8af9e-0aa3-4685-8ad0-564c55bef6af', 'Samsung Galaxy Note 10 Plus', 1, '[{\"added\": {}}, {\"added\": {\"name\": \"product image\", \"object\": \"Samsung Galaxy Note 10 Plus\"}}, {\"added\": {\"name\": \"product image\", \"object\": \"Samsung Galaxy Note 10 Plus\"}}, {\"added\": {\"name\": \"product image\", \"object\": \"Samsung Galaxy Note 10 Plus\"}}]', 7, 1);

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(6, 'accounts', 'customuser'),
(1, 'admin', 'logentry'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(10, 'cart', 'order'),
(11, 'cart', 'orderproduct'),
(12, 'checkout', 'shipping'),
(4, 'contenttypes', 'contenttype'),
(5, 'sessions', 'session'),
(9, 'store', 'customer'),
(7, 'store', 'product'),
(8, 'store', 'productimage');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2021-02-27 07:02:08.162242'),
(2, 'contenttypes', '0002_remove_content_type_name', '2021-02-27 07:02:08.746185'),
(3, 'auth', '0001_initial', '2021-02-27 07:02:09.292498'),
(4, 'auth', '0002_alter_permission_name_max_length', '2021-02-27 07:02:12.126420'),
(5, 'auth', '0003_alter_user_email_max_length', '2021-02-27 07:02:12.156519'),
(6, 'auth', '0004_alter_user_username_opts', '2021-02-27 07:02:12.189629'),
(7, 'auth', '0005_alter_user_last_login_null', '2021-02-27 07:02:12.225748'),
(8, 'auth', '0006_require_contenttypes_0002', '2021-02-27 07:02:12.250831'),
(9, 'auth', '0007_alter_validators_add_error_messages', '2021-02-27 07:02:12.280931'),
(10, 'auth', '0008_alter_user_username_max_length', '2021-02-27 07:02:12.313037'),
(11, 'auth', '0009_alter_user_last_name_max_length', '2021-02-27 07:02:12.337119'),
(12, 'auth', '0010_alter_group_name_max_length', '2021-02-27 07:02:12.411363'),
(13, 'auth', '0011_update_proxy_permissions', '2021-02-27 07:02:12.439457'),
(14, 'auth', '0012_alter_user_first_name_max_length', '2021-02-27 07:02:12.480594'),
(15, 'accounts', '0001_initial', '2021-02-27 07:02:13.430301'),
(16, 'admin', '0001_initial', '2021-02-27 07:02:17.158667'),
(17, 'admin', '0002_logentry_remove_auto_add', '2021-02-27 07:02:18.658872'),
(18, 'admin', '0003_logentry_add_action_flag_choices', '2021-02-27 07:02:18.716051'),
(19, 'store', '0001_initial', '2021-02-27 07:02:19.440452'),
(20, 'cart', '0001_initial', '2021-02-27 07:02:21.055344'),
(21, 'checkout', '0001_initial', '2021-02-27 07:02:23.496974'),
(22, 'sessions', '0001_initial', '2021-02-27 07:02:25.455955'),
(23, 'store', '0002_auto_20210227_1510', '2021-02-27 07:10:59.332771'),
(24, 'store', '0003_auto_20210227_1515', '2021-02-27 07:15:35.921357'),
(25, 'accounts', '0002_auto_20210227_1518', '2021-02-27 07:18:46.453158'),
(26, 'store', '0004_auto_20210227_1518', '2021-02-27 07:18:46.532421');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('088i0jqk678lpt8iylz153wes0j6w150', 'e30:1lGNPq:tK8zi0qrNRrGtZR1IFtPMFk0fuOXSQxXG8BJG4NVXSc', '2021-03-14 14:51:26.973055'),
('5emhhrzpcfszneyngwx9yaxke7ga6b6l', 'e30:1lGNQU:g3bhAeqN3d0dw1ORsf1DujrWC2WfRf5KEyz0iAAsd7I', '2021-03-14 14:52:06.781442'),
('5jrmsjsa7npmpypcvdfqkif6qcdjyldo', '.eJxVjEEOwiAQRe_C2jQwQgGX7usVyMwwDY3aJqUsjPHuatKF7n7ez3tPlbBtJbUqa5qyOimjDr-MkK8yf499dci8tHmr3Q5qNzyGhaabXNqdZD3vxl-mYC2fRs7QixNrJToPGII2YHJg0VG86S2IJz_aCP4YIRIjcQZyI4FmK2jU6w1y5Dp9:1lFu4C:mTIqJL_Je4sUPZgPLoz4p92Ib2iOeYuVH_hJjgeNO7A', '2021-03-13 07:31:08.025410'),
('9vpvdvobgh40gcawql7jn0m3zciwrtmn', '.eJxVjEEOwiAQRe_C2hAYoYBL956BzMBUqgaS0q6MdzckXej2v_f-W0TctxL3zmtcsrgILU6_G2F6ch0gP7Dem0ytbutCcijyoF3eWubX9XD_Dgr2MuoME1s2hoN1gN4rDTr7xCqw05MBduRmE8CdAwRKSCkD2ZlAJcOoxecL2rE4Aw:1lGNEu:sj1PDNLmT7ALNA5cwgoaJ1qIYDspQejtHOmuaoFYO1E', '2021-03-14 14:40:08.954994'),
('bhtl7n5yxe5ddywpvfx0td74r79meev2', '.eJxVjEEOwiAQRe_C2hAYoYBL956BzMBUqgaS0q6MdzckXej2v_f-W0TctxL3zmtcsrgILU6_G2F6ch0gP7Dem0ytbutCcijyoF3eWubX9XD_Dgr2MuoME1s2hoN1gN4rDTr7xCqw05MBduRmE8CdAwRKSCkD2ZlAJcOoxecL2rE4Aw:1lGxh0:Nqfmpf6W5u3hCjbITaVrAAmz54w_biQCxnPIZ_Vk2Y8', '2021-03-16 05:35:34.512349'),
('gd8foqz0e7qprejqy1wor14qabwzo8iq', '.eJxVjEEOwiAQRe_C2jQwQgGX7usVyMwwDY3aJqUsjPHuatKF7n7ez3tPlbBtJbUqa5qyOimjDr-MkK8yf499dci8tHmr3Q5qNzyGhaabXNqdZD3vxl-mYC2fRs7QixNrJToPGII2YHJg0VG86S2IJz_aCP4YIRIjcQZyI4FmK2jU6w1y5Dp9:1lGK5r:XPRkB-HTQXh_BqNwqbDlpHY46NoXIpx63vZn5Dz62nQ', '2021-03-14 11:18:35.767409');

-- --------------------------------------------------------

--
-- Table structure for table `store_customer`
--

CREATE TABLE `store_customer` (
  `id` char(32) NOT NULL,
  `mobile_number` varchar(15) DEFAULT NULL,
  `first_name` varchar(30) DEFAULT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `complete_address` varchar(100) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `store_customer`
--

INSERT INTO `store_customer` (`id`, `mobile_number`, `first_name`, `last_name`, `complete_address`, `user_id`) VALUES
('200127746b2c46c596cea69d1a473fed', NULL, NULL, NULL, NULL, 1),
('f809b446fd38479ab6c6e61328f8c9ff', '09206796099', 'Paul', 'Asuncion', '9100@ Upper Cambridge, Brgy. San Luis', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `store_product`
--

CREATE TABLE `store_product` (
  `id` char(32) NOT NULL,
  `category` varchar(30) NOT NULL,
  `brand` varchar(20) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `date_posted` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `store_product`
--

INSERT INTO `store_product` (`id`, `category`, `brand`, `name`, `price`, `description`, `date_posted`) VALUES
('0b4870e04a0f4ce0a393a48c7f6038d9', 'Phones', 'IPhone', 'IPhone 8 plus 32gb Factory Unlock', '19500.00', 'SADASDAS\r\nASDAS\r\nDASDASDASD\r\nAADAS\r\nADASDASDASD\r\nASDASDASDASDASDASDASD\r\nSADASDASD\r\n213123565541\r\n2221435235\r\n!!!!!!!!!!!', '2021-02-27 07:29:50.398436'),
('8aa8af9e0aa346858ad0564c55bef6af', 'Phones', 'Samsung', 'Samsung Galaxy Note 10 Plus', '18000.00', 'asdsasadssad\r\nsad\r\nsad\r\nsadas\r\ndsadsadasdsadasdsa\r\n09151171197', '2021-03-03 19:14:45.116566');

-- --------------------------------------------------------

--
-- Table structure for table `store_productimage`
--

CREATE TABLE `store_productimage` (
  `id` int(11) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `product_id` char(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `store_productimage`
--

INSERT INTO `store_productimage` (`id`, `image`, `product_id`) VALUES
(1, 'phone_0b4870e0-4a0f-4ce0-a393-a48c7f6038d9/8plus.jpg', '0b4870e04a0f4ce0a393a48c7f6038d9'),
(2, 'phone_0b4870e0-4a0f-4ce0-a393-a48c7f6038d9/og__smc3haxsdn2q_specs.png', '0b4870e04a0f4ce0a393a48c7f6038d9'),
(3, 'phone_0b4870e0-4a0f-4ce0-a393-a48c7f6038d9/iphone11prolineup.jpg', '0b4870e04a0f4ce0a393a48c7f6038d9'),
(4, 'phone_8aa8af9e-0aa3-4685-8ad0-564c55bef6af/samsung-galaxy-note-10-plus-specs.jpg', '8aa8af9e0aa346858ad0564c55bef6af'),
(5, 'phone_8aa8af9e-0aa3-4685-8ad0-564c55bef6af/s20s.jpg', '8aa8af9e0aa346858ad0564c55bef6af'),
(6, 'phone_8aa8af9e-0aa3-4685-8ad0-564c55bef6af/Vivo-Y15.jpg', '8aa8af9e0aa346858ad0564c55bef6af');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts_customuser`
--
ALTER TABLE `accounts_customuser`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mobile_number` (`mobile_number`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `accounts_customuser_groups`
--
ALTER TABLE `accounts_customuser_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `accounts_customuser_groups_customuser_id_group_id_c074bdcb_uniq` (`customuser_id`,`group_id`),
  ADD KEY `accounts_customuser_groups_group_id_86ba5f9e_fk_auth_group_id` (`group_id`);

--
-- Indexes for table `accounts_customuser_user_permissions`
--
ALTER TABLE `accounts_customuser_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `accounts_customuser_user_customuser_id_permission_9632a709_uniq` (`customuser_id`,`permission_id`),
  ADD KEY `accounts_customuser__permission_id_aea3d0e5_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indexes for table `cart_order`
--
ALTER TABLE `cart_order`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `cart_order_customer_id_c205ee6a_fk_store_customer_id` (`customer_id`);

--
-- Indexes for table `cart_orderproduct`
--
ALTER TABLE `cart_orderproduct`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_orderproduct_order_id_f530bfa7_fk_cart_order_transaction_id` (`order_id`),
  ADD KEY `cart_orderproduct_product_id_df95e635_fk_store_product_id` (`product_id`);

--
-- Indexes for table `checkout_shipping`
--
ALTER TABLE `checkout_shipping`
  ADD PRIMARY KEY (`id`),
  ADD KEY `checkout_shipping_customer_id_89e6c656_fk_store_customer_id` (`customer_id`),
  ADD KEY `checkout_shipping_order_id_5a93fcf9_fk_cart_order_transaction_id` (`order_id`);

--
-- Indexes for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_accounts_customuser_id` (`user_id`);

--
-- Indexes for table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indexes for table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indexes for table `store_customer`
--
ALTER TABLE `store_customer`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mobile_number` (`mobile_number`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `store_product`
--
ALTER TABLE `store_product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `store_productimage`
--
ALTER TABLE `store_productimage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `store_productimage_product_id_e50e4046_fk_store_product_id` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts_customuser`
--
ALTER TABLE `accounts_customuser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `accounts_customuser_groups`
--
ALTER TABLE `accounts_customuser_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `accounts_customuser_user_permissions`
--
ALTER TABLE `accounts_customuser_user_permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `cart_orderproduct`
--
ALTER TABLE `cart_orderproduct`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `checkout_shipping`
--
ALTER TABLE `checkout_shipping`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `store_productimage`
--
ALTER TABLE `store_productimage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `accounts_customuser_groups`
--
ALTER TABLE `accounts_customuser_groups`
  ADD CONSTRAINT `accounts_customuser__customuser_id_bc55088e_fk_accounts_` FOREIGN KEY (`customuser_id`) REFERENCES `accounts_customuser` (`id`),
  ADD CONSTRAINT `accounts_customuser_groups_group_id_86ba5f9e_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `accounts_customuser_user_permissions`
--
ALTER TABLE `accounts_customuser_user_permissions`
  ADD CONSTRAINT `accounts_customuser__customuser_id_0deaefae_fk_accounts_` FOREIGN KEY (`customuser_id`) REFERENCES `accounts_customuser` (`id`),
  ADD CONSTRAINT `accounts_customuser__permission_id_aea3d0e5_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`);

--
-- Constraints for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Constraints for table `cart_order`
--
ALTER TABLE `cart_order`
  ADD CONSTRAINT `cart_order_customer_id_c205ee6a_fk_store_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `store_customer` (`id`);

--
-- Constraints for table `cart_orderproduct`
--
ALTER TABLE `cart_orderproduct`
  ADD CONSTRAINT `cart_orderproduct_order_id_f530bfa7_fk_cart_order_transaction_id` FOREIGN KEY (`order_id`) REFERENCES `cart_order` (`transaction_id`),
  ADD CONSTRAINT `cart_orderproduct_product_id_df95e635_fk_store_product_id` FOREIGN KEY (`product_id`) REFERENCES `store_product` (`id`);

--
-- Constraints for table `checkout_shipping`
--
ALTER TABLE `checkout_shipping`
  ADD CONSTRAINT `checkout_shipping_customer_id_89e6c656_fk_store_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `store_customer` (`id`),
  ADD CONSTRAINT `checkout_shipping_order_id_5a93fcf9_fk_cart_order_transaction_id` FOREIGN KEY (`order_id`) REFERENCES `cart_order` (`transaction_id`);

--
-- Constraints for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_accounts_customuser_id` FOREIGN KEY (`user_id`) REFERENCES `accounts_customuser` (`id`);

--
-- Constraints for table `store_customer`
--
ALTER TABLE `store_customer`
  ADD CONSTRAINT `store_customer_user_id_04276401_fk_accounts_customuser_id` FOREIGN KEY (`user_id`) REFERENCES `accounts_customuser` (`id`);

--
-- Constraints for table `store_productimage`
--
ALTER TABLE `store_productimage`
  ADD CONSTRAINT `store_productimage_product_id_e50e4046_fk_store_product_id` FOREIGN KEY (`product_id`) REFERENCES `store_product` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
