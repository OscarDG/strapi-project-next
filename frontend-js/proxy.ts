import { type NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { STRAPI_BASE_URL } from './lib/strapi';

const protectedRoutes = ['/dashboard'];//Acá van las rutas protegidas

function checkIsProtectedRoute(path: string) {
    return protectedRoutes.includes(path);
}

export async function proxy(request: NextRequest) {
    const curentPath = request.nextUrl.pathname;

    const isProtectedRoute = checkIsProtectedRoute(curentPath);

    if(!isProtectedRoute) {
        return NextResponse.next();
    }

    try{
        //1. validar si el usuario tiene el jwt cookie
        //2. validar si el usuario existe en la base de datos de strapi
        //3. Validar si el usurio está activo (Bloqueado?)
        const cookieStore = await cookies();
        const jwt = cookieStore.get('jwt')?.value;

        if(!jwt) {
            return NextResponse.redirect(new URL('/signin', request.url));
        }

        const response = await fetch(`${STRAPI_BASE_URL}/api/users/me`, {
            headers: {
                'Authorization':` Bearer ${jwt}`,
                'Content-type' : 'application/json',
            }
        })

        const userResponse = await response.json();
        console.log('User response from Strapi:', userResponse);

        if(!userResponse) {
            return NextResponse.redirect(new URL('/signin', request.url));
        }

        if(userResponse.data?.attributes?.blocked) {
            return NextResponse.redirect(new URL('/signin', request.url));
        }

        //Dejamos pasar al usuario
        return NextResponse.next();

    } catch (error) {
        console.error("Error verifying user authentication:", error);
        return NextResponse.redirect(new URL('/signin', request.url));
    }
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
        '/dashboard',
    ]
}
