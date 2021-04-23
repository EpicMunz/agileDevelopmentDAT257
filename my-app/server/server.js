const express = require('express')
const bodyParser = require("body-parser");
const path = require('path')
const app = express()
const router = express.Router();
const cors = require('cors');

app.use(express.static(path.join(__dirname, 'build')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", router);
app.use(cors())

const fs = require('fs');

router.post('/save',(req, res) => {
    var jsonData = req.body;
    var location = jsonData[0].Location;
    let data = JSON.stringify(jsonData);
    fs.writeFileSync('./data/'+location+'.json', data);
    res.send("Data has been saved");
});
router.post('/getSavedData',(req, res) => {

    var data = req.body;
    var location = data[0].Location;
    var path = './data/'+location+'.json';
    if(!fs.existsSync(path)){
        fs.writeFileSync(path, "[]");
    }
    var jsonData = fs.readFileSync(path);
    console.log("Sending scheduledata for "+location+"...");
    res.send(jsonData);
});
router.post('/getMyBookings', (req, res) => {
    var data = req.body;
    var returndata = [];
    fs.readdirSync('./data/').forEach(file => {
       var jsonData = JSON.parse(fs.readFileSync('./data/' + file));
       for(var i = 0; i < jsonData.length; i++){
            if(jsonData[i].Owner == data[0].Owner){
                returndata.push(jsonData[i]);
            }
       }
    });
    console.log("Sending my booking data for " + data[0].Owner+"...");
    res.send(returndata);
});



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(8080)