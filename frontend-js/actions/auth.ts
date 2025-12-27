'use server'//Este código no se ejecuta en el cliente, sino en el servidor.

import { getRegisterUserService } from "@/lib/strapi";
import { SignupFormSchema, type FormState } from "@/validations/auth";
import { z } from "zod";
import { cookies } from "next/headers";//guarda las cookies y mantiene sesión iniciada
import { redirect } from 'next/navigation';//redirecciona a otra página

const cookieConfig = {
    maxAge: 30 * 24 * 60 * 7, // 7 days
    path: '/',
    httpOnly: true,//Only accessible by the server
    domain: process.env.HOST ?? 'localhost',
    secure: process.env.NODE_ENV === 'production',//Only sent over HTTPS in production
}

export async function registerUserAction(prevState: FormState, formData: FormData) : Promise<FormState> {
    console.log('Hello from registerUserAction');

    const fields ={
        username: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('Password') as string,
    };

    const validatedFields = SignupFormSchema.safeParse(fields);

    if (!validatedFields.success) {
        const flattenedErros = z.flattenError(validatedFields.error);

        console.log('Validation errors:', flattenedErros.fieldErrors);

        return {
            success: false,
            message: 'Validation error',
            strapiErrors: null,
            zodErrors: flattenedErros.fieldErrors,
            data: {
                ...prevState.data,
                ...fields,
            }
        };
    };

    const response = await getRegisterUserService(validatedFields.data);

    if (!response || response.error) {
        return {
            success: false,
            message: 'registration error',
            strapiErrors: response?.error,
            zodErrors: null,
            data: fields
        }
    }

    const cookieStore = await cookies();
    cookieStore.set('jwt', response.jwt, cookieConfig);
    redirect('/dashboard');
}

