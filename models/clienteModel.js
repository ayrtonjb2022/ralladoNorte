import User from './userModel.js';
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

class Clientes extends Model { }

Clientes.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  nombre_cliente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido_cliente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccion_cliente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contacto_cliente: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[0-9+ ]+$/i,
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
  },
}, {
  sequelize,
  modelName: 'Clientes',
  tableName: 'clientes',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

Clientes.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});



export default Clientes;
