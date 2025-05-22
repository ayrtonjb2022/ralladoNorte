import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import  routerU  from "./routers/authUser.js";
import  routerUD  from "./routers/userDateR.js";
import  routerC  from "./routers/cajaR.js";
import  routerM  from "./routers/movimientoR.js";
import  routerCl  from "./routers/clientesR.js";
import  routerR  from "./routers/reporteRoutes.js";
import sequelize from "./config/db.js";
const Port = process.env.PORT || 4000
dotenv.config();

const app = express();
app.use(express.json());
// Convertimos los dominios permitidos en un array
const whitelist = process.env.CORS_ORIGINS.split(',');

// Configuración personalizada de CORS
const corsOptions = {
  origin: function (origin, callback) {
    // Permitir peticiones sin origin (como Postman) o si el origin está en la whitelist
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      return callback(new Error('No autorizado por CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

app.use("/api", routerU);
app.use("/api", routerUD);
app.use("/api", routerC);
app.use("/api", routerCl);
app.use("/api", routerM);
app.use("/api", routerR);
app.listen(Port, async() => {
    console.log("El servidor esta corriendo en el puerto", Port);
    try {
        await sequelize.sync({force: false})
        console.log("Base de datos sincronizada")
    } catch (error) {
        console.log(error, "error en la sincronizacion de la base de datos")
    }
});