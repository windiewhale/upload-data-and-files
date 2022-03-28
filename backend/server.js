const { json } = require("body-parser");
const express = require("express");
const fileUpload = require("express-fileupload");
const { fstat } = require("fs");
const path = require("path");
const app = express(); 

function getFunction(request, response){
    response.sendFile(path.join(`${__dirname}/../frontend/index.html`));
}

app.use(fileUpload());
app.get("/", getFunction);
app.use("/upload", express.static(`${__dirname}/../frontend/upload`));
app.use("/pub", express.static(`${__dirname}/../frontend/public`));

const uploads = path.join(`${__dirname}/../frontend/upload/`)
app.post("/", (req, res) => {
    
    //upload img
    const picture = req.files.picture;
    if (picture){
        console.dir(picture)
        picture.mv(uploads + "profile.jpg")  
    } 
    res.send("ohh yeah")
 /* 
    //upload data 
    const formData = req.body;
    formData.image_name = picture.name
    jsonData.push(formData);

   fs.writeFile(`${dataLocation}data.json`, JSON.stringify(jsonData), (error) => {
        if (error) {
            console.log(error);
        }
    }) */
})




/* app.post("/", function(req, res) {  //itt stimmelni kell a az enpointnak a script.js fetchnél megadottal
    let sampleFile;
    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    sampleFile = req.files.picture;
    uploadPath = __dirname + '../frontend/upload' + picure.name;

    sampleFile.mv(uploadPath, function(err) {
        if (err)
          return res.status(500).send(err);
    
        res.send('File uploaded!');
      });
}); */

const port = 9000;
const ipAddress = `http://127.0.0.1:${port}`;
app.listen(port, () => {
    console.log(ipAddress)
});
