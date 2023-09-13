import EmailValidator from 'email-deep-validator'
import express from 'express';
import permute from 'email-permutator'

const app = express();
const emailValidator = new EmailValidator();
app.listen(5000)

app.get('/', async (req,res)=>{
    const elist = req.query.emails.split(',');
    const list = [];
    for(const email of elist){
        const {wellFormed, validDomain, validMailbox } = await emailValidator.verify(email);
        if(validMailbox===true){
            list.push("true")
        }
        else{
            list.push("false")
        }
    }
    res.send({"valid":list});
});

app.get('/finder', async(req,res)=>{
    const firstName = req.query.firstName;
    const lastName = req.query.lastName;
    const domain = req.query.domain;
    const elist = permute({    
        firstName:firstName,
        lastName:lastName,
        nickName:'',
        middleName:'',
        domain1:domain,
        domain2:'',
        domain3:'',
      });
    const list = []
    for(const email of elist){
        const {wellFormed, validDomain, validMailbox } = await emailValidator.verify(email);
        if(validMailbox===true){
            list.push(email)
        }
    }
    return({data:list})
})