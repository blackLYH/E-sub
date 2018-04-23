//email.js

// 引入 nodemailer
var nodemailer = require('nodemailer');

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '45.76.169.253',
    user: 'hxm',
    password: '123456',
    database: 'esub',
    rejectUnauthorized: false  // 忽略安全警告
});

// 创建一个SMTP客户端配置
var config = {
    host: 'smtp.163.com', 
    port: 25,
    auth: {
        user: '13011259265@163.com', //刚才注册的邮箱账号
        pass: 'hxm926'  //邮箱的授权码，不是注册时的密码
    }
};

// 创建一个邮件对象
var mail = {
    // 发件人
    from: 'Esub<13011259265@163.com>',
    // 主题
    subject: 'Esub 验证码',
    // 收件人
    to: '',
    // 邮件内容，HTML格式
    text: '点击激活：xxx'
};


// 创建一个SMTP客户端对象
var transporter = nodemailer.createTransport(config);

// // 发送邮件
// module.exports = function (mail){
//     transporter.sendMail(mail, function(error, info){
//         if(error) {
//             return console.log(error);
//         }
//         console.log('mail sent:', info.response);
//     });
// };

function send(mail){
    transporter.sendMail(mail, function(error, info){
        if(error) {
            return console.log(error);
        }
        console.log('mail sent:', info.response);
    });
}

module.exports.sendCode = function sendCode(email, success ,fail) {
    console.log("begin to send")
    max = 999999
    min = 100000
    code = Math.floor(Math.random() * (max - min + 1) + min) + "";
    sql = 'insert into ecode(email, code, alived) values(?,?,?)';
    sql_params = [email, code, false]
    connection.query(sql, sql_params, function (err, rows) {
        if (err) {
            console.log("数据插入失败")
            fail();
            return;
        }
        mail.to=email;
        mail.text = "验证码为"+code;
        send(mail)
        success();
    })
}

module.exports.verifyCode = function verifyCode(email, code, success, fail) {
    sql = 'select * from ecode where email=? and code=? and alived=false and time > (select adddate(now(),interval -30 minute))';
    sql_params = [email, code]
    connection.query(sql, sql_params, function (err, rows) {
        if (err) {
            console.log("查询失败")
            fail(2);
            return;
        }
        if (rows.length > 0) {
            sql = 'update ecode set alived=true where email=?'
            sql_params=[email]
            connection.query(sql,sql_params);
            success()
        } else {
            //验证码错误或已过期
            fail(1)
        }
    })
}