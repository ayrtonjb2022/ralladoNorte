// models/movimientoModel.js
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Caja from "./cajaModel.js";
import User from "./userModel.js";

class Movimiento extends Model {}

Movimiento.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    tipo: {
      type: DataTypes.ENUM("ingreso", "gasto"),
      allowNull: false
    },
    monto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    categoria:{
        type:DataTypes.ENUM("Mercaderia", "Empleados", "Servicios", "Otros", "Combustible"),
        allowNull: true
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    caja_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Caja,
        key: "id"
      }
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id"
      }
    }
  },
  {
    sequelize,
    modelName: "movimientos",
    timestamps: false
  }
);

// Relaciones
Movimiento.belongsTo(Caja, { foreignKey: "caja_id" });
Movimiento.belongsTo(User, { foreignKey: "usuario_id" });

Caja.hasMany(Movimiento, { foreignKey: "caja_id" });
User.hasMany(Movimiento, { foreignKey: "usuario_id" });

export default Movimiento;
