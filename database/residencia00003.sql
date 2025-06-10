-- MySQL dump 10.13  Distrib 5.7.44, for Win64 (x86_64)
--
-- Host: localhost    Database: residencia00003
-- ------------------------------------------------------
-- Server version	5.7.44-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bond_entity`
--

DROP TABLE IF EXISTS `bond_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bond_entity` (
  `nome` varchar(255) NOT NULL,
  `matricula` int(11) NOT NULL AUTO_INCREMENT,
  `turma` varchar(255) NOT NULL,
  `disciplina` varchar(255) NOT NULL,
  `papel` varchar(255) NOT NULL,
  `inicio` datetime NOT NULL,
  `termino` datetime NOT NULL,
  `obs` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `processId` varchar(255) NOT NULL,
  PRIMARY KEY (`matricula`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bond_entity`
--

LOCK TABLES `bond_entity` WRITE;
/*!40000 ALTER TABLE `bond_entity` DISABLE KEYS */;
/*!40000 ALTER TABLE `bond_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class_entity`
--

DROP TABLE IF EXISTS `class_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `class_entity` (
  `turma` varchar(255) NOT NULL,
  `codigo` int(11) NOT NULL AUTO_INCREMENT,
  `disciplina` varchar(255) NOT NULL,
  `turno` varchar(255) NOT NULL,
  `capacidade` int(11) NOT NULL,
  `inicio` datetime NOT NULL,
  `termino` datetime NOT NULL,
  `professor` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `processId` varchar(255) NOT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_entity`
--

LOCK TABLES `class_entity` WRITE;
/*!40000 ALTER TABLE `class_entity` DISABLE KEYS */;
/*!40000 ALTER TABLE `class_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discipline_entity`
--

DROP TABLE IF EXISTS `discipline_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `discipline_entity` (
  `periodo` varchar(255) NOT NULL,
  `disciplina` varchar(255) NOT NULL,
  `codigo` int(11) NOT NULL AUTO_INCREMENT,
  `inicio` datetime NOT NULL,
  `termino` datetime NOT NULL,
  `categoria` varchar(255) NOT NULL,
  `periodoCurricular` varchar(255) NOT NULL,
  `estado` varchar(255) NOT NULL,
  `campus` varchar(255) NOT NULL,
  `processId` varchar(255) NOT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discipline_entity`
--

LOCK TABLES `discipline_entity` WRITE;
/*!40000 ALTER TABLE `discipline_entity` DISABLE KEYS */;
INSERT INTO `discipline_entity` VALUES ('2025/1','Banco de Dados',1,'2025-02-10 00:00:28','2025-06-30 00:00:28','Obrigatoria','3','Ativa','Campus Central','683b437d02087a1bccbca925'),('2025/1','Estrutura de Dados',2,'2025-02-10 00:00:28','2025-06-30 00:00:28','Obrigatoria','2','Ativa','Campus Leste','683b437d02087a1bccbca925'),('2025/1','Redes de Computadores',3,'2025-02-10 00:00:28','2025-06-30 00:00:28','Obrigatoria','4','Ativa','Campus Central','683b437d02087a1bccbca925'),('2025/1','Inteligencia Artificial',4,'2025-02-17 00:00:28','2025-06-25 00:00:28','Obrigatoria','6','Ativa','Campus Oeste','683b437d02087a1bccbca925'),('2025/2','Desenvolvimento Web',5,'2025-02-12 00:00:28','2025-06-28 00:00:28','Obrigatoria','3','Ativa','Campus Sul','683b437d02087a1bccbca925'),('2025/2','Empreendedorismo em TI',6,'2025-02-15 00:00:28','2025-06-30 00:00:28','Obrigatoria','5','Ativa','Campus Norte','683b437d02087a1bccbca925'),('2025/2','Seguranca da Informacao',7,'2025-02-11 00:00:28','2025-06-29 00:00:28','Obrigatoria','5','Ativa','Campus Central','683b437d02087a1bccbca925');
/*!40000 ALTER TABLE `discipline_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_entity`
--

DROP TABLE IF EXISTS `user_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_entity` (
  `nome` varchar(255) NOT NULL,
  `matricula` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `curso` varchar(255) NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `nascimento` datetime NOT NULL,
  `cadastro` datetime NOT NULL,
  `contato` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `processId` varchar(255) NOT NULL,
  PRIMARY KEY (`matricula`)
) ENGINE=InnoDB AUTO_INCREMENT=20255790 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_entity`
--

LOCK TABLES `user_entity` WRITE;
/*!40000 ALTER TABLE `user_entity` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_entity` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-10 10:31:34
