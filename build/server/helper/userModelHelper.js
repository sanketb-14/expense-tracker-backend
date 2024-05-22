import crypto from 'crypto';
import bcrypt from 'bcryptjs';
export const generateToken = ()=> crypto.randomBytes(32).toString('hex');

export const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

export const comparePassword =async function(candidatePassword , userPassword){
    return await bcrypt.compare(candidatePassword, userPassword);
} 