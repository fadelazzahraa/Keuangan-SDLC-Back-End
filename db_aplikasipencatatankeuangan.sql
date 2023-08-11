-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 11 Agu 2023 pada 05.21
-- Versi server: 10.4.22-MariaDB-log
-- Versi PHP: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_aplikasipencatatankeuangan`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `photorecords`
--

CREATE TABLE `photorecords` (
  `id` int(11) NOT NULL,
  `detail` varchar(255) DEFAULT NULL,
  `startDate` date NOT NULL,
  `endDate` date DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `imageDriveId` varchar(255) DEFAULT NULL,
  `imageDriveName` varchar(255) DEFAULT NULL,
  `imageTelegramId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `photorecords`
--

INSERT INTO `photorecords` (`id`, `detail`, `startDate`, `endDate`, `tag`, `image`, `imageDriveId`, `imageDriveName`, `imageTelegramId`, `createdAt`, `updatedAt`) VALUES
(7, 'Struk Post Cafe Bintaro', '2023-08-09', NULL, 'Bank Secure SDLC Photo', '1691585242345-struk.png-file.jpg', NULL, NULL, NULL, '2023-08-09 12:47:22', '2023-08-09 12:47:22'),
(8, 'Struk Serba Serbi Jaya', '2023-08-09', NULL, 'Bank Secure SDLC Photo', '1691585255772-struk2.png-file.jpg', NULL, NULL, NULL, '2023-08-09 12:47:35', '2023-08-09 12:47:35');

-- --------------------------------------------------------

--
-- Struktur dari tabel `records`
--

