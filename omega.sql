-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: omega
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `omega_admin`
--

DROP TABLE IF EXISTS `omega_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `omega_admin` (
  `uid` int NOT NULL,
  `tid` int DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `omega_admin`
--

LOCK TABLES `omega_admin` WRITE;
/*!40000 ALTER TABLE `omega_admin` DISABLE KEYS */;
INSERT INTO `omega_admin` VALUES (1,1),(51,1),(54,1),(55,0),(56,1),(63,5);
/*!40000 ALTER TABLE `omega_admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `omega_applimit`
--

DROP TABLE IF EXISTS `omega_applimit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `omega_applimit` (
  `protagonist` int DEFAULT NULL,
  `kind` enum('type','status') DEFAULT NULL,
  `responsiless` char(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `omega_applimit`
--

LOCK TABLES `omega_applimit` WRITE;
/*!40000 ALTER TABLE `omega_applimit` DISABLE KEYS */;
INSERT INTO `omega_applimit` VALUES (1,'status','checked'),(2,'status','save'),(3,'status','save'),(2,'status','checked'),(3,'status','checked');
/*!40000 ALTER TABLE `omega_applimit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `omega_applistatus`
--

DROP TABLE IF EXISTS `omega_applistatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `omega_applistatus` (
  `status` char(8) DEFAULT NULL,
  `homeobox` int DEFAULT NULL,
  `surrogate` char(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `omega_applistatus`
--

LOCK TABLES `omega_applistatus` WRITE;
/*!40000 ALTER TABLE `omega_applistatus` DISABLE KEYS */;
INSERT INTO `omega_applistatus` VALUES ('save',1,'已保存'),('checking',2,'审核中'),('checked',3,'已审核'),('backing',3,'代销假'),('backed',4,'已销假');
/*!40000 ALTER TABLE `omega_applistatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `omega_applitype`
--

DROP TABLE IF EXISTS `omega_applitype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `omega_applitype` (
  `type` char(10) NOT NULL,
  `sequence` int DEFAULT NULL,
  `meaning` char(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `omega_applitype`
--

LOCK TABLES `omega_applitype` WRITE;
/*!40000 ALTER TABLE `omega_applitype` DISABLE KEYS */;
INSERT INTO `omega_applitype` VALUES ('leave',4,'离校'),('repair',3,'报修'),('ruin',3,'退寝'),('swap',3,'换寝'),('vain',0,'暂无');
/*!40000 ALTER TABLE `omega_applitype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `omega_apply`
--

