require('dotenv').config()
const app = require('./servidor');



app.listen(process.env.PORT);

