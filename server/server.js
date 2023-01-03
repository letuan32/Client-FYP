
/*================== Clobal Imports =================*/
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')

const helmet = require('helmet')
const csp = require('helmet-csp');


const morgan = require('morgan')
const sanitizeMongo = require('express-mongo-sanitize')


const path = require('path')


const db = require('./config/db')
const PORT = process.env.PORT || 3001






/*================== Configurations =================*/

/*================== Environment Variables config for development =================*/
if(process.env.NODE_ENV !== "production"){
    dotenv.config();
}

/*================== Express config =================*/
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))






/*================== Security ==================*/

// Use the helmet middleware to set the default CSP
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    imgSrc: ["'self'", 'https://i.stack.imgur.com/l60Hf.png', 'https://res.cloudinary.com/diskudcr3']
  }
}));

app.use(csp({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", 'https://fonts.googleapis.com', 'https://fonts.gstatic.com',"'unsafe-inline'"],
      fontSrc: ['https://fonts.gstatic.com','https://nameless-basin-36851.herokuapp.com/'],
      imgSrc: ["'self'",
                "blob:",
                "data:",
                'https://i.stack.imgur.com/l60Hf.png', 
                'https://res.cloudinary.com/diskudcr3/*']
    }
  }));
app.use(cors())

// app.use(cors({
//     origin: ['https://example.com', 'https://other-site.com']
//   }));



//Sanitize url
app.use(sanitizeMongo({replaceWith: '_'}))

//Routes
app.use(require('./routes'))
app.use(express.static(path.join(__dirname + '/public')))

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


if (process.env.NODE_ENV === "production") {
 
}










/*================== MONGODB =================*/
db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`🌍💥 Server running on port ${PORT}`)
    })
})


