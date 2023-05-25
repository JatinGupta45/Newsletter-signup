const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");


const app= express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){

  const firstName=req.body.fname;
  const lastName=req.body.lname;
  const email=req.body.email;

  const data ={
    members:[
      {
        email_address: email,
        status:"subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

    const url="https://us13.api.mailchimp.com/3.0/lists/81d4c26c70"

  const option={
    method: "POST",
    auth: "zraku:g23669db2f1d98f0682ad20bff8b54a06-us13"
  }
  const request= https.request(url,option,function(response){
    response.on("data", function(data){
      if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
      }else{
        res.sendFile(__dirname + "/failure.html");
      }
      console.log(JSON.parse(data));
    })

  })
  request.write(jsonData);
  request.end();
})
app.listen(3000,function(){
  console.log("server up and ported at 3000");
});


app.post("/failure",function(req, res){
  res.redirect("/");
})
//api key
//
//23669db2f1d98f0682ad20bff8b54a06-us13


//unique id
//81d4c26c70

//https://<dc>.api.mailchimp.com/3.0/lists/81d4c26c70
