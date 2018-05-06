/*
Navicat MySQL Data Transfer

Source Server         : HXM
Source Server Version : 50639
Source Host           : 45.76.169.253:3306
Source Database       : esub

Target Server Type    : MYSQL
Target Server Version : 50639
File Encoding         : 65001

Date: 2018-05-06 12:28:26
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
