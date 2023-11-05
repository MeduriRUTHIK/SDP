require('dotenv').config();
import nodemailer, { Transporter } from "nodemailer";
import ejs from "ejs";
import path from "path";
import sgMail from '@sendgrid/mail';

interface EmailOptions {
    email: string;
    subject: string;
    template: string;
    data: { [key: string]: any };
};

interface sendgridMessage {
    from: any;
    to: string;
    subject: string;
    html: string;
};


const sendMail = async (options: EmailOptions): Promise<void> => {
    //nodemailer transporter
    // const transporter: Transporter = nodemailer.createTransport({
    //     host:process.env.SMTP_HOST,
    //     port: parseInt(process.env.SMTP_PORT || '587'), 
    //     service:process.env.SMTP_SERVICE,
    //     auth:{
    //         user:process.env.SMTP_MAIL,
    //         pass:process.env.SMTP_PASSWORD,
    //     },
    // });

    // adding sendgrid's api key
    if (process.env.SENDGRID_API_KEY) {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    }

    // destructure the prop
    const { email, subject, template, data } = options;

    // get the path to the email template file
    const templatePath = path.join(__dirname, "../mails", template);

    // Render the email template with EJS
    const html: string = await ejs.renderFile(templatePath, data);

    // mail option for nodemailer
    // const mailOptions = {
    //     from:process.env.SMTP_MAIL,
    //     to:email,
    //     subject,
    //     html
    // };

    // mail option from sendgrid
    const message: sendgridMessage = {
        from: {
            name: process.env.SENDGRID_OWNER,
            email: process.env.SENDGRID_EMAIL,
        },
        to: email,
        subject,
        html
    };

    // send mail through nodemailer
    // await transporter.sendMail(mailOptions);

    // send mail through sendgrid
    await sgMail.send(message)
};

export default sendMail;