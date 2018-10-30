
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const Trip = require('./trip')



const PORT = 3000;

let trips = []

app.use(express.static('css'))

app.use(bodyParser.urlencoded({ extended: false }))

// the engine template that will be used
app.engine('mustache', mustacheExpress());

// telling that all the views pages will be inside views directory
app.set('views', './views');

//extensions of the files will be mustache
app.set('view engine', 'mustache');



app.get('/', (req, res) => {

    res.render('index');
});

app.post('/', (req, res) => {
    res.send('home')
})

app.post('/add-trip', (req, res) => {
    let title = req.body.tripTitle
    let image = req.body.tripImage
    let departureDate = req.body.tripDepartureDate
    let returnDate = req.body.tripReturnDate

    let trip = new Trip(title, image, departureDate, returnDate)
    
    JSON.stringify(trip)

    trips.push({trip})
    console.log(trip)
    res.redirect('trips')

})

app.post('/remove-trip', (req, res) => {

    console.log(trips)


    

    res.redirect('trips')
})



app.get('/add-trip', (req, res) => {


    res.render('add-trip')
})



app.get('/trips', (req, res) => {


    res.render('trips', {tripList : trips})
})








// starts server
app.listen(PORT, () => {
    console.log("server is up...");
});