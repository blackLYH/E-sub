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
create table user (
id int primary key not null auto_increment,
name varchar(20) not null,
password varchar(20) not null,
phone int(11),
mail varchar(30),
identitycode varchar(8),
identitytime timestamp,
identity int(1) default 0,
image varchar(50)
);
/*
视频id
所属用户id
视频名字
资源地址
原视频id
语言
*/
create table video(
vid int primary key not null auto_increment,
userid int,
vname varchar(50) not null,
address varchar(200) not null,
indentity int,
language varchar(20)
);
alter table video add foreign key abc(userid) references user(id);
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
