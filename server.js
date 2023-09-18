import EmailValidator from 'email-deep-validator'
import express from 'express';
import permute from 'email-permutator'

const app = express();
const emailValidator = new EmailValidator();
app.listen(80)

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
    const startTime = Date.now();
    {
        const {validMailbox } = await emailValidator.verify("ewewdwsekjhweuib222334343@"+req.query.domain);
        if(validMailbox===true){
            return(res.send({"catchall":true}))
        }
    }
    const elist = permute({    
        firstName:req.query.firstName,
        lastName:req.query.lastName,
        nickName:'',
        middleName:'',
        domain1:req.query.domain,
        domain2:'',
        domain3:'',
      });
    const list = []
    const promises = elist.map(async (email) => {
        const {validMailbox } = await emailValidator.verify(email);
        if(validMailbox===true){
            list.push(email)
        }
    });
    await Promise.all(promises)
    res.send({'data':list,"catchall":false})
    const endTime = Date.now(); // Record the end time
    const elapsedTime = endTime - startTime; // Calculate elapsed time
    console.log(`Time taken: ${elapsedTime}ms`);
})