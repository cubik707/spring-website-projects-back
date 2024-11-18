import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'postgres',
  }
);

const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully!');

    await sequelize.sync();
    console.log('Database tables synced successfully!');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

export { sequelize, connectToDB };
