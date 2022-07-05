const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server

const init = async () => {
  try {
    await sequelize.sync({ force: false });

    app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
  } catch (error) {
    console.log(`Error: Failed to connect to database - ${error.message}`);
  }
};

init();