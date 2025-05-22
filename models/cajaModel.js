
import User from "./userModel.js";
// models/cajaModel.js
import { DataTypes, Model } from "sequelize";
import sequelize from '../config/db.js';

class Caja extends Model {}

Caja.init( {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  saldo_inicial: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  saldo_final: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id"
    }
  }
},{
  sequelize,
  modelName: "Caja",
  createdAt: true,
  updatedAt: true
});

// Relación
Caja.belongsTo(User, { foreignKey: "usuario_id" });
User.hasMany(Caja, { foreignKey: "usuario_id" });

export default Caja;
