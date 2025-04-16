import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

export const PORT = process.env.PORT || 4000;

export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://mongo:27017/mern-recipes";

export const TOKEN_SECRET = process.env.TOKEN_SECRET || crypto.randomBytes(64).toString('hex');

export const FRONTEND_URL = process.env.FRONTEND_URL || "http://192.168.88.250";