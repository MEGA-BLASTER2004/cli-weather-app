const API = require('./secret.js')
const request = require('request')
const chalk = require('chalk')
const yargs = require('yargs')

location = ""

if(yargs.argv["loc"]){
    location = yargs.argv["loc"]
}else{
    location = ""
}

const weather_URL = "http://api.weatherstack.com/current?access_key=" + API.weather + "&query=" + location

request({url: weather_URL, json: true}, (error, response) => {
    if(error){
        console.log(chalk.red.bold("Unable to access weather services..."))
    }else if(response.body.current === undefined){
        console.log(chalk.red.bold("Unable to find"), chalk.whiteBright.bgRed.bold(location))
    }else {
        console.log(chalk.blue("Current weather in"), chalk.green.bold.underline(response.body.location.name + "," + response.body.location.country), "is", chalk.blueBright.bold(response.body.current.weather_descriptions[0]), chalk.blue("and the current temperature is"), chalk.blueBright.bold(response.body.current.temperature) + chalk.blueBright("°C"))
    }
})