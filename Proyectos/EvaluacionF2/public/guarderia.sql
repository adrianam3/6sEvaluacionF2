-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-09-2024 a las 17:52:26
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `guarderia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignaciones`
--

CREATE TABLE `asignaciones` (
  `asignacion_id` int(11) NOT NULL,
  `nino_id` int(11) DEFAULT NULL,
  `cuidador_id` int(11) DEFAULT NULL,
  `fecha_asignacion` date DEFAULT NULL,
  `estado` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `asignaciones`
--

INSERT INTO `asignaciones` (`asignacion_id`, `nino_id`, `cuidador_id`, `fecha_asignacion`, `estado`) VALUES
(1, 1, 1, '2024-09-17', 1),
(2, 1, 1, '2024-09-10', 0),
(7, 4, 1, '2024-02-15', 0),
(9, 9, 2, '2024-09-30', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuidadores`
--

CREATE TABLE `cuidadores` (
  `cuidador_id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `especialidad` varchar(100) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `estado` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cuidadores`
--

INSERT INTO `cuidadores` (`cuidador_id`, `nombre`, `especialidad`, `telefono`, `email`, `estado`) VALUES
(1, 'ADRIAN ADOLFO MERLO ARCOS otro', 'CUIDADOR TECNOLOGICO otro', '0999101191', 'adrian_am3@hotmail.com', 1),
(2, 'ALEJANDRA ARCOS', 'CUIDADOR PEDAGOGICO', '0999101191', 'alejandra_am3@hotmail.com', 1),
(6, 'CUIDADOR 01', 'ESPECILIDAD CUIDADOR 01', '0999101192', 'cuidar01@gmail.com', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ninos`
--

CREATE TABLE `ninos` (
  `nino_id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `alergias` text DEFAULT NULL,
  `estado` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ninos`
--

INSERT INTO `ninos` (`nino_id`, `nombre`, `apellido`, `fecha_nacimiento`, `alergias`, `estado`) VALUES
(1, 'Sebastian', 'Merlo', '2014-09-01', 'Rinitis alergica crónica', 1),
(3, 'LORENZO ', 'LOMAS', '2023-06-27', 'NINGUNA', 1),
(4, 'JUANITO', 'PEREZ', '2022-08-02', 'ALERGIA AL SOL', 1),
(7, 'NIÑO 02', 'APELLIDO NIÑO 02', '2015-12-31', 'ALERGIA NIÑO 02', 1),
(9, 'NIÑO 04', 'APELLIDO NIÑO 04', '2018-01-01', 'ALERGIA NIÑO 04', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asignaciones`
--
ALTER TABLE `asignaciones`
  ADD PRIMARY KEY (`asignacion_id`),
  ADD KEY `nino_id` (`nino_id`),
  ADD KEY `cuidador_id` (`cuidador_id`);

--
-- Indices de la tabla `cuidadores`
--
ALTER TABLE `cuidadores`
  ADD PRIMARY KEY (`cuidador_id`);

--
-- Indices de la tabla `ninos`
--
ALTER TABLE `ninos`
  ADD PRIMARY KEY (`nino_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asignaciones`
--
ALTER TABLE `asignaciones`
  MODIFY `asignacion_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `cuidadores`
--
ALTER TABLE `cuidadores`
  MODIFY `cuidador_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `ninos`
--
ALTER TABLE `ninos`
  MODIFY `nino_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asignaciones`
--
ALTER TABLE `asignaciones`
  ADD CONSTRAINT `asignaciones_ibfk_1` FOREIGN KEY (`nino_id`) REFERENCES `ninos` (`nino_id`),
  ADD CONSTRAINT `asignaciones_ibfk_2` FOREIGN KEY (`cuidador_id`) REFERENCES `cuidadores` (`cuidador_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
