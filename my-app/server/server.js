const express = require('express')
const bodyParser = require("body-parser");
const path = require('path')
const app = express()
const router = express.Router();

var lock = false;


app.use(express.static(path.join(__dirname, 'build')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", router);


const fs = require('fs');

var nodemailer = require('nodemailer');
var bcrypt = require('bcryptjs');


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'fhemfhem55@gmail.com',
    pass: 'Fhem55##'
  }
});

var mailOptions = {
  from: 'fhemfhem55@gmail.com',
  to: 'fhemfhem55@gmail.com',
  subject: 'Tjebbatjona',
  text: 'Ditt lösenord är: ',
};

function formatDate(number) {
        if (number < 10) {
          number = "0" + number;
        }
        return number;
}

//Saves sent schedule data for specified location
router.post('/save',(req, res) => {
    var jsonData = req.body;
    var empty = [];
    var data = JSON.stringify(empty);
    var location = jsonData[1].Location;
    var currentFile = JSON.parse(fs.readFileSync('./data/' + location + '.json'));
    if(jsonData[0].iterations !== currentFile[0].iterations){
        for(var i = 0; i < currentFile.length; i++){
            if(jsonData[jsonData.length - 1].StartTime === currentFile[i].StartTime){
                var response = [{response: "Failure"}];
                return res.send(JSON.stringify(response));
            }
        }
        currentFile.push(jsonData[jsonData.length - 1]);
        jsonData = currentFile;
        data = JSON.stringify((jsonData));
    }
    else if (jsonData[1].Subject != null) {
        jsonData[0].iterations += 1;
        data = JSON.stringify(jsonData);
    }
    fs.writeFileSync('./data/' + location + '.json', data);
    console.log("Saving data for " + location);
    var response = [{response: "Datan har sparats"}];
    return res.send(JSON.stringify(response));
});
router.post('/delete',(req, res) => {
    var data = req.body;
    var location = data[0].Location;
    var jsonData = JSON.parse(fs.readFileSync('./data/'+location+'.json'));
    jsonData.forEach((element) => {
        if(element.StartTime === data[0].StartTime){
            jsonData.splice(jsonData.indexOf(element),1);
        }
    })

    jsonData[0].iterations++;
    fs.writeFileSync('./data/'+location+'.json', JSON.stringify(jsonData));
    console.log("Deleting for " + location);
    res.send("Datan har sparats");
});
//Sends saved schedule data for specified location to client
router.post('/getSavedData',(req, res) => {

    var data = req.body;
    var location = data[0].Location;
    var path = './data/'+location+'.json';
    if(!fs.existsSync(path)){
        fs.writeFileSync(path, "[{\"iterations\":1}]");
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
//data is whats received from input, jsonData cycles through all users. sentData is the accepted user that is
//sent back to LogInPage. 
router.post('/logInUser', (req, res) => {
        var data = req.body;
        var jsonData = JSON.parse(fs.readFileSync('./users/UsersData.json'));
        for(var i = 0; i < jsonData.length; i++){
        
        /*compares the username to the given username and also checks
        the given password to the encrypted password*/
            if(jsonData[i].Username === data[0].Username && bcrypt.compareSync(data[0].Password,jsonData[i].Password)){
                console.log("Sending user data for logged in user");
                var sentData = jsonData[i];
                return res.send(sentData);
            }
        }
        console.log("No such username and password combination");
        var emptyData = [{Id: null}];
        return res.send(emptyData);
});

router.post('/editProfile', (req, res) => {
        var data = req.body;
        var jsonData = JSON.parse(fs.readFileSync('./users/UsersData.json'));
            for (var i = 0 ; i < jsonData.length ; i++) {
                    if (jsonData[i].Username === data.Username && bcrypt.compareSync(data.oldPassword,jsonData[i].Password)) {
                            if(data.newPassword !== undefined){
                                jsonData[i].Password = bcrypt.hashSync(data.newPassword, 10);
                            }
                            if(data.Mail !== null){
                                jsonData[i].Mail = data.Mail;
                            }
                            fs.writeFileSync('./users/UsersData.json', JSON.stringify(jsonData));
                            return res.send({response: "Användardetaljer är ändrade"});
                    }
            }
        return res.send({response: "Fel lösenord"});
});

router.post('/addUser', (req, res) => {
        var data = req.body;
        var jsonData = JSON.parse(fs.readFileSync('./users/UsersData.json'));
        var check = true;
        jsonData.forEach((user) => {
            if(data.Username === user.Username){
                check = false;
                var response = { response: "Användarnamnet är redan taget"};
                return res.send(JSON.stringify(response));
            }
        });
        if(check == true){
            jsonData.push(data);
                    fs.writeFileSync('./users/UsersData.json', JSON.stringify(jsonData));
                    console.log("Added user " + data.Username);
                    var response = { response: "Användare tillagd"};
                    return res.send(JSON.stringify(response));
        }

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
        return res.send("Användare tillagd");
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
        return res.send("Plats är sparad");
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
        return res.send("Plats har raderats");
});

/*
First it checks that the given mailadress has a corresponding mailadress in the database.
If so it sends a mail to the adress with a new password and also encrypts and saves the hash in the database
        - The mail contains a random code with 6 digits that is the new password.
        - The user is alerted that a mail has been sent.
If it does not exist it simply alerts the user.
*/
router.post('/getUsersMail', (req, res) => {
        var adress = req.body;
        var jsonData = JSON.parse(fs.readFileSync('./users/UsersData.json'));
        for(var i = 0; i < jsonData.length; i++){
                if (jsonData[i].Mail === adress.Mail){
                        console.log("email has been sent")
                        
                        var tempPassword;

                        tempPassword = "" + (Math.floor(Math.random() * 900000) + 100000);
                        var today = new Date();
                        var date = today.getFullYear()+'-'+(formatDate(today.getMonth()+1))+'-'+formatDate(today.getDate())
                        +' '+ formatDate(today.getHours()) + ":" + formatDate(today.getMinutes());
                        mailOptions.subject = "New password: " + date;
                        mailOptions.to = adress.Mail;
                        mailOptions.text = tempPassword;
                        transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                console.log(error);
                                } else {
                                console.log('Email sent: ' + info.response);
                                }
                        });
                        var encryptedPassword = bcrypt.hashSync(tempPassword,10);
                        jsonData[i].Password = encryptedPassword;
                        fs.writeFileSync('./users/UsersData.json', JSON.stringify(jsonData));
                        var dataAcc = JSON.stringify({Response: "Mail has been sent"});
                        return res.send(dataAcc);
                }
        }
        console.log("Email not found")
        var dataDec = JSON.stringify({Response: "Email not found"});
        return res.send(dataDec);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(process.env.PORT || 8080);

