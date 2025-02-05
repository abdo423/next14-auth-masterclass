"use server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { generateVerificationToken } from "@/lib/tokens";
import { z } from "zod";
import {  registerSchema } from "../schemas";
import { getUserByEmail } from "../data/user";
import { sendVerificationEmail } from "@/lib/mail";
export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);
    if (!validatedFields.success) {
        return  {error: "Invalid fields"}; 
     }
     const {email, password,name} = validatedFields.data;
     const hashedPassword = await bcrypt.hash(password, 10);  
     const existingUser = await getUserByEmail(email);
     if(existingUser){
        return {error: "User already exists"};
     }   
     await db.user.create({
        data: {
          email,
          password: hashedPassword,
          name
        }
      });
  
      const verificationToken = await generateVerificationToken(email);
      await sendVerificationEmail(verificationToken.email, verificationToken.token);      

     return {success: "confirmation email send"};
};
