import EmailValidator from 'email-deep-validator'
import express from 'express';

const app = express();
const emailValidator = new EmailValidator();
app.listen(5000)

app.get('/', async (req,res)=>{
    const elist = req.query.emails.split(',');
    const list = [];
    for(const email of elist){
        const {wellFormed, validDomain, validMailbox } = await emailValidator.verify(email);
        if(validMailbox===true){
            list.append("true")
        }
        else{
            list.append("false")
        }
    }
    res.send({"valid":list});
});
