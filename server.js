import EmailValidator from 'email-deep-validator'
import express from 'express';
import permute from 'email-permutator'
import google from 'googlethis';

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
const options = {
    page: 0, 
    safe: false, // Safe Search
    parse_ads: false, // If set to true sponsored results will be parsed
    additional_params: { 
      // add additional parameters here, see https://moz.com/blog/the-ultimate-guide-to-the-google-search-parameters and https://www.seoquake.com/blog/google-search-param/
      hl: 'en' 
    }
  }
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
    let promises = elist.map(async (email) => {
        const {validMailbox } = await emailValidator.verify(email);
        if(validMailbox===true){
            list.push(email)
        }
    });
    await Promise.all(promises)
    promises = list.map(async(email)=>{
        const response = await google.search('"'+email+'"', options);
        const temp = []
        temp.push(email)
        for (let i = 0; i < response.results.length; i++) {
            temp.push(response.results[i].url);
        }
        return temp;
    })
    console.log(await Promise.all(promises))
    res.send({'data':list,"catchall":false})
    const endTime = Date.now(); // Record the end time
    const elapsedTime = endTime - startTime; // Calculate elapsed time
    console.log(`Time taken: ${elapsedTime}ms`);
})