import cookies from "next-cookies";

export function unauthorizePage(ctx){
    return new Promise(resolve => {
        const allCookies = cookies(ctx)

        if(allCookies.token) return ctx.res.writeHead(302, {
            Location: '/post'
        }).end();

        return resolve("Unauthorized")
    })
}

export function authorizePage(ctx){
    return new Promise(resolve => {
        const allCookies = cookies(ctx)

        if(!allCookies.token) return ctx.res.writeHead(302, {
            Location: '/auth/login'
        }).end();

        return resolve({
            token: allCookies.token
        })
    })
}