/*
Navicat MySQL Data Transfer

Source Server         : HXM
Source Server Version : 50639
Source Host           : 45.76.169.253:3306
Source Database       : esub

Target Server Type    : MYSQL
Target Server Version : 50639
File Encoding         : 65001

Date: 2018-05-08 15:16:45
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `account` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL COMMENT 'ONLY LOW_CASE FORMAT',
  `password_for_developer` varchar(255) DEFAULT NULL,
  `pwd_strength` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `mail` varchar(50) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `birthday_year` varchar(255) DEFAULT NULL,
  `birthday_month` varchar(255) DEFAULT NULL,
  `blood` varchar(255) DEFAULT NULL,
  `identitycode` varchar(8) DEFAULT NULL,
  `identitytime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `identity` int(1) DEFAULT '0',
  PRIMARY KEY (`account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `account` VALUES ('233', '606546e00ffb0c16a4b090e62e4a6f4f7017a7d2e2914e13af6ed8d4cd7de6e62c22403f3b505e49eede4cb82419652d664433513e60be0eeed7a28aef778f4b', 'jiangzemin!@#$%^&*()', 'VERY_STRONG', null, null, 'system_default.jpg', null, null, null, null, null, '2018-05-07 13:48:36', '0');
INSERT INTO `account` VALUES ('ajaxxxxx', '4edf576eec06b85610e6c2c4baa7a73232560030a3038c5e261edcd768c1a4724ff7d71c61934bb255701763b8bd8ac630fa7b2e7e6f220aad229c0b9d91cc59', '8899', 'VERY_WEAK', null, null, 'system_default.jpg', null, null, null, null, null, '2018-05-07 13:59:54', '0');
INSERT INTO `account` VALUES ('dog', '123', '123', null, null, null, null, null, null, null, null, null, '2018-05-08 06:43:03', '0');
INSERT INTO `account` VALUES ('esubmaster', '18702e11cb20f391e6b64d22441c029cab4bfe121818f545b879d25bfdccebec298d2e92e0d3845b85b0a64231cd724c10b4d68d47ceb0172cf313c48377ee6e', 'notch!@#', 'VERY_WEAK', null, null, 'system_default.jpg', null, null, null, null, null, '2018-05-07 13:59:54', '0');
INSERT INTO `account` VALUES ('hachen', 'b5120d047dc479e9553a6eef111d54959b286474e4a57285f1935f30544fcca54d4c98b3465d398ed643676562ba479c92a881e02201f7d132fffc29335d3238', '#Ly?ah3vJVWrg9K78%', 'VERY_STRONG', null, null, 'system_default.jpg', null, null, null, null, null, '2018-05-07 13:59:27', '0');
INSERT INTO `account` VALUES ('haha', '379de067952ca211177e8f73188e7bb5bdeb157b5fd953ac643328392ea9a41af778b987928fcc8e71d08e404616c235027cde7ca971bb59efc2e1f0f041cb3e', '64', 'VERY_WEAK', null, null, 'system_default.jpg', null, null, null, null, null, '2018-05-07 13:59:25', '0');
INSERT INTO `account` VALUES ('huanqiushibao', 'c71c4133eeceae5682c807136f5a5636072cecef27f3036069cb07fb5dba373101bc4918811d111af1c18d19c05dc8533720b71cc5b6dfeecadefbfde47f6be0', '864', 'VERY_WEAK', '65165106', 'huanqiu@huxijinpin.com', 'system_default.jpg', null, null, null, null, null, '2018-05-07 13:28:29', '0');
INSERT INTO `account` VALUES ('ielts', '322e34c2918f4a6f6e31b16a9b876ac7c150e2f1b19ff8f90aee2c0a3d9a57e26e2871336fc66f12a04e9c54576f338952cd63500a53053c7c8c751240f8bcf3', '233', 'VERY_WEAK', null, null, 'system_default.jpg', null, null, null, null, null, '2018-05-07 13:59:54', '0');
INSERT INTO `account` VALUES ('jibai', 'd083d56745445bc013f0f9cdb5421e98f05dc5fcb5a533fbd2060c6df6833f67d33731c9ca587dc775fdda61274e175a092a6ba13a2b4d7b3260c88cea3b8459', 'jibai', 'VERY_WEAK', null, null, 'system_default.jpg', null, null, null, null, null, '2018-05-07 13:59:54', '0');
INSERT INTO `account` VALUES ('liangyuhang', '02a912f7f86cce0d9c813c135b8b4eeef72145ac16c1f08832e3cb125237122402c30de30be42c6c45d8798bfed34768d15ce9ed10124193ba4b3bf759d555c5', '1000', 'VERY_WEAK', '6516510651', 'ningbing@xi.com', 'system_default.jpg', 'woman', '2014', '05', 'AB', null, '2018-05-07 13:59:54', '0');
INSERT INTO `account` VALUES ('luoyuchen', 'd5362b2aa648dce8f2474ed94a4797a5b97445270c1c67fe380707ce110d08e4baf92b3b27d0b2884677e1246ef4689a103917b192d165a6e8fb781a4f8606a5', '123456', 'VERY_WEAK', '', null, 'system_default.jpg', 'null', '2018', '05', '未知', null, '2018-05-07 13:59:54', '0');
INSERT INTO `account` VALUES ('lyc', '4f84c95f6ccc5b7c0abcc2ceaf389cf11f2258baba7542ecddff97f1cb79176adf83ae8413c9ab64390f4c9ee4f5ca8af7c0c9edac21d812c96c0eea7df037cc', 'look566', 'WEAK', null, null, 'system_default.jpg', null, null, null, null, null, '2018-05-07 13:59:54', '0');
INSERT INTO `account` VALUES ('niu', '6652961d65d98e6aad28dfbb44cf73806dfd9ef3c8055c2ce267bb87e0e8d34ea25f8c8cd1fc8927b4d35f4e21b273b7ce8b248b16c694e8263f1295c3ef3cb1', '123', 'VERY_WEAK', null, null, 'system_default.jpg', null, null, null, null, null, '2018-05-07 13:59:54', '0');
INSERT INTO `account` VALUES ('niubi', 'f6a0f57c195e3c1af17ae9a04cf89c65b9ba66b81f6d33e55c6ae902b6cec7820550a0669f0ab941ecca6bc83537595bbf67fde09bf23ac39c4d23eaff7889e3', '888', 'VERY_WEAK', '651651651', 'jiang@ze.com', 'system_default.jpg', 'woman', '2013', '05', 'O', null, '2018-05-08 05:28:45', '0');
INSERT INTO `account` VALUES ('ping', 'b4fd5d7d64616b4eb3cfdd4b51ee8f986a25c69c61edc78f626a2310d93958da1fa183a0cbf6754b79b8e79d784bf92e9bb77046fe91f8c693e3f1d4719f2925', 'Google8888', 'REASONABLE', null, null, 'system_default.jpg', null, null, null, null, null, '2018-05-07 13:28:29', '0');
INSERT INTO `account` VALUES ('power', '6dd63b2784ed8704e7dc60d8837e7db550ea741b2770f42468fed6505309ef229343c1264ea9e8613f0de91d88b3b68aaa68c0b7c490d25db747e960382fd711', 'power', 'VERY_WEAK', null, null, 'system_default.jpg', null, null, null, null, null, '2018-05-07 13:59:54', '0');
INSERT INTO `account` VALUES ('putin', '78faa9add89c7267678a95841595f909e8346e57e2fb78456c55d947816457c4465f6e6c753b1eb4e45143c469d3560941c6624d1ef8380e07262031b5c414ac', 'niubi', 'VERY_WEAK', null, null, 'system_default.jpg', null, null, null, null, null, '2018-05-07 13:28:29', '0');
INSERT INTO `account` VALUES ('qwe', '16002bde0d6dcf56b944580e872b74956b0ddd3de38774c08e6ce0285ca18fb87d173183d2189e4a78406a5644f4f5117f54e3de3b3520aa9dd6aac058072080', 'qwe', 'VERY_WEAK', null, null, 'system_default.jpg', null, null, null, null, null, '2018-05-07 13:59:54', '0');
INSERT INTO `account` VALUES ('xi', 'de2aee949524cb846057c5418f4f2b2f3d5ae8c389b647ed614944dd5aa337fcc3e15d713b9410dee71e0c4111e40d802553c76f2af63b2d0812a962a0db7154', 'diaodiaodiao', 'REASONABLE', null, null, 'system_default.jpg', null, null, null, null, null, '2018-05-07 13:28:29', '0');

-- ----------------------------
-- Table structure for ecode
-- ----------------------------
DROP TABLE IF EXISTS `ecode`;
CREATE TABLE `ecode` (
  `email` varchar(50) DEFAULT NULL,
  `code` varchar(10) DEFAULT NULL,
  `alived` tinyint(1) DEFAULT NULL,
  `time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of ecode
-- ----------------------------

-- ----------------------------
-- Table structure for personal
-- ----------------------------
DROP TABLE IF EXISTS `personal`;
CREATE TABLE `personal` (
  `account` varchar(255) NOT NULL,
  `remain_money` varchar(255) DEFAULT NULL,
  `paid_subtitle` varchar(1000) DEFAULT NULL COMMENT 'record subtitles'' IDs which the user already bought.\r\nformat:\r\nsubtitle01+salt+subtitle02+salt.......',
  `premium` int(2) NOT NULL COMMENT 'Have you paid enough?',
  `premium_uptodate` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `sell_subtitle` varchar(1000) DEFAULT NULL COMMENT 'subtitles the user selling.\r\nformat:\r\nsubtitle01+salt+subtitle02+salt.....',
  PRIMARY KEY (`account`),
  CONSTRAINT `account` FOREIGN KEY (`account`) REFERENCES `account` (`account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of personal
-- ----------------------------
INSERT INTO `personal` VALUES ('niubi', '1000$', null, '1', null, null);

-- ----------------------------
-- Table structure for subtitle
-- ----------------------------
DROP TABLE IF EXISTS `subtitle`;
CREATE TABLE `subtitle` (
  `subtitle_ID` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `video_ID` int(10) DEFAULT NULL,
  `publisher` varchar(255) DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL,
  `languate` varchar(100) DEFAULT NULL,
  `rank` float(2,0) DEFAULT NULL COMMENT 'you can rank the subtitle after bought it.\r\nlike DouBan rank\r\n1~10 ranks,ony interger,the total result can be float.',
  `instruction` varchar(500) DEFAULT NULL,
  `price` varchar(50) NOT NULL,
  `path` varchar(255) NOT NULL,
  `download_count` int(5) DEFAULT NULL,
  PRIMARY KEY (`subtitle_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of subtitle
-- ----------------------------

-- ----------------------------
-- Table structure for video
-- ----------------------------
DROP TABLE IF EXISTS `video`;
CREATE TABLE `video` (
  `vid` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  `vname` varchar(50) NOT NULL,
  `address` varchar(200) NOT NULL,
  `indentity` int(11) DEFAULT NULL,
  `language` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`vid`),
  KEY `abc` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of video
-- ----------------------------
