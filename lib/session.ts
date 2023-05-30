import { IronSessionOptions } from 'iron-session'

export const ironSessionOptions: IronSessionOptions = {
    cookieName: 'my_app_cookie',
    password: process.env.SECRET_COOKIE_PASSWORD as string,
    cookieOptions: {
        secure: false
    }
}

declare module 'iron-session' {
    interface IronSessionData {
        token?: string
    }
}