DROP TABLE IF EXISTS `omega_apply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `omega_apply` (
  `applId` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `sid` int DEFAULT NULL,
  `telephone` char(11) DEFAULT NULL,
  `timestamp` bigint DEFAULT NULL,
  `straight` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `meta` char(120) DEFAULT NULL,
  `type` char(13) DEFAULT NULL,
  `status` char(13) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`applId`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `omega_apply`
--

LOCK TABLES `omega_apply` WRITE;
/*!40000 ALTER TABLE `omega_apply` DISABLE KEYS */;
INSERT INTO `omega_apply` VALUES (66,47,46384,'1312344',1685258819923,'<p>自证变体2.报修</p>','{}','repair','checked'),(70,47,46384,'56565651',1685249550243,'<p>权倾理解哈哈埃氏</p>','{}','repair','checked'),(71,47,46384,'112233',1685249682354,'<p>从vv发v</p>','{}','repair','checked'),(72,47,46384,'15155',1685249929214,'<p>65646545641</p>','{}','repair','checked'),(73,47,46384,'156156',1685249968253,'<p>15152</p>','{}','repair','checked'),(74,47,46384,'123454',1685255627614,'<p>141155</p>','{}','repair','checked'),(75,47,46384,'123454',1685254056586,'<p>141155</p>','{}','repair','checked'),(77,47,46384,'155155',1685254073258,'<p>12121</p>','{}','repair','checked'),(84,47,46384,'2635615',1685258780994,'<p>自证变体1</p>','{\"destination\":\"d \",\"roundTime\":[\"2023-05-04\",\"2023-06-16\"],\"vehicle\":\"da \"}','leave','save'),(86,47,46384,'213123',1685258841707,'<p>自证变体3</p>','{\"destination\":\"23\",\"roundTime\":[\"2023-06-16\",\"2023-06-20\"],\"vehicle\":\"213\"}','leave','save'),(89,47,46384,'2134141',1685259943462,'<p>自证变体五</p>','{}','repair','checked'),(90,47,46384,'213414',1685259744675,'<p>自证变体五</p>','{}','repair','checked'),(94,47,46384,'1231243',1685260035731,'<p>自证变体7</p>','{}','repair','checked'),(105,47,46384,'',1685277895794,'<p><br></p>','{\"destination\":\"\",\"roundTime\":[\"2023-05-11\",\"2023-06-13\"],\"vehicle\":\"\"}','leave','save'),(106,47,46384,'489481',1685415257078,'<p>15198489489</p>','{\"destination\":\"48548\",\"roundTime\":[],\"vehicle\":\"\"}','swap','checked'),(107,47,46384,'4142222',1685777310484,'<p>5414255211asfd</p>','{}','repair','checked'),(108,47,46384,'566864484',1685777298532,'<p>dasfsdav</p>','{}','repair','checked'),(109,47,46384,'1455654',1685773463825,'<p>84948</p>','{\"destination\":\"122\",\"roundTime\":[],\"vehicle\":\"\"}','swap','checked'),(111,47,46384,'123456',1685774378224,'<p>454656456416</p>','{}','ruin','checked'),(112,47,46384,'1112323',1685774577145,'<p>dsafdfsdfa</p>','{\"destination\":\"dddd\",\"roundTime\":[\"2023-05-31\",\"2023-06-29\"],\"vehicle\":\"asvdv\"}','leave','backed'),(113,47,46384,'4564',1685780140073,'<p>广泛的和规范化</p>','{\"destination\":\"交换\",\"roundTime\":[\"2023-05-31\",\"2023-06-02\"],\"vehicle\":\"很多事\"}','leave','backed'),(114,47,46384,'13587722995',1686012243281,'<p>退寝 申请</p>','{}','ruin','checking');
/*!40000 ALTER TABLE `omega_apply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `omega_ferry`
--

DROP TABLE IF EXISTS `omega_ferry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `omega_ferry` (
  `ferry_ID` int NOT NULL AUTO_INCREMENT,
  `type` int DEFAULT '1',
  `librakey` char(80) DEFAULT NULL,
  `stack` int DEFAULT NULL,
  PRIMARY KEY (`ferry_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `omega_ferry`
--

