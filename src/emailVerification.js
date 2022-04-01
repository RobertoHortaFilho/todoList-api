const nodemailer = require('nodemailer');

const mail = function(){
    const user = process.env.EMAIL_USER
    const password = process.env.EMAIL_PASSWORD


    function createTransporter(){
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: user,
                pass : password,
            }
        })
        return transporter;
    }

    function createBody(email, hash, fullUrl){
        const url = fullUrl + '/users/verify/' + hash 
        const mailOptions = {
                from: user,
                to: email,
                subject: 'verifique o email (ToDo List)',
                text: `clique aqui link com o hash mt foda ${url}`
        }
        return mailOptions;
    }

    function send(mail,hash, fullUrl){
        const email = createTransporter();
        const mailOptions = createBody(mail,hash, fullUrl)
        email.sendMail(mailOptions, (error, info) =>{
            if (error){
                console.log(error)
            }else{
                console.log('email enviado')
            }
        })
    }



    return {
        send
    }
}



module.exports = mail()