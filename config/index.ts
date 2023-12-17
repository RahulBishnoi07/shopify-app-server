import 'dotenv/config';

export const applicationConfig = {
  // App
  app: {
    env: process.env.NODE_ENV,
    port: process.env.NODE_ENV === 'development' ? '8808' : '3000',
  },

  // Database
  db: {
    db_dialect: process.env.DB_DIALECT || 'postgres',
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    port: process.env.DB_PORT,
  },
};
