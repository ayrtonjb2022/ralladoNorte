import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

const register = async (req, res) => {
    const { nombre, apellido, email, password, repeatPassword} = req.body
    try {
        if (password !== repeatPassword) {
            return res.status(400).json({msg: "Las contraseñas no coinciden"})
        }
        const existingUser = await User.findOne({where: {email}})
        if (existingUser) {
            return res.status(400).json({msg: "El usuario ya existe"})
        }
        const user = await User.create({
            nombre,
            apellido,
            email,
            password: await bcrypt.hashSync(password, 10),
            rol: "user",
            status: "activo"
        })
        res.status(201).json({
            response:{
                id: user.id,
                nombre: user.nombre,
                apellido: user.apellido,
                email: user.email
            },
            Message: "Usuario creado exitosamente"
        }) 
    } catch (error) {
        console.log(error)
    }

}

const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(400).json({ msg: "Credenciales inválidas"});
      }
      //verificar si esta activo
      if (user.status === "inactivo") {
        return res.status(400).json({ msg: "Usuario inactivo" });
      }
      //verificar si la contrasenia es correcta
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Credenciales inválidas" });
      }
  
      const token = jwt.sign(
        { id: user.id, email: user.email, rol: user.rol },
        process.env.JWT_SECRET,
        { expiresIn: "5h" } // ⏰ Token válido por 5 horas
      );

  
      res.json({
        token,
        user: {
          id: user.id,
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email,
          rol: user.rol,
        },
        message: "Inicio de sesión exitoso",
        status: 200,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error del servidor" });
    }
};

const getUserById = async(req, res) =>{
  try {

    const id = req.user.id;
    const user = await User.findByPk(id, 
      {
      attributes: ['id', 'nombre', 'apellido', 'email', 'rol', 'status']
    });

    console.log(id);
    
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado", status: 404 });
    }

    res.json({
      user,
      message: "Usuario obtenido exitosamente",
      status: 200
    });


    
  } catch (error) {
    res.status(500).json({
      message: "error interno del servidor",
      status: 500
    })
  }
}

const deleteUser = async (req, res) =>{
  try {
    const id = req.user.id;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado", status: 404 });
    }
    //actualizamos el status

    await User.update({ status: "inactivo" }, { where: { id } });

    res.json({
      message: "Usuario eliminado exitosamente",
      status: 200
    });
    
  } catch (error) {
    res.status(500).json({
      message: "error interno del servidor",
      status: 500
    })
  }
}

const updateUser = async (req, res) =>{
  try {
    const id = req.user.id;
    const { nombre, apellido, email } = req.body;
    console.log(nombre, apellido, email);
    
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado", status: 404 });
    }

    // Actualizar los campos del usuario
    user.nombre = nombre;
    user.apellido = apellido;
    user.email = email;

    await user.save();

    res.json({
      message: "Usuario actualizado exitosamente",
      status: 200
    });
  } catch (error) {
    res.status(500).json({
      message: "error interno del servidor",
      status: 500
    })
  }
}

const upDatePassword = async (req, res) =>{
  try {
    const id = req.user.id;
    const { newPassword, oldPassword } = req.body;
    console.log(oldPassword, newPassword);
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado", status: 404 });
    }
    

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Credenciales inválidas" });
    }
    //actualizamos la contrasenia
    await User.update({ password: await bcrypt.hashSync(newPassword, 10) }, { where: { id } });
    res.json({
      message: "Contraseña actualizada exitosamente",
      status: 200
    });
  }
  catch (error) {
    res.status(500).json({
      message: "error interno del servidor",
      status: 500
    })
  }
}

export {register, login, getUserById,deleteUser,updateUser,upDatePassword}