CREATE TABLE `records` (
  `id` int(11) NOT NULL,
  `actor` enum('me','other') NOT NULL,
  `transaction` enum('debit','credit') NOT NULL,
  `value` decimal(12,3) NOT NULL,
  `detail` varchar(255) DEFAULT NULL,
  `date` date NOT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `sourceRecordId` int(11) DEFAULT NULL,
  `photoRecordId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `records`
--

INSERT INTO `records` (`id`, `actor`, `transaction`, `value`, `detail`, `date`, `tag`, `createdAt`, `updatedAt`, `sourceRecordId`, `photoRecordId`) VALUES
(1, 'me', 'debit', '100000.000', 'Pemasukan', '2023-07-30', 'admin', '2023-07-30 03:25:44', '2023-07-30 03:25:44', 2, NULL),
(2, 'me', 'debit', '250000.000', 'Transfer dari Orang Tua', '2023-07-30', 'admin', '2023-07-30 03:26:08', '2023-07-30 03:26:08', 2, NULL),
(3, 'me', 'credit', '50000.000', 'Bayar Iuran Senat', '2023-07-31', 'admin', '2023-07-30 03:26:29', '2023-07-30 03:26:29', 2, NULL),
(4, 'me', 'credit', '65000.000', 'Beli Jajan', '2023-08-01', 'admin', '2023-07-30 03:26:49', '2023-07-30 03:26:49', 2, NULL),
(5, 'me', 'credit', '65000.000', 'Beli Jajan', '2023-08-01', 'admin', '2023-07-30 07:56:25', '2023-07-30 07:56:25', 2, NULL),
(6, 'me', 'credit', '65000.000', 'Beli Jajan', '2023-08-01', 'admin', '2023-07-30 07:58:53', '2023-07-30 07:58:53', 2, NULL),
(7, 'me', 'credit', '64530.000', 'Beli Jajan', '2023-08-01', 'admin', '2023-07-30 08:00:10', '2023-07-30 08:00:10', 2, NULL),
(8, 'me', 'credit', '64531.000', 'Beli Jajan', '2023-08-01', 'admin', '2023-07-30 08:01:57', '2023-07-30 08:01:57', 2, NULL),
(9, 'me', 'credit', '65000.000', 'Beli Jajan', '2023-08-01', 'admin', '2023-07-30 08:03:22', '2023-07-30 08:03:22', 2, NULL),
(10, 'me', 'credit', '50000.000', 'Beli Jajan', '2023-08-01', 'admin', '2023-07-30 08:03:54', '2023-07-30 08:03:54', 2, NULL),
(11, 'me', 'credit', '10000.000', 'Beli Jajan', '2023-08-01', 'fadel', '2023-07-30 08:06:11', '2023-07-30 08:06:11', 2, NULL),
(12, 'me', 'credit', '50000.000', 'Beli Jajan', '2023-08-01', 'admin', '2023-07-30 08:06:17', '2023-07-30 08:06:17', 2, NULL),
(13, 'me', 'debit', '250121.000', 'Transfer dari Orang Tua', '2023-08-01', 'admin', '2023-07-30 08:06:59', '2023-07-30 08:06:59', 2, NULL),
(14, 'me', 'credit', '50000.000', 'Beli Jajan Lagi', '2023-08-01', 'fadel', '2023-07-30 08:07:13', '2023-08-11 03:03:19', 2, 7),
(15, 'me', 'debit', '123123.000', 'Transfer dari Orang Tua', '2023-08-01', 'userbaru', '2023-07-30 08:09:30', '2023-08-11 02:09:39', 2, NULL),
(16, 'me', 'debit', '123123.000', 'Transfer dari Orang Tua', '2023-08-01', 'admin', '2023-07-30 08:09:42', '2023-07-30 08:09:42', 2, NULL),
(17, 'me', 'debit', '100000.000', 'Pemasukan', '2023-07-25', 'admin', '2023-07-30 08:13:36', '2023-07-30 08:13:36', 2, NULL),
(18, 'me', 'debit', '3213213.000', 'Pemasukan', '2023-07-04', 'admin', '2023-07-30 08:14:25', '2023-08-09 12:55:01', 2, 8),
(19, 'me', 'credit', '1123.000', 'abcde', '2023-06-01', 'admin', '2023-07-30 08:18:26', '2023-07-30 08:18:26', 2, NULL),
(21, 'me', 'credit', '112323.000', 'abcde', '2023-06-01', 'admin', '2023-07-30 08:24:56', '2023-07-30 08:24:56', 2, NULL),
(23, 'me', 'credit', '112323.000', 'edit cuy bukan tambah', '2023-06-01', 'admin', '2023-07-30 08:32:41', '2023-07-30 08:32:56', 2, NULL),
(24, 'me', 'credit', '50000.000', 'Beli Jajan', '2023-08-01', 'admin', '2023-07-30 08:45:22', '2023-07-30 08:45:22', 2, NULL),
(25, 'me', 'credit', '50000.000', 'Beli Jajan', '2023-08-01', 'userbaru', '2023-08-09 06:56:28', '2023-08-11 02:09:39', 2, NULL),
(26, 'me', 'debit', '1000000.000', 'Dari orang tua', '2023-07-30', 'fadel', '2023-08-09 06:56:52', '2023-08-09 12:55:29', 2, 8),
(27, 'me', 'debit', '10000.000', 'Kado ultah 2', '2023-08-02', 'userbaru', '2023-08-09 06:57:15', '2023-08-11 02:09:39', 2, 8),
(28, 'me', 'credit', '5000.000', 'Bayar utang', '2023-08-03', 'admin', '2023-08-09 06:57:29', '2023-08-09 06:57:29', 2, NULL),
(29, 'me', 'credit', '5000.000', 'Bayar utang', '2023-08-03', 'admin', '2023-08-09 06:57:30', '2023-08-09 06:57:30', 2, NULL),
(30, 'me', 'credit', '5000.000', 'Bayar utang', '2023-08-03', 'admin', '2023-08-09 06:57:40', '2023-08-09 06:57:40', 2, NULL),
(31, 'me', 'credit', '5000.000', 'Bayar utang', '2023-08-03', 'admin', '2023-08-09 06:57:41', '2023-08-09 06:57:41', 2, NULL),
(32, 'me', 'credit', '5000.000', 'Bayar utang', '2023-08-03', 'admin', '2023-08-09 06:57:42', '2023-08-09 06:57:42', 2, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `sourcerecords`
--

CREATE TABLE `sourcerecords` (
  `id` int(11) NOT NULL,
  `sourceType` enum('bankAccount','eWallet','wallet','other') NOT NULL,
  `source` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `sourcerecords`
--

INSERT INTO `sourcerecords` (`id`, `sourceType`, `source`, `createdAt`, `updatedAt`) VALUES
(2, 'bankAccount', 'BankSecureSDLC', '2023-08-09 06:26:33', '2023-08-09 06:26:33');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('user','admin') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'fadel', 'fadel@mail.com', '$2a$08$hdBad9jlBL0rvv/tK.6PGuTTg9dMC/w0XKLlXWCI9coPYWvUw5SUi', 'user', '2023-07-25 07:09:00', '2023-08-09 05:27:15'),
(2, 'admin', 'admin@mail.com', '$2a$08$tScviXacJ564yhLmokg.L.K6AFu075ueZlEZhgTkp07OK28xHFp6K', 'admin', '2023-08-09 04:33:43', '2023-08-09 14:07:52'),
(3, 'userbaru', 'newuser@mail.com', '$2a$08$UO3J2PJ8R8478BRYNn7iIezKfk9ZZmGBgmhpEbW1a.aSYZZEyATUa', 'user', '2023-08-09 05:29:46', '2023-08-11 02:09:38');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `photorecords`
--
ALTER TABLE `photorecords`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `records`
--
ALTER TABLE `records`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sourceRecordId` (`sourceRecordId`),
  ADD KEY `photoRecordId` (`photoRecordId`);

--
-- Indeks untuk tabel `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `sourcerecords`
--
ALTER TABLE `sourcerecords`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `photorecords`
--
ALTER TABLE `photorecords`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `records`
--
ALTER TABLE `records`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT untuk tabel `sourcerecords`
--
ALTER TABLE `sourcerecords`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `records`
--
ALTER TABLE `records`
  ADD CONSTRAINT `records_ibfk_1` FOREIGN KEY (`sourceRecordId`) REFERENCES `sourcerecords` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `records_ibfk_2` FOREIGN KEY (`photoRecordId`) REFERENCES `photorecords` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
