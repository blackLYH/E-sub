/*
用户类属性：
用户id
用户名
用户密码
用户手机
用户邮箱
验证码
验证码时间
验证码是否激活
用户头像
*/
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `account` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `pwd_strength` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `mail` varchar(50) DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `birthday_year` varchar(255) DEFAULT NULL,
  `birthday_month` varchar(255) DEFAULT NULL,
  `blood` varchar(255) DEFAULT NULL,
  `identitycode` varchar(8) DEFAULT NULL,
  `identitytime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `identity` int(1) DEFAULT '0',
  `password_for_developer` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



/*
视频id
所属用户id
视频名字
资源地址
原视频id
语言
*/
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
/*
DELIMITER $$
CREATE PROCEDURE Mypro(in idd int)
BEGIN
update user SET identity= 1 WHERE id = idd;
END;
$$
DELIMITER ;
drop event if exists e_test;
create event e_test
on schedule at date_add(now(),interval 1 minute)
on completion preserve
do call Mypro();
alter event test_event on completion preserve enable;
delimiter **
CREATE TRIGGER demo after update 
on user for each row
begin 
alter event test_event on completion preserve enable;
end;
**
delimiter ;
*/

-- ----------------------------
-- Table structure for personal
-- ----------------------------
DROP TABLE IF EXISTS `personal`;
CREATE TABLE `personal` (
  `account` varchar(255) NOT NULL,
  `remain_money` varchar(255) DEFAULT NULL,
  `payment_note` varchar(5000) DEFAULT NULL,
  `paid_subtitle` varchar(5000) DEFAULT NULL,
  `isVIP` int(11) NOT NULL,
  `uptodate` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`account`),
  CONSTRAINT `account` FOREIGN KEY (`account`) REFERENCES `account` (`account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