LOCK TABLES `omega_ferry` WRITE;
/*!40000 ALTER TABLE `omega_ferry` DISABLE KEYS */;
INSERT INTO `omega_ferry` VALUES (1,1,'chum',4),(2,1,'room',3),(3,1,'tower',6),(4,1,'try',4);
/*!40000 ALTER TABLE `omega_ferry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `omega_floor`
--

DROP TABLE IF EXISTS `omega_floor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `omega_floor` (
  `tid` int DEFAULT NULL,
  `floor` int DEFAULT NULL,
  `max_room` int DEFAULT NULL,
  `status` int DEFAULT '400'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `omega_floor`
--

LOCK TABLES `omega_floor` WRITE;
/*!40000 ALTER TABLE `omega_floor` DISABLE KEYS */;
INSERT INTO `omega_floor` VALUES (1,1,5,400),(1,2,6,400),(1,3,7,404),(1,4,6,404),(1,5,6,404),(1,6,6,404),(1,7,6,404),(1,8,6,404),(1,9,6,404),(1,10,6,400),(1,11,6,400),(5,1,6,400),(5,2,6,400),(5,3,6,400);
/*!40000 ALTER TABLE `omega_floor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `omega_grant`
--

DROP TABLE IF EXISTS `omega_grant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `omega_grant` (
  `uid` int DEFAULT NULL,
  `role` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `omega_grant`
--

LOCK TABLES `omega_grant` WRITE;
/*!40000 ALTER TABLE `omega_grant` DISABLE KEYS */;
INSERT INTO `omega_grant` VALUES (1,2),(47,1),(48,4),(49,1),(50,1),(51,2),(52,1),(53,2),(54,2),(55,3),(56,2),(58,1),(59,0),(62,1),(63,2),(64,4),(65,1),(66,1),(67,1),(68,0),(69,0);
/*!40000 ALTER TABLE `omega_grant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `omega_map`
--

DROP TABLE IF EXISTS `omega_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `omega_map` (
  `official` char(32) DEFAULT NULL,
  `short` char(32) DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `latitude` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `omega_map`
--

LOCK TABLES `omega_map` WRITE;
/*!40000 ALTER TABLE `omega_map` DISABLE KEYS */;
INSERT INTO `omega_map` VALUES ('北京市','北京',116.455,40.2539),('天津市','天津',117.422,39.4189),('河北省','河北',114.499,38.1006),('山西省','山西',112.335,37.9413),('内蒙古自治区','内蒙古',110.347,41.4899),('辽宁省','辽宁',123.124,42.1216),('吉林省','吉林',125.815,44.2584),('黑龙江省','黑龙江',127,48),('上海市','上海',121.465,31.2891),('江苏省','江苏',118.806,31.9208),('浙江省','浙江',119.531,29.8773),('安徽省','安徽',117.29,32.0581),('福建省','福建',119.454,25.9222),('江西省','江西',116.005,28.6633),('山东省','山东',117.158,36.8701),('河南省','河南',113.467,34.6234),('湖北省','湖北',114.39,30.6628),('湖南省','湖南',113.082,28.2568),('广东省','广东',113.122,23.0095),('广西壮族自治区','广西',108.479,23.1152),('海南省','海南',110.389,19.8516),('重庆市','重庆',108.384,30.4397),('四川省','四川',103.953,30.7617),('贵州省','贵州',106.699,26.7682),('云南省','云南',102.92,25.4663),('西藏自治区','西藏',88.3883,31.5637),('陕西省','陕西',109.116,34.2004),('甘肃省','甘肃',103.59,36.3043),('青海省','青海',99.4038,36.8207),('宁夏回族自治区','宁夏',106.359,38.1775),('新疆维吾尔自治区','新疆',87.9236,43.5883),('台湾省','台湾',121,23),('香港特别行政区','香港',114.3,22.9),('澳门特别行政区','澳门',113.5,22.2);
/*!40000 ALTER TABLE `omega_map` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `omega_menu`
--

DROP TABLE IF EXISTS `omega_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `omega_menu` (
  `mid` int NOT NULL AUTO_INCREMENT,
  `sign` char(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `icon` char(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`mid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `omega_menu`
--

LOCK TABLES `omega_menu` WRITE;
/*!40000 ALTER TABLE `omega_menu` DISABLE KEYS */;
INSERT INTO `omega_menu` VALUES (1,'个人中心','User'),(2,'数据面板','Monitor'),(3,'宿舍管理','School'),(5,'请求申请','CollectionTag'),(10,'其他','Setting');
/*!40000 ALTER TABLE `omega_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `omega_order`
--

DROP TABLE IF EXISTS `omega_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `omega_order` (
  `role` int DEFAULT NULL,
  `code` char(31) DEFAULT NULL,
  `description` char(31) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `omega_order`
--

LOCK TABLES `omega_order` WRITE;
/*!40000 ALTER TABLE `omega_order` DISABLE KEYS */;
INSERT INTO `omega_order` VALUES (2,'searchFlat:limit',NULL),(1,'searchFlat:limit',NULL),(1,'searchRoom:limit',NULL),(2,'chum:append',NULL),(3,'delete',NULL),(1,'inputSid:limit',NULL),(1,'inputSname:limit',NULL),(1,'inputRoom:limit',NULL),(1,'inputFlat:limit',NULL),(2,'applyStatus:affirm',NULL),(3,'applyStatus:affirm',NULL),(1,'applyOthertype:affirm',NULL),(1,'applyList:delete',NULL),(1,'applyList:revocation',NULL),(1,'applyList:details',NULL),(1,'applyList:progress',NULL),(1,'applyList:continue',NULL),(2,'applyList:repulse',NULL),(3,'applyList:repulse',NULL),(2,'applyList:acceptance',NULL),(3,'applyList:acceptance',NULL),(2,'applyUltraStatus:affirm',NULL),(3,'applyUltraStatus:affirm',NULL),(2,'roomFloor:open',NULL),(1,'profile:studentenausweis',NULL),(1,'applyList:homecoming',NULL),(3,'chum:append',NULL);
/*!40000 ALTER TABLE `omega_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `omega_role`
--

DROP TABLE IF EXISTS `omega_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `omega_role` (
  `role` int NOT NULL,
  `call` char(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `omega_role`
--

LOCK TABLES `omega_role` WRITE;
/*!40000 ALTER TABLE `omega_role` DISABLE KEYS */;
INSERT INTO `omega_role` VALUES (0,'临时用户'),(1,'正式用户'),(2,'管理员'),(3,'超级管理员'),(4,'退寝用户');
/*!40000 ALTER TABLE `omega_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `omega_room`
--

DROP TABLE IF EXISTS `omega_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `omega_room` (
  `rid` int NOT NULL,
  `floor` int DEFAULT NULL,
  `number` int DEFAULT NULL,
  `tol_bed` int DEFAULT '6',
  `use_bed` int DEFAULT '0',
  `status` int(3) unsigned zerofill DEFAULT '301',
  `tid` int NOT NULL,
  PRIMARY KEY (`rid`,`tid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `omega_room`
--

LOCK TABLES `omega_room` WRITE;
/*!40000 ALTER TABLE `omega_room` DISABLE KEYS */;
INSERT INTO `omega_room` VALUES (101,1,1,6,6,301,1),(101,1,1,3,1,300,5),(102,1,2,6,6,302,1),(102,1,2,6,0,301,5),(103,1,3,6,6,302,1),(103,1,3,6,0,301,5),(104,1,4,6,6,302,1),(104,1,4,6,0,304,5),(105,1,5,6,3,300,1),(105,1,5,6,0,301,5),(106,1,6,6,0,301,1),(201,2,1,6,0,300,1),(202,2,2,6,0,301,1),(203,2,3,6,0,304,1),(204,2,4,6,0,301,1),(205,2,5,6,0,304,1),(206,2,6,6,0,301,1),(301,3,1,6,0,301,1),(302,3,2,6,0,301,1),(303,3,3,6,0,301,1),(304,3,4,6,0,301,1),(305,3,5,6,0,301,1),(306,3,6,6,0,301,1),(307,3,7,6,0,301,1),(1001,10,1,6,0,301,1),(1002,10,2,6,0,301,1),(1003,10,3,8,0,301,1),(1004,10,4,6,0,301,1),(1005,10,5,6,0,301,1),(1006,10,6,6,0,301,1),(1101,11,1,6,0,301,1),(1102,11,2,6,0,301,1),(1103,11,3,6,0,301,1),(1104,11,4,6,0,301,1),(1105,11,5,6,0,301,1),(1106,11,6,6,0,301,1);
/*!40000 ALTER TABLE `omega_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `omega_route`
--

DROP TABLE IF EXISTS `omega_route`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `omega_route` (
  `path` char(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `name` char(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `alias` char(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT '[]',
  `redirect` char(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `component` char(255) DEFAULT NULL,
  `method` char(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `title` char(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `meta` char(255) DEFAULT '{}',
  `father` char(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT 'Index',
  `mid` int DEFAULT NULL,
  `sign` char(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `level` int NOT NULL DEFAULT '2',
  `role` int DEFAULT NULL,
  `weight` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `omega_route`
--

LOCK TABLES `omega_route` WRITE;
/*!40000 ALTER TABLE `omega_route` DISABLE KEYS */;
INSERT INTO `omega_route` VALUES ('/welcome','Welcome','[]',NULL,'welcome.vue','iWelcome','欢迎光临','{}','Index',NULL,'欢迎',2,NULL,NULL),('/try','TryRoot','[]',NULL,'tryRoot.vue','restTry','测试','{}','Index',NULL,'测试',2,NULL,NULL),('/','Index','[\"/index\"]','welcome','Index.vue','guideIndex',NULL,'{}',NULL,NULL,NULL,1,NULL,NULL),('/census','Census','[]',NULL,'census.vue','userReg',NULL,'{}','Index',1,'完善信息',2,0,NULL),('/photoWall','PhotoWall','[]',NULL,'photoWall.vue','restPhotoWall','','{}','Index',NULL,'照片墙',2,NULL,NULL),('/set','Reset','[]',NULL,'reset.vue','alterPsd',NULL,'{}','Index',1,'个人信息',2,NULL,NULL),('/flat/chum','Chum','[]',NULL,'chum.vue','searchChum',NULL,'{}','Index',3,'学生管理',2,2,NULL),('/flat/room','Room','[]',NULL,'room.vue','searchRoom',NULL,'{}','Index',3,'房间管理',2,2,NULL),('/flat/tower','Tower','[]',NULL,'tower.vue','searchTower',NULL,'{}','Index',3,'宿舍管理',2,3,NULL),('/census','Census','[]',NULL,'census.vue','userReg',NULL,'{}','Index',NULL,'信息补全(伪)',2,2,NULL),('/user/order','TryTable','[]',NULL,'tryTable.vue','tableTry',NULL,'{}','Index',3,'用户操作',2,3,9),('/flat/room/detail','RoomDetailChart','[]',NULL,'detailChart.vue','detailChart',NULL,'{}','Room',NULL,NULL,3,2,NULL),('/shadowBorder','ShadowBorder','[]',NULL,'shadowBorder.vue','shadowBorder',NULL,'{}',NULL,2,'数据一览',1,NULL,NULL),('/flat/chum','Chum','[]',NULL,'chum.vue','searchChum',NULL,'{}','Index',3,'学生管理',2,3,9),('/portrait','Portrait','[]',NULL,'portrait.vue','portraitSet',NULL,'{}','Index',NULL,'个人信息',2,NULL,NULL),('/apply/repair','Repair','[]',NULL,'repair.vue','toRepair',NULL,'{}','Index',5,'宿舍报修',2,1,NULL),('/apply/leave','Leave','[]',NULL,'leave.vue','toLeave',NULL,'{}','Index',5,'离校申请',2,1,NULL),('/apply/swap','SWAP','[]',NULL,'swap.vue','toSwap',NULL,'{}','Index',5,'换寝申请',2,1,NULL),('/apply/ruin','RUIN','[]',NULL,'ruin.vue','toRuin',NULL,'{}','Index',5,'退寝申请',2,1,NULL),('/applist','APPLIST','[]',NULL,'spplist.vue','toApplist',NULL,'{\"stayAlive\":true}','Index',5,'申请记录',2,1,10),('/tryTable','TryinTable','[]',NULL,'tryTable.vue','toTrytable',NULL,'{}','Index',NULL,'测试表单',2,NULL,10),('/applist','APPLIST','[]',NULL,'spplist.vue','toApplist',NULL,'{\"stayAlive\":true}','Index',3,'请求管理',2,2,10),('/applist','APPLIST','[]',NULL,'spplist.vue','toApplist',NULL,'{\"stayAlive\":true}','Index',3,'请求管理',2,3,10),('/flat/room','Room','[]',NULL,'room.vue','searchRoom',NULL,'{}','Index',3,'房间管理',2,3,8),('/flat/tower/detail','FlatDetailChart','[]',NULL,'detailChart.vue','detailChart',NULL,'{}','Room',NULL,NULL,3,3,NULL);
/*!40000 ALTER TABLE `omega_route` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `omega_status`
--

DROP TABLE IF EXISTS `omega_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `omega_status` (
  `status` int DEFAULT NULL,
  `decipher` char(31) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `tag_type` enum('default','info','success','warning','danger') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `description` char(31) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `omega_status`
--

LOCK TABLES `omega_status` WRITE;
/*!40000 ALTER TABLE `omega_status` DISABLE KEYS */;
INSERT INTO `omega_status` VALUES (200,'在校','success','学生'),(201,'离校','warning',NULL),(204,'退寝','danger',NULL),(300,'使用中','success','寝室'),(301,'暂空',NULL,NULL),(500,'使用中','success','公寓'),(501,'暂空',NULL,NULL),(304,'禁用','info',NULL),(504,'禁用','info',NULL),(302,'已满','danger',NULL),(502,'已满','danger',NULL),(400,'使用中','success','楼层'),(404,'禁用','warning',NULL);
/*!40000 ALTER TABLE `omega_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `omega_students`
--

DROP TABLE IF EXISTS `omega_students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `omega_students` (
  `sid` int NOT NULL,
  `uid` int DEFAULT NULL,
  `tid` int DEFAULT '1',
  `rid` int DEFAULT NULL,
  `bid` int DEFAULT NULL,
  `sname` char(80) DEFAULT NULL,
  `gender` int DEFAULT NULL,
  `birth` date DEFAULT NULL,
  `census` char(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `major` char(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `grade` char(31) DEFAULT NULL,
  `class` char(31) DEFAULT NULL,
  `status` int DEFAULT '200',
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `omega_students`
--

LOCK TABLES `omega_students` WRITE;
/*!40000 ALTER TABLE `omega_students` DISABLE KEYS */;
INSERT INTO `omega_students` VALUES (30709,65,5,101,1,'陈阳清',0,'2000-01-01','北京市','会计学','2023','1',200),(46384,47,1,101,1,'吴胜',1,'2000-01-01','天津市','金融学','2023','2',200),(123456,58,1,101,5,'柯胜',1,'2000-01-01','北京市','金融学','2023','3',200),(123846,49,1,101,3,'张叫',1,'2000-01-01','河北省','法学','2023','1',200),(123858,NULL,1,105,1,'苦研',1,'2000-01-01','北京市','金融学','2023','1',200),(132398,NULL,1,103,3,'严登',1,'2000-01-01','广东省','经济学','2022','3',200),(135585,NULL,1,105,2,'秦流',1,'2000-01-01','天津市','会计学','2022','1',200),(135769,NULL,1,102,6,'陈登',1,'2000-01-01','天津市','金融学','2022','1',200),(135884,NULL,1,104,6,'连段',1,'2000-01-01','河北省','心理学','2021','1',200),(138574,NULL,1,104,5,'方毅',1,'2000-01-01','河北省','会计学','2023','1',200),(157492,NULL,1,102,1,'欧阳云丹',1,'2000-01-01','天津市','会计学','2022','2',200),(158863,NULL,1,102,2,'晋级',1,'2000-01-01','北京市','金融学','2023','1',200),(159781,50,1,101,4,'陈寿',1,'1999-12-09','北京市','金融学','2009','4',200),(198763,NULL,1,103,4,'林涛',1,'2000-01-01','河北省','金融学','2022','3',200),(213854,NULL,1,104,4,'吕司杰',1,'2000-01-01','北京市','金融学','2023','2',200),(214856,NULL,1,101,6,'周生',1,'2000-01-01','北京市','会计学','2022','1',200),(215645,NULL,1,103,1,'许算',1,'2000-01-01','天津市','金融学','2021','1',200),(235987,NULL,1,103,2,'田琦',1,'2000-01-01','河北省','金融学','2023','3',200),(269974,NULL,1,104,2,'罗南',1,'2000-01-01','河北省','金融学','2022','3',200),(321456,NULL,1,103,6,'连笑',1,'2000-01-01','山西省','经济学','2021','2',200),(321546,NULL,1,102,5,'陈冬平',1,'2000-01-01','天津市','金融学','2023','1',200),(322168,NULL,1,104,1,'刘邦',1,'2000-01-01','湖南省','经济学','2021','2',200),(456789,62,1,104,3,'孙乾',1,'2000-01-01','北京市','会计学','2022','1',200),(485835,NULL,1,102,3,'周庆',1,'2000-01-01','北京市','金融学','2022','1',200),(798161,NULL,1,103,5,'陈斌',1,'2000-01-01','天津市','金融学','2022','2',200);
/*!40000 ALTER TABLE `omega_students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `omega_table`
--

DROP TABLE IF EXISTS `omega_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `omega_table` (
  `sequence` int NOT NULL AUTO_INCREMENT,
  `name` char(80) DEFAULT NULL,
  PRIMARY KEY (`sequence`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `omega_table`
--

LOCK TABLES `omega_table` WRITE;
/*!40000 ALTER TABLE `omega_table` DISABLE KEYS */;
INSERT INTO `omega_table` VALUES (1,'omega_menu'),(2,'omega_role'),(3,'omega_room'),(4,'omega_students'),(5,'omega_table'),(6,'omega_tower'),(7,'omega_users'),(8,'omega_ferry');
/*!40000 ALTER TABLE `omega_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `omega_tower`
--

DROP TABLE IF EXISTS `omega_tower`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `omega_tower` (
  `tid` int NOT NULL AUTO_INCREMENT,
  `tname` char(255) DEFAULT NULL,
  `tgender` int DEFAULT NULL,
  `ceiling` int DEFAULT '3',
  `tcode` char(255) DEFAULT NULL,
  `status` int DEFAULT '501',
  PRIMARY KEY (`tid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `omega_tower`
--

LOCK TABLES `omega_tower` WRITE;
/*!40000 ALTER TABLE `omega_tower` DISABLE KEYS */;
INSERT INTO `omega_tower` VALUES (0,'',NULL,NULL,'super',NULL),(1,'丰海苑',1,11,'0732',500),(4,'临沭阁',NULL,3,'dk32',501),(5,'星见居',0,5,'dk27',501);
/*!40000 ALTER TABLE `omega_tower` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `omega_users`
--

DROP TABLE IF EXISTS `omega_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `omega_users` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `role` int DEFAULT '0',
  `username` char(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `password` char(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `user_pic` char(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `telephone` char(11) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `omega_users`
--

LOCK TABLES `omega_users` WRITE;
/*!40000 ALTER TABLE `omega_users` DISABLE KEYS */;
INSERT INTO `omega_users` VALUES (1,2,'admin','$2a$10$0GKMUPuHOe50f.XHmbsC1OvSXl9B1BLzCm.8hZ.91xXETXtsv71yS','lADPJxRxWZDJRbPNA67NAuQ_740_942.jpg_720x720q90g.jpg','12345678910'),(47,1,'user','$2a$10$U8o0baNWA/SsmidIJBr4lu5Wevrs3ZvVkvQvaZylD4ht5G9SYtDMm','å±å¹æªå¾ 2023-06-05 150047.png','12345678970'),(48,1,'user3','$2a$10$jU7aUYcaAIXKur7rSUTXD.PMfOQ3U4esYR6WBLahd8UC7yPGyDtxm',NULL,'13587722995'),(49,1,'user2','$2a$10$FxO15beV7V59cit8rpTMkOJTOvcqHW7uOm3l74SzfPyebanl/Ks9O',NULL,'12345678939'),(50,1,'user6','$2a$10$lEUfkDmfeDnkaathqOiwiuYbLP6d8CbKFfvxbqeVO7CbUXHrVlWfu',NULL,'12345678910'),(51,2,'admin2','$2a$10$ffU/oTSi8GqH377X5oaPiuuMYuEf835o9.VTAixkx71FEKsa00X6y',NULL,'12345678910'),(52,1,'user7','$2a$10$vXE0rpLB2Z9kccQ8UtxjC.SMi4h4LnxSY40zXc4DPX2PQaGmWn51i',NULL,'12345678910'),(53,2,'admin3','$2a$10$dYg/1UWztyLTLYa/pfmpUO72yGkmpXEaQRQs5p7/kgsJCGBDi0.Yu',NULL,'12345678910'),(54,2,'admin4','$2a$10$EA0BHO3H59j.fpqfX1uPB.npFCalJ9krSC7xEPDPDH.wOHwwmQ/TW',NULL,'12345678910'),(55,3,'Maestro','$2a$10$yKL0RUGGChvtyuHnWtX7G.jZ2Rec1n/fpi0/pmz7JKSSNaByuBoQS',NULL,'12345678910'),(56,2,'admin7','$2a$10$wHXKDcGGgRJW.0.O4dQSMeerdgj7SS42S.27C9VzZ3a4NQPuVcEEC',NULL,'12345678910'),(58,1,'user11','$2a$10$Za26swCNt.68MwNco57QQOSLnqBwA6PZVsWd9xglh84wElweGlh7O',NULL,'12345678910'),(59,0,'user13','$2a$10$K.ebBNXsFbigIUaDq1dnFOI3t9GlFPrI31/4hVkSTcT5n.VQ99yWu',NULL,'12345678910'),(62,NULL,'user45','$2a$10$94CwS7DGDxNOaNT7JTFVRuG1halVBr5we8GpX6vaJobKhqkI6HSza',NULL,'12345678910'),(63,2,'admin27','$2a$10$reLLKJ2AYhUxy5e0PythO.UAtjbcZnyKeBFFQcOBDTDy6ySazerpe',NULL,'12345678910'),(64,NULL,'user9','$2a$10$bnp9gxcRN8snP5ze8CmQD.ncHzULdpncB6yb1eZWcZ8Wp.ODGCWpu',NULL,'12345678910'),(65,NULL,'girl','$2a$10$/svi0bjQr664Fn.1n1Q3zOh.wEM1JlsqctihJmE6RLx91zyut25JW',NULL,'12345678910'),(66,NULL,'user77','$2a$10$stfBN4aXeKAF3ZJ1mst0iegbYnrb6uNrI5BIpQk3Vgvj/sVEn4QtG',NULL,'12345678910'),(67,NULL,'user111','$2a$10$2jjgzYO.lt39GBCPQUFUhegWFaDEP9RqWJ/e8PqLoy15Yn.uKgLrC',NULL,'12345678910'),(69,0,'user07','$2a$10$QLibcrz2iAqArVG0rOL7J.bwCVq5k7Y/WmppJlkawhgGdExyWs01K',NULL,'12345678910');
/*!40000 ALTER TABLE `omega_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-13  8:33:55
