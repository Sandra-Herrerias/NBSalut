-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 27, 2022 at 10:31 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nbsalut`
--
CREATE DATABASE IF NOT EXISTS `nbsalut` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `nbsalut`;

-- --------------------------------------------------------

--
-- Table structure for table `attacheds`
--

CREATE TABLE `attacheds` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `visit_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `attacheds`
--

INSERT INTO `attacheds` (`id`, `type`, `image`, `visit_id`, `created_at`, `updated_at`) VALUES
(6, NULL, NULL, 10, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(9, NULL, NULL, 4, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(15, NULL, NULL, 8, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(17, 'jpg', 'birmingham-museums-trust-4lDX-xTLl3Q-unsplash.jpg', 27, '2022-05-27 18:30:11', '2022-05-27 18:30:11'),
(18, 'jpg', 'birmingham-museums-trust-nbneQlI2M1A-unsplash.jpg', 27, '2022-05-27 18:30:12', '2022-05-27 18:30:12');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invoice_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_type` enum('efectivo','tarjeta') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sent` tinyint(1) DEFAULT NULL,
  `invoice_date` datetime NOT NULL,
  `total_price` double(8,2) NOT NULL,
  `specialist_id` bigint(20) UNSIGNED DEFAULT NULL,
  `visit_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `invoice_number`, `payment_type`, `sent`, `invoice_date`, `total_price`, `specialist_id`, `visit_id`, `created_at`, `updated_at`) VALUES
(1, NULL, 'tarjeta', 1, '2021-08-31 15:28:00', 68.07, NULL, NULL, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(2, NULL, 'efectivo', 0, '2022-05-27 16:03:56', 30.03, NULL, NULL, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(3, NULL, 'efectivo', 1, '2021-09-01 19:35:29', 98.25, NULL, NULL, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(4, NULL, 'efectivo', 0, '2021-10-02 19:33:41', 66.82, NULL, NULL, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(5, NULL, 'efectivo', 0, '2021-10-17 17:07:51', 96.59, NULL, NULL, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(6, NULL, 'tarjeta', 0, '2021-11-03 03:03:29', 55.58, NULL, NULL, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(7, NULL, 'efectivo', 1, '2021-10-10 18:59:56', 10.44, NULL, NULL, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(8, NULL, 'efectivo', 0, '2022-05-12 23:28:09', 21.92, NULL, NULL, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(9, NULL, 'efectivo', 1, '2021-10-30 21:11:08', 24.38, NULL, 14, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(10, NULL, 'tarjeta', 0, '2022-04-19 00:10:20', 20.08, NULL, NULL, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(11, NULL, 'efectivo', 1, '2022-04-10 08:00:07', 86.10, NULL, NULL, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(12, NULL, 'tarjeta', 1, '2022-04-26 10:40:29', 35.32, NULL, 4, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(13, NULL, 'tarjeta', 1, '2021-11-02 04:17:57', 95.34, NULL, NULL, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(14, NULL, 'tarjeta', 1, '2021-09-13 13:33:48', 91.65, NULL, NULL, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(15, NULL, 'efectivo', 0, '2022-02-18 18:37:49', 40.99, NULL, NULL, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(16, '1/2022', 'tarjeta', 1, '2022-05-27 00:00:00', 50.28, 9, NULL, '2022-05-27 17:59:03', '2022-05-27 18:16:20'),
(17, '2/2022', 'tarjeta', 1, '2022-05-27 00:00:00', 76.91, 9, NULL, '2022-05-27 17:59:03', '2022-05-27 18:16:20'),
(18, '3/2022', 'tarjeta', 1, '2022-05-27 00:00:00', 15.70, 9, NULL, '2022-05-27 17:59:03', '2022-05-27 18:16:20'),
(19, '4/2022', 'tarjeta', 1, '2022-05-27 00:00:00', 50.28, 9, NULL, '2022-05-27 18:09:57', '2022-05-27 18:16:20'),
(20, '5/2022', 'tarjeta', 1, '2022-05-27 00:00:00', 43.21, 9, NULL, '2022-05-27 18:09:57', '2022-05-27 18:16:20'),
(21, '6/2022', 'tarjeta', 1, '2022-05-27 00:00:00', 76.91, 9, NULL, '2022-05-27 18:09:57', '2022-05-27 18:16:20'),
(22, '7/2022', 'tarjeta', 1, '2022-05-27 00:00:00', 15.70, 9, NULL, '2022-05-27 18:10:47', '2022-05-27 18:16:20'),
(23, '8/2022', 'tarjeta', 1, '2022-05-27 00:00:00', 92.49, 9, NULL, '2022-05-27 18:10:47', '2022-05-27 18:16:20'),
(24, '9/2022', 'tarjeta', 1, '2022-05-27 00:00:00', 54.01, 9, NULL, '2022-05-27 18:10:47', '2022-05-27 18:16:20'),
(25, '10/2022', 'tarjeta', 1, '2022-05-27 00:00:00', 76.36, 9, NULL, '2022-05-27 18:11:43', '2022-05-27 18:16:20'),
(26, '11/2022', 'tarjeta', 1, '2022-05-27 00:00:00', 92.49, 9, NULL, '2022-05-27 18:11:43', '2022-05-27 18:16:20'),
(27, '12/2022', 'tarjeta', 1, '2022-05-27 00:00:00', 39.46, 9, NULL, '2022-05-27 18:11:43', '2022-05-27 18:16:20'),
(28, '13/2022', 'tarjeta', 1, '2022-05-27 00:00:00', 50.28, 9, NULL, '2022-05-27 18:12:08', '2022-05-27 18:16:20'),
(29, '14/2022', 'tarjeta', 1, '2022-05-27 00:00:00', 37.73, 9, 23, '2022-05-27 18:13:25', '2022-05-27 18:16:20'),
(30, '15/2022', 'tarjeta', 1, '2022-05-27 00:00:00', 26.42, 9, 23, '2022-05-27 18:13:25', '2022-05-27 18:16:20'),
(31, '16/2022', 'tarjeta', 1, '2022-05-27 00:00:00', 16.46, 9, 25, '2022-05-27 18:13:35', '2022-05-27 18:16:20'),
(32, '17/2022', 'tarjeta', 1, '2022-05-27 00:00:00', 25.08, 9, 25, '2022-05-27 18:13:35', '2022-05-27 18:16:20'),
(33, '18/2022', 'tarjeta', 1, '2022-05-27 00:00:00', 92.49, 9, 25, '2022-05-27 18:13:35', '2022-05-27 18:16:20'),
(34, '19/2022', 'tarjeta', 1, '2022-05-27 00:00:00', 43.21, 9, NULL, '2022-05-27 18:15:14', '2022-05-27 18:16:20'),
(35, '20/2022', 'tarjeta', 1, '2022-05-27 00:00:00', 76.91, 9, NULL, '2022-05-27 18:15:14', '2022-05-27 18:16:20'),
(36, '21/2022', 'tarjeta', 0, '2022-05-27 00:00:00', 15.70, 9, 27, '2022-05-27 18:30:11', '2022-05-27 18:30:11');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_details`
--

CREATE TABLE `invoice_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invoice_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double(8,2) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `total` double(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoice_details`
--

INSERT INTO `invoice_details` (`id`, `invoice_id`, `name`, `price`, `quantity`, `total`, `created_at`, `updated_at`) VALUES
(1, 15, 'QUIROPODOLOGIA', 42.85, 1, 45.57, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(2, 12, 'RETOQUES O CAMBIO FORROS SP', 71.18, 1, 55.13, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(3, 2, 'CIRUGÍA DE LA UÑA', 41.58, 1, 50.96, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(4, 14, 'RETOQUES O CAMBIO FORROS SP', 53.91, 1, 31.78, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(5, 13, 'PROTESIS PEQUEÑAS', 99.63, 1, 24.62, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(6, 8, 'RETOQUES O CAMBIO FORROS SP', 11.60, 1, 92.06, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(7, 8, 'ESTUDIO BIOMECÁNICO + SP INFANTIL', 53.71, 1, 93.60, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(8, 3, 'SILMA', 25.37, 1, 57.20, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(9, 3, 'CIRUGÍA DE LA UÑA', 83.02, 1, 36.57, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(10, 2, 'OTRAS PRUEBAS', 18.83, 1, 14.65, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(11, 14, 'REEDUCACIÓN UNGUEAL', 42.55, 1, 64.19, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(12, 1, 'ESTUDIO BIOMECÁNICO + SP INFANTIL', 23.57, 1, 90.01, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(13, 4, 'TRATAMIENTO VERRUGAS', 80.62, 1, 39.79, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(14, 1, 'ESTUDIO BIOMECÁNICO + SP INFANTIL', 60.54, 1, 24.07, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(15, 14, 'RETOQUES O CAMBIO FORROS SP', 89.76, 1, 77.58, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(16, 16, 'CIRUGÍA DE LA UÑA', 50.28, 1, 50.28, '2022-05-27 17:59:03', '2022-05-27 17:59:03'),
(17, 17, 'TRATAMIENTO VERRUGAS', 76.91, 1, 76.91, '2022-05-27 17:59:03', '2022-05-27 17:59:03'),
(18, 18, 'ESTUDIO BIOMECÁNICO + SP ADULTO', 15.70, 1, 15.70, '2022-05-27 17:59:03', '2022-05-27 17:59:03'),
(19, 19, 'CIRUGÍA DE LA UÑA', 50.28, 1, 50.28, '2022-05-27 18:09:57', '2022-05-27 18:09:57'),
(20, 20, 'PROTESIS MEDIANA', 43.21, 1, 43.21, '2022-05-27 18:09:57', '2022-05-27 18:09:57'),
(21, 21, 'TRATAMIENTO VERRUGAS', 76.91, 1, 76.91, '2022-05-27 18:09:57', '2022-05-27 18:09:57'),
(22, 22, 'ESTUDIO BIOMECÁNICO + SP ADULTO', 15.70, 1, 15.70, '2022-05-27 18:10:47', '2022-05-27 18:10:47'),
(23, 23, 'REEDUCACIÓN UNGUEAL', 92.49, 1, 92.49, '2022-05-27 18:10:47', '2022-05-27 18:10:47'),
(24, 24, 'RETOQUES O CAMBIO FORROS SP', 54.01, 1, 54.01, '2022-05-27 18:10:47', '2022-05-27 18:10:47'),
(25, 25, 'RETOQUES O CAMBIO FORROS SP', 76.36, 1, 76.36, '2022-05-27 18:11:43', '2022-05-27 18:11:43'),
(26, 26, 'REEDUCACIÓN UNGUEAL', 92.49, 1, 92.49, '2022-05-27 18:11:43', '2022-05-27 18:11:43'),
(27, 27, 'ESTUDIO BIOMECANICO', 39.46, 1, 39.46, '2022-05-27 18:11:43', '2022-05-27 18:11:43'),
(28, 28, 'CIRUGÍA DE LA UÑA', 50.28, 1, 50.28, '2022-05-27 18:12:08', '2022-05-27 18:12:08'),
(29, 29, 'QUIROPODOLOGIA', 37.73, 1, 37.73, '2022-05-27 18:13:25', '2022-05-27 18:13:25'),
(30, 30, 'VENDAJE NEUROMUSCULAR', 26.42, 1, 26.42, '2022-05-27 18:13:25', '2022-05-27 18:13:25'),
(31, 31, 'TRATAMIENTO VERRUGAS', 16.46, 1, 16.46, '2022-05-27 18:13:35', '2022-05-27 18:13:35'),
(32, 32, 'VENDAJE NEUROMUSCULAR', 25.08, 1, 25.08, '2022-05-27 18:13:35', '2022-05-27 18:13:35'),
(33, 33, 'REEDUCACIÓN UNGUEAL', 92.49, 1, 92.49, '2022-05-27 18:13:35', '2022-05-27 18:13:35'),
(34, 34, 'PROTESIS MEDIANA', 43.21, 1, 43.21, '2022-05-27 18:15:14', '2022-05-27 18:15:14'),
(35, 35, 'TRATAMIENTO VERRUGAS', 76.91, 1, 76.91, '2022-05-27 18:15:14', '2022-05-27 18:15:14'),
(36, 36, 'ESTUDIO BIOMECÁNICO + SP ADULTO', 15.70, 1, 15.70, '2022-05-27 18:30:11', '2022-05-27 18:30:11');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2022_05_11_073756_create_treatments_table', 1),
(6, '2022_05_11_073848_create_visit_table', 1),
(7, '2022_05_11_073924_create_invoices_table', 1),
(8, '2022_05_11_073956_create_invoice_details_table', 1),
(9, '2022_05_11_074034_create_partner_invoices_table', 1),
(10, '2022_05_11_075550_create_uses_table', 1),
(11, '2022_05_11_080351_create_attacheds_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `partner_invoices`
--

CREATE TABLE `partner_invoices` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dni` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `collegiate_num` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('admin','specialist','patient') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nif` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postal_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `invoice_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `partner_invoices`
--

INSERT INTO `partner_invoices` (`id`, `phone`, `dni`, `collegiate_num`, `first_name`, `last_name`, `role`, `nif`, `postal_code`, `address`, `city`, `invoice_id`, `created_at`, `updated_at`) VALUES
(1, '616102756', '69972536Z', '16110', 'Jana', 'Kautzer', 'specialist', '19835383X', '32690', '335 Ilene Terrace\nMorissetteshire, ND 50208', 'North', 4, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(2, '677554905', '26278325W', '02387', 'Milford', 'Mohr', 'patient', '37564431V', '69683', '61183 Mathias Plaza Suite 528\nNorth Mose, NM 39085', 'North', 4, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(3, '652401109', '54548125N', '08240', 'Jeremie', 'Murphy', 'patient', '33873659E', '51105', '16719 Muller Spur\nPort Julianaview, NM 68016-2937', 'Port', 3, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(4, '635525782', '83856036D', '08305', 'Preston', 'Conroy', 'patient', '10255789J', '27576', '37413 Jones Ferry Suite 971\nShanonville, LA 63374', 'Port', 14, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(5, '638962318', '55621200W', '26428', 'Jacques', 'Prosacco', 'patient', '94019951Q', '39306', '97783 Marcelle Rapids\nZaneland, VT 57334', 'East', 12, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(6, '631221646', '21435247Y', '40677', 'Bradly', 'Auer', 'specialist', '12431262M', '57247', '78621 Kade Tunnel Suite 712\nLake Reganchester, CT 82000-8230', 'Port', 13, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(7, '615126497', '44331163T', '92831', 'Sam', 'Bartell', 'patient', '96259722J', '53447', '6491 Bednar Island Suite 099\nEast Arliebury, HI 17670', 'New', 15, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(8, '690537505', '93834627L', '61363', 'Marilyne', 'Heller', 'specialist', '29770512Y', '49416', '524 Dooley Valley\nTrantowborough, UT 33078-1771', 'South', 3, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(9, '627474975', '06137769Y', '75545', 'Brandyn', 'DuBuque', 'patient', '00343346M', '59044', '180 Blanda Gateway Apt. 764\nLake Lydia, ND 78575', 'West', 15, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(10, '685246124', '81920897O', '87555', 'Laury', 'Reynolds', 'patient', '27898047J', '16297', '231 Hunter Walks Suite 699\nNigelside, ME 88501', 'North', 4, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(11, '623424564', '04152341X', '55440', 'Angelica', 'Hermann', 'patient', '32062250G', '93778', '5972 Gislason Mountain Suite 595\nKilbackmouth, NY 23461', 'New', 4, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(12, '651705746', '09631981G', '55753', 'Luis', 'Olson', 'specialist', '87627135C', '15280', '818 Guy Mews\nLake Kade, MN 79850-6134', 'West', 14, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(13, '651052323', '27905953K', '76567', 'Kurtis', 'Steuber', 'patient', '44744043K', '33575', '884 Lenna Roads\nSipesfurt, WY 97235', 'East', 13, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(14, '646109307', '97996373F', '75335', 'Mark', 'Feeney', 'patient', '72829384H', '21094', '1052 Dicki Motorway Apt. 204\nEast Stephon, KY 61206', 'South', 1, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(15, '660404293', '29188329M', '68257', 'Trisha', 'Roob', 'patient', '22383920B', '21575', '15135 Maci Hollow\nPort Ivahborough, OH 83106-7350', 'Lake', 6, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(16, '695393619', '30429542Q', '30831', 'Alison', 'Bernier', 'specialist', NULL, '19130', '9544 McDermott Hollow\nEast Tressa, NY 26844-7452', 'New', 16, '2022-05-27 17:59:03', '2022-05-27 17:59:03'),
(17, '631726969', 'Y3812733Z', NULL, 'see', 'see', 'patient', NULL, '08902', 'ss', 'ss', 16, '2022-05-27 17:59:03', '2022-05-27 17:59:03'),
(18, '695393619', '30429542Q', '30831', 'Alison', 'Bernier', 'specialist', NULL, '19130', '9544 McDermott Hollow\nEast Tressa, NY 26844-7452', 'New', 17, '2022-05-27 17:59:03', '2022-05-27 17:59:03'),
(19, '631726969', 'Y3812733Z', NULL, 'see', 'see', 'patient', NULL, '08902', 'ss', 'ss', 17, '2022-05-27 17:59:03', '2022-05-27 17:59:03'),
(20, '695393619', '30429542Q', '30831', 'Alison', 'Bernier', 'specialist', NULL, '19130', '9544 McDermott Hollow\nEast Tressa, NY 26844-7452', 'New', 18, '2022-05-27 17:59:03', '2022-05-27 17:59:03'),
(21, '631726969', 'Y3812733Z', NULL, 'see', 'see', 'patient', NULL, '08902', 'ss', 'ss', 18, '2022-05-27 17:59:03', '2022-05-27 17:59:03'),
(22, '695393619', '30429542Q', '30831', 'Alison', 'Bernier', 'specialist', NULL, '19130', '9544 McDermott Hollow\nEast Tressa, NY 26844-7452', 'New', 19, '2022-05-27 18:09:57', '2022-05-27 18:09:57'),
(23, '631726969', 'Y3812733Z', NULL, 'see', 'see', 'patient', NULL, '08902', 'ss', 'ss', 19, '2022-05-27 18:09:57', '2022-05-27 18:09:57'),
(24, '695393619', '30429542Q', '30831', 'Alison', 'Bernier', 'specialist', NULL, '19130', '9544 McDermott Hollow\nEast Tressa, NY 26844-7452', 'New', 20, '2022-05-27 18:09:57', '2022-05-27 18:09:57'),
(25, '631726969', 'Y3812733Z', NULL, 'see', 'see', 'patient', NULL, '08902', 'ss', 'ss', 20, '2022-05-27 18:09:57', '2022-05-27 18:09:57'),
(26, '695393619', '30429542Q', '30831', 'Alison', 'Bernier', 'specialist', NULL, '19130', '9544 McDermott Hollow\nEast Tressa, NY 26844-7452', 'New', 21, '2022-05-27 18:09:57', '2022-05-27 18:09:57'),
(27, '631726969', 'Y3812733Z', NULL, 'see', 'see', 'patient', NULL, '08902', 'ss', 'ss', 21, '2022-05-27 18:09:57', '2022-05-27 18:09:57'),
(28, '695393619', '30429542Q', '30831', 'Alison', 'Bernier', 'specialist', NULL, '19130', '9544 McDermott Hollow\nEast Tressa, NY 26844-7452', 'New', 22, '2022-05-27 18:10:47', '2022-05-27 18:10:47'),
(29, '631726969', 'Y3812733Z', NULL, 'see', 'see', 'patient', NULL, '08902', 'ss', 'ss', 22, '2022-05-27 18:10:47', '2022-05-27 18:10:47'),
(30, '695393619', '30429542Q', '30831', 'Alison', 'Bernier', 'specialist', NULL, '19130', '9544 McDermott Hollow\nEast Tressa, NY 26844-7452', 'New', 23, '2022-05-27 18:10:47', '2022-05-27 18:10:47'),
(31, '631726969', 'Y3812733Z', NULL, 'see', 'see', 'patient', NULL, '08902', 'ss', 'ss', 23, '2022-05-27 18:10:47', '2022-05-27 18:10:47'),
(32, '695393619', '30429542Q', '30831', 'Alison', 'Bernier', 'specialist', NULL, '19130', '9544 McDermott Hollow\nEast Tressa, NY 26844-7452', 'New', 24, '2022-05-27 18:10:47', '2022-05-27 18:10:47'),
(33, '631726969', 'Y3812733Z', NULL, 'see', 'see', 'patient', NULL, '08902', 'ss', 'ss', 24, '2022-05-27 18:10:47', '2022-05-27 18:10:47'),
(34, '695393619', '30429542Q', '30831', 'Alison', 'Bernier', 'specialist', NULL, '19130', '9544 McDermott Hollow\nEast Tressa, NY 26844-7452', 'New', 25, '2022-05-27 18:11:43', '2022-05-27 18:11:43'),
(35, '631726969', 'Y3812733Z', NULL, 'see', 'see', 'patient', NULL, '08902', 'ss', 'ss', 25, '2022-05-27 18:11:43', '2022-05-27 18:11:43'),
(36, '695393619', '30429542Q', '30831', 'Alison', 'Bernier', 'specialist', NULL, '19130', '9544 McDermott Hollow\nEast Tressa, NY 26844-7452', 'New', 26, '2022-05-27 18:11:43', '2022-05-27 18:11:43'),
(37, '631726969', 'Y3812733Z', NULL, 'see', 'see', 'patient', NULL, '08902', 'ss', 'ss', 26, '2022-05-27 18:11:43', '2022-05-27 18:11:43'),
(38, '695393619', '30429542Q', '30831', 'Alison', 'Bernier', 'specialist', NULL, '19130', '9544 McDermott Hollow\nEast Tressa, NY 26844-7452', 'New', 27, '2022-05-27 18:11:43', '2022-05-27 18:11:43'),
(39, '631726969', 'Y3812733Z', NULL, 'see', 'see', 'patient', NULL, '08902', 'ss', 'ss', 27, '2022-05-27 18:11:43', '2022-05-27 18:11:43'),
(40, '695393619', '30429542Q', '30831', 'Alison', 'Bernier', 'specialist', NULL, '19130', '9544 McDermott Hollow\nEast Tressa, NY 26844-7452', 'New', 28, '2022-05-27 18:12:08', '2022-05-27 18:12:08'),
(41, '631726969', 'Y3812733Z', NULL, 'see', 'see', 'patient', NULL, '08902', 'ss', 'ss', 28, '2022-05-27 18:12:08', '2022-05-27 18:12:08'),
(42, '695393619', '30429542Q', '30831', 'Alison', 'Bernier', 'specialist', NULL, '19130', '9544 McDermott Hollow\nEast Tressa, NY 26844-7452', 'New', 29, '2022-05-27 18:13:25', '2022-05-27 18:13:25'),
(43, '631726969', 'Y3812733Z', NULL, 'see', 'see', 'patient', NULL, '08902', 'ss', 'ss', 29, '2022-05-27 18:13:25', '2022-05-27 18:13:25'),
(44, '695393619', '30429542Q', '30831', 'Alison', 'Bernier', 'specialist', NULL, '19130', '9544 McDermott Hollow\nEast Tressa, NY 26844-7452', 'New', 30, '2022-05-27 18:13:25', '2022-05-27 18:13:25'),
(45, '631726969', 'Y3812733Z', NULL, 'see', 'see', 'patient', NULL, '08902', 'ss', 'ss', 30, '2022-05-27 18:13:25', '2022-05-27 18:13:25'),
(46, '695393619', '30429542Q', '30831', 'Alison', 'Bernier', 'specialist', NULL, '19130', '9544 McDermott Hollow\nEast Tressa, NY 26844-7452', 'New', 31, '2022-05-27 18:13:35', '2022-05-27 18:13:35'),
(47, '631726969', 'Y3812733Z', NULL, 'see', 'see', 'patient', NULL, '08902', 'ss', 'ss', 31, '2022-05-27 18:13:35', '2022-05-27 18:13:35'),
(48, '695393619', '30429542Q', '30831', 'Alison', 'Bernier', 'specialist', NULL, '19130', '9544 McDermott Hollow\nEast Tressa, NY 26844-7452', 'New', 32, '2022-05-27 18:13:35', '2022-05-27 18:13:35'),
(49, '631726969', 'Y3812733Z', NULL, 'see', 'see', 'patient', NULL, '08902', 'ss', 'ss', 32, '2022-05-27 18:13:35', '2022-05-27 18:13:35'),
(50, '695393619', '30429542Q', '30831', 'Alison', 'Bernier', 'specialist', NULL, '19130', '9544 McDermott Hollow\nEast Tressa, NY 26844-7452', 'New', 33, '2022-05-27 18:13:35', '2022-05-27 18:13:35'),
(51, '631726969', 'Y3812733Z', NULL, 'see', 'see', 'patient', NULL, '08902', 'ss', 'ss', 33, '2022-05-27 18:13:35', '2022-05-27 18:13:35'),
(52, '695393619', '30429542Q', '30831', 'Alison', 'Bernier', 'specialist', NULL, '19130', '9544 McDermott Hollow\nEast Tressa, NY 26844-7452', 'New', 34, '2022-05-27 18:15:14', '2022-05-27 18:15:14'),
(53, '631153059', '64232260E', NULL, 'Carson', 'Collins', 'patient', NULL, '15340', '3230 Collin Station\nWest Judahfurt, AK 65903', 'New', 34, '2022-05-27 18:15:14', '2022-05-27 18:15:14'),
(54, '695393619', '30429542Q', '30831', 'Alison', 'Bernier', 'specialist', NULL, '19130', '9544 McDermott Hollow\nEast Tressa, NY 26844-7452', 'New', 35, '2022-05-27 18:15:14', '2022-05-27 18:15:14'),
(55, '631153059', '64232260E', NULL, 'Carson', 'Collins', 'patient', NULL, '15340', '3230 Collin Station\nWest Judahfurt, AK 65903', 'New', 35, '2022-05-27 18:15:14', '2022-05-27 18:15:14'),
(56, '695393619', '30429542Q', '30831', 'Alison', 'Bernier', 'specialist', NULL, '19130', '9544 McDermott Hollow\nEast Tressa, NY 26844-7452', 'New', 36, '2022-05-27 18:30:11', '2022-05-27 18:30:11'),
(57, '631726969', 'Y3812733Z', NULL, 'see', 'see', 'patient', NULL, '08902', 'ss', 'ss', 36, '2022-05-27 18:30:11', '2022-05-27 18:30:11');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `treatments`
--

CREATE TABLE `treatments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double(6,2) NOT NULL,
  `description` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `treatments`
--

INSERT INTO `treatments` (`id`, `name`, `price`, `description`, `active`, `created_at`, `updated_at`) VALUES
(1, 'CIRUGÍA DE LA UÑArrrrrrrrrrrrrrrrr', 5550.28, 'Eos sunt alias expedita pariatur.rrrrrrrrrrr', 1, '2022-05-27 17:52:25', '2022-05-27 18:15:49'),
(2, 'ESTUDIO BIOMECÁNICO + SP ADULTO', 15.70, 'Natus autem dicta architecto libero aut iusto.', 1, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(3, 'PROTESIS MEDIANA', 43.21, 'Deleniti enim natus quia quis similique unde.', 0, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(4, 'TRATAMIENTO VERRUGAS', 76.91, 'Aut provident enim aut quo.', 0, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(5, 'REEDUCACIÓN UNGUEAL', 92.49, 'Inventore tempora doloremque et dicta.', 0, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(6, 'RETOQUES O CAMBIO FORROS SP', 54.01, 'Aut distinctio ipsum voluptatem.', 1, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(7, 'ESTUDIO BIOMECANICO', 39.46, 'Et nemo tempore voluptas aspernatur et nobis.', 1, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(8, 'RETOQUES O CAMBIO FORROS SP', 76.36, 'Pariatur maxime debitis recusandae aut ipsa.', 1, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(9, 'VENDAJE NEUROMUSCULAR', 26.42, 'Aut qui tempore ullam omnis dolore molestias.', 0, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(10, 'PROTESIS GRANDE', 86.10, 'Beatae sed dolores vel nostrum.', 0, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(11, 'OTRAS PRUEBAS', 93.33, 'Ea voluptatem eos occaecati perspiciatis ipsum.', 0, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(12, 'QUIROPODOLOGIA', 37.73, 'Ratione voluptatem non omnis sint illum quam.', 0, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(13, 'VENDAJE NEUROMUSCULAR', 25.08, 'Aut consequatur qui qui sit eos.', 0, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(14, 'SILMA', 55.61, 'Nihil autem itaque sed omnis sint qui vel.', 1, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(15, 'TRATAMIENTO VERRUGAS', 16.46, 'Laudantium doloribus et quam mollitia.', 0, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(16, '545', 45.00, '5eee5', 1, '2022-05-27 18:15:58', '2022-05-27 18:15:58');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dni` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birthdate` date NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postal_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint(1) DEFAULT 1,
  `previous_pathologies` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `diabetic` tinyint(1) DEFAULT 0,
  `ss_CIP` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `center_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `collegiate_num` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('admin','specialist','patient') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'patient',
  `register_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `password`, `dni`, `email`, `phone`, `birthdate`, `city`, `address`, `postal_code`, `active`, `previous_pathologies`, `diabetic`, `ss_CIP`, `center_code`, `collegiate_num`, `role`, `register_date`, `created_at`, `updated_at`) VALUES
(1, 'Kirstin', 'Dare', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '36976640Y', 'pthiel@example.net', '655752656', '1994-07-22', 'West', '6388 Emard Parkway Suite 398\nEast Maetown, CT 12919-6516', '47205', 0, 'Ipsa officia et culpa non.', 1, 'BHWH9355715945', '4550254237', '43999', 'patient', '1978-06-03 16:58:14', '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(2, 'Randi', 'Kemmer', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '04421791Y', 'elvie08@example.com', '640849655', '1997-09-13', 'West', '251 Agnes Pine Suite 492\nSaulbury, SD 80380', '74593', 1, 'Omnis commodi saepe ullam sed omnis.', 0, 'XUJV0734400757', '1155102017', '32785', 'admin', '2019-11-21 11:35:06', '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(3, 'Brain', 'Cormier', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '64550295M', 'mireille.hermann@example.net', '665472083', '1985-05-09', 'Lake', '46139 Pinkie Pike Suite 663\nSouth Vergie, MD 00452', '18440', 0, 'Qui laudantium ratione voluptate.', 1, 'RMLN3952403768', '7056000912', '75630', 'patient', '1986-04-13 12:25:26', '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(4, 'Aiyana', 'Robel', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '95350363U', 'mable64@example.com', '647257027', '1988-01-09', 'New', '191 Ledner Fork\nLake Norvalhaven, AK 05487', '55714', 0, 'Repellat et sit quo dolorem sint.', 0, 'JLCB1690891969', '0224903845', '83900', 'patient', '1990-01-10 10:29:52', '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(5, 'Ellsworth', 'Runolfsson', '$2y$10$XVy.PUy6oUZl52G.dqGD9u/ofbPmsfDaO52nANG39wGCWqPGAnmey', '49953749A', 'broderick75@example.org', '683508328', '1975-04-06', 'South', '5103 Keeling Forks Apt. 742\nBahringerside, OR 72884-5947', '39375', 1, NULL, NULL, NULL, NULL, '26053', 'admin', '1976-12-02 23:00:00', '2022-05-27 17:52:25', '2022-05-27 18:19:00'),
(6, 'Floy', 'Williamson', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '07913726J', 'bethel.crooks@example.net', '613492134', '2014-03-14', 'East', '526 Adriana Pike\nDouglasview, FL 10508-6369', '68626', 0, 'Non veritatis eos magnam est.', 1, 'FWZY4102170115', '5808507324', '13621', 'patient', '2004-08-30 13:39:15', '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(7, 'Josiane', 'Steuber', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '98662155A', 'kuhlman.kyla@example.net', '645391052', '1999-12-30', 'East', '850 Stark Cape\nRutherfordfurt, RI 69706', '90498', 0, 'Aliquam nemo velit adipisci blanditiis.', 0, 'ZQKU7455603126', '5936539737', '07099', 'patient', '1981-01-29 10:11:11', '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(8, 'Estevan', 'O\'Connell', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '72757444Z', 'feil.marley@example.org', '615822309', '2006-12-03', 'East', '106 Mosciski Ways Suite 333\nEast Ethelyn, MI 87960', '88876', 1, 'Qui facere sed magnam id neque nulla.', 0, 'CAHX9926797783', '9211425608', '92229', 'admin', '2003-04-23 17:59:47', '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(9, 'Alison', 'Bernier', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '30429542Q', 'rolfson.harmon@example.net', '695393619', '1972-12-02', 'New', '9544 McDermott Hollow\nEast Tressa, NY 26844-7452', '19130', 1, 'Beatae velit natus magni.', 1, 'WHPW6305308636', '2097143049', '30831', 'specialist', '1997-03-01 18:50:04', '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(10, 'Buck', 'Keebler', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '98218321S', 'lbartoletti@example.net', '656166969', '2018-08-18', 'North', '27584 Eleazar Ramp Apt. 278\nLeonfort, IN 04388', '45855', 1, 'Voluptatem aut qui quo alias ad.', 0, 'JCGI6403312858', '4761067358', '88108', 'patient', '2019-05-01 23:24:48', '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(12, 'Jeremie', 'Toy', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '01356614U', 'lydia.medhurst@example.net', '617088634', '1974-07-13', 'North', '3563 Percival Fort\nNew Florencehaven, MN 10805', '48478', 1, 'Omnis harum minus qui.', 1, 'OBPG6252572557', '4550062056', '62324', 'admin', '2001-05-12 09:20:50', '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(13, 'Carson', 'Collins', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '64232260E', 'ondricka.charlotte@example.com', '631153059', '2008-07-30', 'New', '3230 Collin Station\nWest Judahfurt, AK 65903', '15340', 1, 'Fuga non repudiandae et maiores.', 0, 'UZLZ0722537563', '8366814421', NULL, 'patient', '2013-01-20 23:00:00', '2022-05-27 17:52:25', '2022-05-27 18:15:02'),
(14, 'Zita', 'Miller', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '31972653P', 'elisa92@example.com', '605338116', '1978-10-18', 'East', '86055 Marquardt Trafficway\nCalebtown, NH 38767', '86559', 0, 'Earum qui ad eligendi nulla et enim.', 0, 'BVZB3836024170', '1195440943', NULL, 'patient', '2005-01-11 23:00:00', '2022-05-27 17:52:25', '2022-05-27 17:57:17'),
(15, 'Hoyt', 'Mills', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '84557941S', 'jraynor@example.com', '685182892', '1994-10-27', 'Port', '1548 John Light\nWest Alexanderburgh, IN 31237-6280', '31089', 0, 'Hic et fugiat ut praesentium.', 0, 'PBVQ6104061203', '6676102772', '22760', 'admin', '1979-07-22 15:13:35', '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(16, 'see', 'see', NULL, 'Y3812733Z', 's@gmail.com', '631726969', '2022-05-13', 'ss', 'ss', '08902', 1, 'sssss', 0, 'GHNB2323454677', '2345243534', NULL, 'patient', '2022-05-27 19:58:21', '2022-05-27 17:58:21', '2022-05-27 17:58:21'),
(17, 'jordi', 'jordi', '$2y$10$pJdMFLqclamoqt0bMwrsaeawbTWlY0ZShCvf0OqPmp6Su3B.45ZJO', '48203114J', 'jordi@gmail.com', '631725959', '2022-05-04', 'wewe', 'ewe', 'wew', 1, NULL, NULL, NULL, NULL, '43645654', 'admin', '2022-05-27 20:21:24', '2022-05-27 18:21:24', '2022-05-27 18:21:24');

-- --------------------------------------------------------

--
-- Table structure for table `uses`
--

CREATE TABLE `uses` (
  `visit_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `treatment_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `uses`
--

INSERT INTO `uses` (`visit_id`, `user_id`, `treatment_id`, `created_at`, `updated_at`) VALUES
(23, 9, 9, '2022-05-27 18:13:25', '2022-05-27 18:13:25'),
(23, 9, 12, '2022-05-27 18:13:25', '2022-05-27 18:13:25'),
(24, 9, 9, '2022-05-27 18:13:27', '2022-05-27 18:13:27'),
(24, 9, 12, '2022-05-27 18:13:27', '2022-05-27 18:13:27'),
(25, 9, 5, '2022-05-27 18:13:35', '2022-05-27 18:13:35'),
(25, 9, 13, '2022-05-27 18:13:35', '2022-05-27 18:13:35'),
(25, 9, 15, '2022-05-27 18:13:35', '2022-05-27 18:13:35'),
(27, 9, 2, '2022-05-27 18:30:11', '2022-05-27 18:30:11');

-- --------------------------------------------------------

--
-- Table structure for table `visits`
--

CREATE TABLE `visits` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `visit_description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `visit_date` date NOT NULL,
  `sent` tinyint(1) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `visits`
--

INSERT INTO `visits` (`id`, `visit_description`, `visit_date`, `sent`, `user_id`, `created_at`, `updated_at`) VALUES
(3, 'Reiciendis quia et ut minima.', '2021-12-16', 1, 1, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(4, 'Voluptatibus in consequatur assumenda rerum.', '2021-10-10', 0, 14, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(8, 'Et quo voluptatum odit omnis quae omnis.', '2022-02-07', 0, 3, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(10, 'Ab consequatur aut rem omnis ut.', '2022-03-11', 0, 8, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(14, 'Dolorem eius inventore voluptatem enim optio.', '2022-03-30', 1, 9, '2022-05-27 17:52:25', '2022-05-27 17:52:25'),
(23, 'No hay descripción', '2022-05-27', 0, 16, '2022-05-27 18:13:25', '2022-05-27 18:13:25'),
(24, 'No hay descripción', '2022-05-27', 0, 16, '2022-05-27 18:13:27', '2022-05-27 18:13:27'),
(25, 'No hay descripción', '2022-05-27', 0, 16, '2022-05-27 18:13:35', '2022-05-27 18:13:35'),
(27, 'No hay descripción', '2022-05-27', 0, 16, '2022-05-27 18:30:11', '2022-05-27 18:30:11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attacheds`
--
ALTER TABLE `attacheds`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attacheds_visit_id_foreign` (`visit_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoices_visit_id_foreign` (`visit_id`);

--
-- Indexes for table `invoice_details`
--
ALTER TABLE `invoice_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoice_details_invoice_id_foreign` (`invoice_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `partner_invoices`
--
ALTER TABLE `partner_invoices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `partner_invoices_invoice_id_foreign` (`invoice_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `treatments`
--
ALTER TABLE `treatments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_dni_unique` (`dni`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `uses`
--
ALTER TABLE `uses`
  ADD PRIMARY KEY (`visit_id`,`user_id`,`treatment_id`),
  ADD KEY `uses_user_id_foreign` (`user_id`),
  ADD KEY `uses_treatment_id_foreign` (`treatment_id`);

--
-- Indexes for table `visits`
--
ALTER TABLE `visits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `visits_user_id_foreign` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attacheds`
--
ALTER TABLE `attacheds`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `invoice_details`
--
ALTER TABLE `invoice_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `partner_invoices`
--
ALTER TABLE `partner_invoices`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `treatments`
--
ALTER TABLE `treatments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `visits`
--
ALTER TABLE `visits`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attacheds`
--
ALTER TABLE `attacheds`
  ADD CONSTRAINT `attacheds_visit_id_foreign` FOREIGN KEY (`visit_id`) REFERENCES `visits` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_visit_id_foreign` FOREIGN KEY (`visit_id`) REFERENCES `visits` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `invoice_details`
--
ALTER TABLE `invoice_details`
  ADD CONSTRAINT `invoice_details_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`);

--
-- Constraints for table `partner_invoices`
--
ALTER TABLE `partner_invoices`
  ADD CONSTRAINT `partner_invoices_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`);

--
-- Constraints for table `uses`
--
ALTER TABLE `uses`
  ADD CONSTRAINT `uses_treatment_id_foreign` FOREIGN KEY (`treatment_id`) REFERENCES `treatments` (`id`),
  ADD CONSTRAINT `uses_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `uses_visit_id_foreign` FOREIGN KEY (`visit_id`) REFERENCES `visits` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `visits`
--
ALTER TABLE `visits`
  ADD CONSTRAINT `visits_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
