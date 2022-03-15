const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user: 'testuser',
    password: 'test123',
    host: 'localhost',
    database: 'aerodronedb',
    timezone: 'Z'
})

// Get Latest Track per Drone
app.get('/tracks', (req, res) =>{
    const queryLatest = "SELECT `droneID`, `lat`, `long` FROM droneLogs INNER JOIN (SELECT MAX(indexNum) as id FROM dronelogs GROUP BY droneID) last_updates ON last_updates.id = dronelogs.indexNum"
    db.query(queryLatest,(err,result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
            result.map(drone => console.log(`Drone ${drone.droneID} - latitude: ${drone.lat}, longitude: ${drone.long}`))
        }
    })
})


app.listen(3010, () => {
    console.log("Drone Server is running...")
})