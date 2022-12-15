import * as CryptoJS from 'crypto-js'
import * as nodemailer from 'nodemailer';
export default class EmailM{
    //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
    
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
   
        
    }
    public static async approvalFormMail(mail:string){
        

    }
    public static async courseInvestigateMailtoCoor(mail:string,syllabus:string,website: string){
       
    }

    /* public static async courseInvestigateMailtoInstructor(mail:string,syllabus:string,website: string){
        let body =   {
            "personalizations": [
                {
                    "to": [
                        {
                            "email": mail,
                        }
                    ],
                    "subject": "Login info as Erasmouser "
                }
            ],
            "from": {
                "email": "erasmouse11@gmail.com"
            },
            "content": [
                {
                    "type": "text/plain",
                    "value": "A Students wants you to check non-approved course\n syllabus: "+syllabus
                    +"\n website: "+website ,
                }
            ]
        };
        await fetch(this.url, this.options);
    } */

    

}