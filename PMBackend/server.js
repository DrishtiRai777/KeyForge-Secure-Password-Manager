const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passwordRoutes = require('./routes/passwordRoutes');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const tokenRoutes = require('./routes/tokenRouter');
const totpRoutes = require('./routes/totpRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

connectDB();

app.use('/', passwordRoutes);
app.use('/auth', authRoutes);
app.use('/token', tokenRoutes);
app.use('/api/totp', totpRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
