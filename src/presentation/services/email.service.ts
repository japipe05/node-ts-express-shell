import nodemailer, { Transporter } from 'nodemailer';
interface SendMailOptions{
    to: string|string[];
    subject:string;
    htmlBody:string;
    attachments?:Attachment[];
}
interface Attachment{
    filename:string;
    path:string;
}


export class EmailService{
    private transporter: Transporter;
     
    constructor(
        mailerService:string,
        mailerEmail:string,
        sendEmailPassword:string,
    ){

        this.transporter= nodemailer.createTransport({
            service: mailerService,
            auth:{
                user: mailerEmail,
                pass: sendEmailPassword,
            }
        });
    }

    async sendEmail(options:SendMailOptions):Promise<boolean>{
        const {to, subject, htmlBody,attachments = [] } = options;
        try {
            const senInformation = await this.transporter.sendMail({
                to:to,
                subject:subject,
                html: htmlBody,
                attachments:attachments,
            });
          //  console.log(senInformation);
            //console.log("envio Mail");
         
            return true;
        } catch (error) {
            //console.log(error);
           
              
            return false
        }
    }
    async sendEmailWithFileSystemLogs(to:string|string[]){
        const subject = 'login register validatiosn';
        const htmlBody= `
                <h3>ogin register validatiosn Sistema Noc</h3>
                <p>Ex ea est do labore irure Lorem pariatur nostrud esse aliqua. Officia eiusmod officia duis tempor commodo do pariatur aliquip aliqua esse reprehenderit. Nostrud magna anim velit dolor ea irure laborum. Velit sint ea sint consequat et labore dolore excepteur excepteur pariatur ullamco.</p>
                <p>Ver logs</p>
            `;
        const attachments:Attachment[]=[
            {filename:'logs-all.log',path:'logs/logs-all.log'},
            {filename:'logs-high.log',path:'logs/logs-high.log'},
            {filename:'logs-medium.log',path:'logs/logs-medium.log'}
        ];

        return this.sendEmail({
            to, subject, attachments, htmlBody
        });
    }
}