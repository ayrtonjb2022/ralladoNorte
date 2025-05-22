import Caja from "../models/cajaModel.js";
import User from "../models/userModel.js";
import Movimiento from "../models/movimientoModel.js";
import CarteraVentas from '../models/ventas.js';
import Clientes from "../models/clienteModel.js";
const createMovimiento = async (req, res) => {
    try {
        const { tipo, monto, descripcion, categoria, caja_id, cliente_id, kilos_vendidos } = req.body;
        console.log("Datos recibidos:", tipo, monto, descripcion, categoria, caja_id, cliente_id, kilos_vendidos);

        if (tipo != "ingreso" && tipo != "gasto") {
            return res.status(400).json({ msg: "El tipo no es valido" });
        }
        const cajaDb = await Caja.findOne({ where: { id: caja_id } });
        if (!cajaDb) {
            return res.status(400).json({ msg: "La caja no existe" });
        }
        const userId = cajaDb.usuario_id;
        console.log(monto, userId, "cliente:",cliente_id);

        if (categoria != "Mercaderia" && categoria != "Empleados" && categoria != "Servicios" && categoria != "Otros" && categoria != "Combustible") {
            return res.status(400).json({ msg: "La categoria no es valida" });
        }

        console.log(cajaDb.saldo_final, monto);


        //actualizar la caja
        if (tipo == "ingreso") {
            await Caja.update({ saldo_final: Number(cajaDb.saldo_final) + Number(monto) }, { where: { id: caja_id } });
        } else {
            await Caja.update({ saldo_final: Number(cajaDb.saldo_final) - Number(monto) }, { where: { id: caja_id } });
        }

        const movimiento = await Movimiento.create({ tipo, monto, descripcion, categoria, caja_id, usuario_id: userId });
        if (!movimiento) {
            return res.status(400).json({ msg: "No se pudo crear el movimiento" });
        }

        console.log(tipo,categoria,cliente_id);
        

        //creamos Cartera de venta venta 
        if (tipo == "ingreso"  && cliente_id) {
            const fecha = new Date().toLocaleDateString('es-AR', {
                timeZone: 'America/Argentina/Buenos_Aires'
            }).split('/').reverse().join('-');
            console.log(fecha);

            const venta = await CarteraVentas.create({
                fecha: fecha,
                monto, user_id: userId,
                kilos: kilos_vendidos,
                cliente_id,
                refer_caja: caja_id,
                refer_movimiento: movimiento.id
            });
            if (!venta) {
                return res.status(400).json({ msg: "No se pudo crear la venta" });
            }
        }
        res.json(movimiento);
    } catch (error) {
        console.log(error);
        return res.json(error);

    }
};

const getMovimientos = async (req, res) => {
    try {
        const userid = req.user.id
        const movimientos = await Movimiento.findAll({ where: { usuario_id: userid } });
        res.json(movimientos || []);
    } catch (error) {
        console.log(error);
    }
};
const getAllVentas = async (req, res) => {
    try {
        const user = req.user.id
        const response = await CarteraVentas.findAll({
            where: { user_id: user}, 
            include: [{
                model: Clientes,
                attributes: ['nombre_cliente', 'apellido_cliente'] 
            }],
            attributes: ['monto','kilos','fecha'] 
        });

        res.json(response || []);
    } catch (error) {
        res.json(error)
    }
}

const deleteMovimiento = async (req, res) => {
    try {
        const { id } = req.params;
        const movimiento = await Movimiento.destroy({ where: { id } });
        res.json(movimiento);
    } catch (error) {
        console.log(error);
    }
};

export { createMovimiento, getMovimientos, deleteMovimiento, getAllVentas };