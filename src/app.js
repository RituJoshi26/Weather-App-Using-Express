const express = require('express')
const path = require('path')
const app = express()
const port = 3000

const hbs = require('hbs');

const staticPath = path.join(__dirname,'../public');
const templatePath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');
hbs.registerPartials(partialsPath);

app.use(express.static(staticPath));

console.log(path.join(__dirname))
app.set("view engine","hbs");
app.set("views",templatePath);


app.get('/', (req, res) => res.render('index'))

app.get("/about",(req,res)=>{
    res.render("about")
})

app.get("/weather",(req,res)=>{
    res.render("weather")
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))