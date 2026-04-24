// src/infrastructure/database/config/config.cjs
require('dotenv').config();

module.exports = {
  development: {
    use_env_variable: 'MYSQL_URI', // The CLI will look for this key in your .env
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  },
  production: {
    use_env_variable: 'MYSQL_URI',
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};