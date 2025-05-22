import {Sequelize} from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()
// import mysql2 from 'mysql2'
const sequelize = new Sequelize("rebonorte", "root", "",{
    host: "localhost",
    dialect: "mysql",
    port: 3306
})


export const testConnection = async () => {
    try {
        await connection.authenticate()
        console.log("coneccion establecido")
    } catch (error) {
        console.error("error en la coneccion", error)
    }
}

export default sequelize