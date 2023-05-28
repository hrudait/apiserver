import EmailValidator from 'email-deep-validator'
import express from 'express';

const app = express();
const emailValidator = new EmailValidator();
app.listen(5000)

app.get('/', async (req,res)=>{
    
    const { wellFormed, validDomain, validMailbox } = await validate("hrudai@hrudai.com")
    console.log(wellFormed);
    console.log(validDomain);
    console.log(validMailbox);
    res.send("all good mate")
});
async function validate(e){
    return (await emailValidator.verify('foo@hrudai.com'));
}
