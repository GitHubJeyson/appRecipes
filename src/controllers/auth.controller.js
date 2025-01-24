import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'
import {createAccessToken} from '../libs/jwt.js'

//REGISTER
export const register = async (req, res) => {    
    try {
          const {email, password, username} = req.body;

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
    });
    const userSaved = await newUser.save();

    const token = await createAccessToken({
        id:userSaved._id,
    });

    res.cookie('token', token, {
        httpOnly: process.env.NODE_ENV !== "development",
        secure: true,
        sameSite: "none",
    });

    res.json({
        id: userSaved._id,
        username: userSaved.username,
        email:userSaved.email,
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
        });

        res.cookie('token', token, {
            httpOnly: process.env.NODE_ENV !== "development",
            secure: true,
            sameSite: "none",
        });

        res.json({
        id: userFound._id,
        username: userFound.username,
        email:userFound.email,
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
            });
      });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


//LOGOUT
export const logout = (req, res) => {
    try {
        res.cookie('token', "", {
            httpOnly: true,
            secure: true,
            expires: new Date(0)
        });
        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
