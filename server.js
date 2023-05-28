import EmailValidator from 'email-deep-validator'
import express from 'express';

const app = express();
const emailValidator = new EmailValidator();
app.listen(5000)

app.get('/', async (req,res)=>{
    
    const { wellFormed, validDomain, validMailbox } = await validate("hrudai@hrudai.com")
    res.send({"wellFormed":wellFormed,"validDomain":validDomain,"validMailbox":validMailbox});
});
async function validate(e){
    return (await emailValidator.verify('foo@hrudai.com'));
}
