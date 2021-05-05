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

//Saves sent schedule data for specified location
router.post('/save',(req, res) => {
    var jsonData = req.body;
    var location = jsonData[0].Location;
    let data = JSON.stringify(jsonData);
    fs.writeFileSync('./data/'+location+'.json', data);
    console.log("Saving data for " + location);
    res.send("Data has been saved");
});
//Sends saved schedule data for specified location to client
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
router.post('/getAllSavedData',(req, res) => {

        var returndata = [];
        fs.readdirSync('./data/').forEach(file => {
           var jsonData = JSON.parse(fs.readFileSync('./data/' + file));
           for(var i = 0; i < jsonData.length; i++){
                returndata.push(jsonData[i])
           }
        });
        console.log("Sending all saved booking data");
        res.send(returndata);
});
//Sends schedule data for specified owner for all locations to client
router.post('/getMyBookings', (req, res) => {
    var data = req.body;
    var returndata = [];
    fs.readdirSync('./data/').forEach(file => {
       var jsonData = JSON.parse(fs.readFileSync('./data/' + file));
       for(var i = 0; i < jsonData.length; i++){
            if(jsonData[i].Owner === data[0].Owner){
                returndata.push(jsonData[i]);
            }
       }
    });
    console.log("Sending my booking data for " + data[0].Owner+"...");
    res.send(returndata);
});
//Checks login details and then if successful returns data of user
router.post('/logInUser', (req, res) => {
        var data = req.body;
        var jsonData = JSON.parse(fs.readFileSync('./users/UsersData.json'));
        for(var i = 0; i < jsonData.length; i++){
            if(jsonData[i].Username == data[0].Username && jsonData[i].Password == data[0].Password){
                console.log("Sending user data for logged in user");
                var data = jsonData[i];
                return res.send(data);
            }
        }
        console.log("No such username and password combination");
        var emptyData = [{Id: null}];
        return res.send(emptyData);
});
router.post('/addUser', (req, res) => {
        var data = req.body;
        var jsonData = JSON.parse(fs.readFileSync('./users/UsersData.json'));
        jsonData.push(data);
        fs.writeFileSync('./users/UsersData.json', JSON.stringify(jsonData));
        console.log("Added user " + data.Username);
        return res.send("Added user Successfully");
});
router.post('/removeUser', (req, res) => {
        var data = req.body;
        var jsonData = JSON.parse(fs.readFileSync('./users/UsersData.json'));
        var indexOfUserToRemove = jsonData.findIndex(item => item.Username === data.Username);
        if(indexOfUserToRemove > -1){
             jsonData.splice(indexOfUserToRemove, 1);
        }
        fs.writeFileSync('./users/UsersData.json', JSON.stringify(jsonData));
        console.log("Removed user " + data.Username);
        return res.send("Added user Successfully");
});
router.post('/getAllUsers', (req, res) => {
        var jsonData = JSON.parse(fs.readFileSync('./users/UsersData.json'));
        console.log("Returning all users");
        return res.send(jsonData);
});
router.post('/getLocations', (req, res) => {
        var jsonData = JSON.parse(fs.readFileSync('./locations/locations.json'));
        console.log("Returning all locations");
        return res.send(jsonData);
});
router.post('/addLocation', (req, res) => {
        var newLocation = req.body;
        var jsonData = JSON.parse(fs.readFileSync('./locations/locations.json'));
        jsonData.features.push(newLocation);
        fs.writeFileSync('./locations/locations.json', JSON.stringify(jsonData));
        console.log("Saved new location to map");
        return res.send("Location has been saved");
});
router.post('/removeLocation', (req, res) => {
        var locationData = req.body;
        var jsonData = JSON.parse(fs.readFileSync('./locations/locations.json'));
        var indexOfLocationToRemove = jsonData.features.findIndex(item => item.properties.NAME === locationData.name);
        if(indexOfLocationToRemove > -1){
             jsonData.features.splice(indexOfLocationToRemove, 1);
        }
        fs.writeFileSync('./locations/locations.json', JSON.stringify(jsonData));
        console.log("Removed location of map");
        return res.send("Location has been removed");
});
router.post('/getUsersMail', (req, res) => {
        var adress = req.body;
        var jsonData = JSON.parse(fs.readFileSync('./users/UsersData.json'));
        for(var i = 0; i < jsonData.length; i++){
                if (jsonData[i].Mail === adress.Mail){
                        console.log("email has been sent")

                        return res.send("Mail has been sent");
                }
        }
        console.log("Email not found")
        return res.send("Email not found");
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(8080)