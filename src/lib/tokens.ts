import {v4 as uuidv4} from 'uuid';
import crypto from 'crypto';
import { getVerificationTokenByEmail } from '../../data/verification-token';
import { getPasswordResetEmail } from '../../data/password-reset-token';
import { getTwoFactorTokenByEmail } from '../../data/two-factor-token';
import { db } from './db';
interface VerificationToken {
    id: string;
    email: string;
    token: string;
    expires: Date;
}

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() +  5*60 * 1000);
    const existingToken = await getVerificationTokenByEmail(email) as VerificationToken | null;
    if(existingToken) {
        await db.verificationToken.delete({
            where: {
                id: existingToken.id,
            },
        })
    }
    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires,
        },
    });
    return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();
    const existingToken = await getPasswordResetEmail(email) as VerificationToken | null;
    if(existingToken) {
        await db.passwordResetToken.delete({
            where: {
                id: existingToken.id,
            },
        })
    }
    const passwordResetToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires: new Date(new Date().getTime() + 3600 * 1000),
        },
    });
    return passwordResetToken;
}

export const generateTwoFactorToken = async (email: string) => {
    const token = crypto.randomInt(100_000, 1000_000).toString();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
 
    const existingToken = await getTwoFactorTokenByEmail(email) as VerificationToken | null;
    if(existingToken) {
        await db.twoFactorToken.delete({
            where: {
                id: existingToken.id,
            },
        })
    }
    const twoFactorToken = await db.twoFactorToken.create({
        data: {
            email,
            token,
            expires,
        },
    });
    return twoFactorToken;  

}