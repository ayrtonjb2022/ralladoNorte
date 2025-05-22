import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();    

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // necesario para conexión segura en Render
    },
  },
  logging: false,
});
// Verifica la conexión
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });
// Exporta la instancia de Sequelize para usarla en otros archivos
export default sequelize;
