import { Sequelize, Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

class User extends Model{}

User.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.ENUM("admin", "user"),
        allowNull: false
    },
    status:{
        type: DataTypes.ENUM("activo", "inactivo"),
        allowNull: false
    }
}, {
    sequelize,
    modelName: "User",
    createdAt: true,
    updatedAt: true
})


export default User