
var express = require('express')

var firebase = require('./firebase')

var app = express();

var cities = firebase.getCities().then(r=>{
    return r
})
// firebase.addCity().then(response=>{
//     console.log(response)
// })

app.use(require('morgan')('combined'));

app.use(express.json()); 
app.use(express.urlencoded()); //Parse URL

app.use(express.static("public"));

app.get('/cities', function (req, res) {
    var cities = firebase.getCities().then(r=>{
        res.send(r)
    }).catch(err=>{
        console.log(err)
    })
})

app.post('/cities',function (req,res){
    firebase.getCities().then(r=>{

    const body = req.body
    if(body.name ==undefined
        ||body.latitude ==undefined
        ||body.longitude ==undefined
        ||body.usage ==undefined
        ||body.name ==''
        ||body.latitude ==''
        ||body.longitude ==''
        ||body.usage ==''){
            res.send(400)
            return
        }
    city = {name:body.name,
            latitude: body.latitude,
            longitude: body.longitude,
            usage: body.usage
            }
    const index = r ? Object.keys(r).length: 0
    firebase.addCity(index, city).then(response=>{
        console.log(response)
        res.send(response)
    }).catch(err=>{
        res.send(err)
    })
})
})
app.listen((process.env.PORT || 5000), function () {
    console.log("******************************************************************")
    console.log('backend v.0.0 started on port 5000 or', (process.env.port))
});
