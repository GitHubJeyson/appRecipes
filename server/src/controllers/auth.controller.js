import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'
import {createAccessToken} from '../libs/jwt.js'

//REGISTER
export const register = async (req, res) => {
    try {
          const {email, username, password, role} = req.body;

         const userFound = await User.findOne({$or: [{email}, {username}]}); 
        if(userFound) {
        if(userFound.username === username) return res.status(400).json({ message : ['El usuario ya existe']});
        if(userFound.email === email) return res.status(400).json({message : ['El email ya está registrado']});
        }
        
        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
        username,
        email,
        password: passwordHash,
        role: role,
    });
    const userSaved = await newUser.save();

    const token = await createAccessToken({
        id:userSaved._id,
        role: userSaved.role,
    });

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie('token', token, {
      httpOnly: isProduction,
      secure: isProduction,
      sameSite: isProduction ? "lax" : "none",
    });

    res.json({
        id: userSaved._id,
        username: userSaved.username,
        email:userSaved.email,
        role:userSaved.role,
        //token, //borrar despues de los testing con vitest y supertest
    })
   } catch (err){
    res.status(500).json({ message: err.message });
   }
};

//LOGIN
export const login = async (req, res) => {
    try {
        const {username, password} = req.body;

        const userFound = await User.findOne({username});
        if(!userFound)
            return res.status(400).json({ 
            message: ["Usuario no encontrado"],
        });

        const isMatch = await bcrypt.compare(password, userFound.password);
        if(!isMatch)
            return res.status(400).json({
            message: ["contraseña incorrecta"],
        });

        const token = await createAccessToken({
            id:userFound._id,
            role: userFound.role,
        });

        const isProduction = process.env.NODE_ENV === "production";

        res.cookie('token', token, {
          httpOnly: isProduction,
          secure: isProduction,
          sameSite: isProduction ? "lax" : "none",
        });

        res.json({
        id: userFound._id,
        username: userFound.username,
        email:userFound.email,
        role: userFound.role,
    });
   } catch (err){
    res.status(500).json([{ message: err.message }]);
   }
};

//TOKEN
export const verifyToken = async (req, res) => {
    try {
        const {token} = req.cookies;
        if (!token) return res.status(401).json({ message: "Unauthorized"});

        jwt.verify(token, TOKEN_SECRET, async (error, user) => {
        if (error) return res.status(401).json({ message: "Unauthorized"});
            
        const userFound = await User.findById(user.id);
        if (!userFound) return res.status(401).json({ message: "Unauthorized"});
    
            return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            role: userFound.role,
            });
      });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


//LOGOUT
export const logout = (req, res) => {
    try {
        const isProduction = process.env.NODE_ENV === "production";

        res.cookie('token', "", {
          httpOnly: isProduction,
          secure: isProduction,
          sameSite: isProduction ? "lax" : "none",
          expires: new Date(0),
        });
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// Verificar si ya existe un administrador
export const checkAdminExists = async (req, res) => {
    try {
      const adminFound = await User.findOne({ role: 'admin' });
      if (adminFound) {
        return res.json({ exists: true });
      }
      return res.json({ exists: false });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };



  export const getUsers = async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        console.log('Acceso denegado. Se requiere rol de administrador.')
        return res.status(403).json({ message: error.message });
      }
      const users = await User.find();
      res.json(users);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };


  export const deleteUser = async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        console.log('Acceso denegado. Se requiere rol de administrador.')
        return res.status(403).json({ message: error.message });
      }
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      return res.status(200).json({ message: 'User deleted successfully'});
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };