import User from './userModel.js';
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Movimiento from './movimientoModel.js';
import Caja from './cajaModel.js';
import Clientes from './clienteModel.js';

class CarteraVentas extends Model{}

CarteraVentas.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    monto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    kilos:{
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: "id"
        }
      },
    cliente_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Clientes,
          key: "id"
        }
    },
    refer_caja:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Caja,
          key: "id"
        }
    },
    refer_movimiento:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Movimiento,
          key: "id"
        }
    }
},{
    sequelize,
    modelName: "CarteraVentas",
    timestamps: false
})

CarteraVentas.belongsTo(User, {foreignKey: "user_id"})
CarteraVentas.belongsTo(Clientes, {foreignKey: "cliente_id"})
CarteraVentas.belongsTo(Caja, {foreignKey: "refer_caja"})
CarteraVentas.belongsTo(Movimiento, {foreignKey: "refer_movimiento"})


export default CarteraVentas