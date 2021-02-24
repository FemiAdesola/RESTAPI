if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
};

const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const indexRouter = require('./routes/index');
const staffRouter = require('./routes/staff');
const logger = require('./middleware/logger');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// the engine to use 
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

const mongoose = require('mongoose');
mongoose.connect(process.env.database_url, { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection
db.on('error', error => console.error(error));
db.once('open', () => console.log('connectd to mongoose'));

app.use('./middleware', logger);
app.use(methodOverride('_method'));
app.use('/staff', staffRouter);
app.use('/', indexRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));