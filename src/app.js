const path = require('path')
const express = require('express')
const hbs = require('hbs')
const getWeather = require('./utils/getWeather.js')

const app = express()

// defin paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewDirectoryPath = path.join(__dirname,'../templates/views')
const partialDirectoryPath = path.join(__dirname,'../templates/partials')

// setup handlebar engine and views directory
app.set('views',viewDirectoryPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialDirectoryPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index',{
        title: 'Home page',
        name: 'Rushank Shah'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title: "Help page",
        message: 'Help page',
        name: 'Rushank Shah'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About page',
        name: 'Rushank Shah'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please provide a valid address'
        })
    }
    getWeather(req.query.address,(error, resp)=>{
        if(error)
            return res.send({error})
        res.send(
            {
                forecast: resp.forecast,
                address: req.query.address
            }
        )
    })
    
})

app.get('/help/*',(req, res)=>{
    res.render(
        '404',{
            title: '404 help',
            name: 'Rushank Shah',
            errorMessage: 'Help article not found'
        }
    )
})

app.get('*',(req, res)=>{
    res.render(
        '404',{
            title: '404 not found',
            errorMessage: '404 not found',
            name: 'Rushank Shah'
        }
    )
})

app.listen(3000, ()=>{
    console.log("Server is up and running")
})