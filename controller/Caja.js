import Caja from "../models/cajaModel.js";
import User from "../models/userModel.js";
const getCajas = async (req, res) => {
    try {
        const userId = req.user.id
        console.log(userId);
        
        const cajas = await Caja.findAll({ where: { usuario_id: userId } });
        res.json(cajas || []);
    } catch (error) {
        console.log(error);
    }
};

const createCaja = async (req, res) => {
    try {
        const { saldo_inicial } = req.body;
        const fecha = new Date().toLocaleDateString('es-AR', {
            timeZone: 'America/Argentina/Buenos_Aires'
        }).split('/').reverse().join('-');
        const usuarioE = req.user.email
        const usuarioDb = await User.findOne({ where: { email: usuarioE } });
        if (!usuarioDb) {
            return res.status(400).json({ msg: "El usuario no existe" });
        }

        //verificar si la fecha ya existe
        const cajaDb = await Caja.findOne({ where: { fecha } });
        if (cajaDb) {
            return res.status(400).json({ msg: "La fecha ya existe" });
        }

        const usuario_id = usuarioDb.id;
        const caja = await Caja.create({ fecha, saldo_inicial, saldo_final: saldo_inicial, usuario_id });
        res.json(caja);
    } catch (error) {
        console.log(error);
    }
};

const upDateCaja = async (req, res) => {
    try {
        const { id } = req.params;
        const { saldo_inicial, saldo_final } = req.body;
        const fecha = new Date().toLocaleDateString('es-AR', {
            timeZone: 'America/Argentina/Buenos_Aires'
        }).split('/').reverse().join('-');
        const usuarioId = req.user.id
        const caja = await Caja.update({ fecha, saldo_inicial, saldo_final }, { where: { id, usuario_id: usuarioId } });
        res.json(caja);
    } catch (error) {
        console.log(error);
    }
};



export { getCajas, createCaja, upDateCaja };