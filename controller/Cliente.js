import Clientes from "../models/clienteModel.js";
import User from "../models/userModel.js";

export const getClientes = async (req, res) => {
    const userid = req.user.id
    try {
        const clientes = await Clientes.findAll({ where: { user_id: userid, status: 'active' } });
        res.json(clientes);
    } catch (error) {
        console.error("Error al obtener clientes:", error);
        throw error;
    }
};

export const createCliente = async (req, res) => {
    const { nombre_cliente, apellido_cliente, direccion_cliente, contacto_cliente } = req.body;
    const userid = req.user.id

    if (isNaN(Number(valor))) {
        return res.status(400).json({ message: "El valor debe ser un número" });
    }
    try {
        const cliente = await Clientes.create({ nombre_cliente, apellido_cliente, direccion_cliente, contacto_cliente, user_id: userid });
        res.status(201).json({
            message: "Cliente creado exitosamente",
            cliente
        })
    } catch (error) {
        console.error("Error al crear cliente:", error);
        throw error;
    }
};

export const updateCliente = async (req, res) => {
    const { id } = req.params;
    const { nombre_cliente, apellido_cliente, direccion_cliente, contacto_cliente } = req.body;
    try {
        const cliente = await Clientes.update({ nombre_cliente, apellido_cliente, direccion_cliente, contacto_cliente }, { where: { id } });
        return cliente;
    } catch (error) {
        console.error("Error al actualizar cliente:", error);
        throw error;
    }
};

export const deleteCliente = async (req, res) => {
    const { id } = req.params;
    try {
        //actualizar status
        const cliente = await Clientes.update({ status: 'inactive' }, { where: { id } });

        return cliente;
    } catch (error) {
        console.error("Error al eliminar cliente:", error);
        throw error;
    }
};
