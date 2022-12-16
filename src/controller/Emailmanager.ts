import * as CryptoJS from 'crypto-js'
import * as nodemailer from 'nodemailer';
export default class EmailM{
    
    
    static transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'erosmouser22@gmail.com',
            pass: 'msxdqmngqvhywaqz',
        },
    });
      
    public static async sendLoginMail(mail: string,id: number){
        let password1 = CryptoJS.MD5(id.toString());
        let mail_options = {
            from: 'erosmouser22@gmail.com',
            to: mail,
            subject: 'Login to Erasmouse',
            text: 'Your Id: ' + id + "\nYour password "+ password1,
        }
        this.transporter.sendMail(mail_options).catch(err => console.log(err));

    }

    public static async approvalStatusMail(mail:string ){
       
        let mail_options = {
            from: 'erosmouser22@gmail.com',
            to: mail,
            subject: 'Pre-approval Form',
            text: 'Your coordinator controlled your pre-approval form',
        }
        this.transporter.sendMail(mail_options).catch(err => console.log(err));
        
    }
    public static async approvalFormMail(mail:string){
        let mail_options = {
            from: 'erosmouser22@gmail.com',
            to: mail,
            subject: 'Pre-approval Form',
            text: 'Student filled pre-approval form and sent you.',
        }
        this.transporter.sendMail(mail_options).catch(err => console.log(err));

    }
    public static async courseInvestigateMailtoCoor(mail:string,coursecode: string,syllabus:string,website: string){
        let mail_options = {
            from: 'erosmouser22@gmail.com',
            to: mail,
            subject: 'Non-approved Course Request',
            text: 'Student wants you to check the course to approve it \n' +
            "Course Code: " + coursecode +  
            "\n Syllabus: " + syllabus+ "\n Website"+website,
        }
        this.transporter.sendMail(mail_options).catch(err => console.log(err));
    }

    

    

}