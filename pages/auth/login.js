import { useState, useEffect } from "react";
import Cookie from 'js-cookie';
import Router from "next/router";
import cookies from "next-cookies";
import { unauthorizePage } from "../../middlewere/authorizationPage";
import Link from "next/link";

export async function getServerSideProps(ctx){

    await unauthorizePage(ctx)

    return {
        props: {}
    }
}

export default function Login(){
    const [fields, SetFields] = useState({email: "", password: ""})
    const [status, SetStatus] = useState("")

    async function loginHandler(e) {
        e.preventDefault()
 
        SetStatus("Loading")

        const loginReq = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify(fields),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if(!loginReq.ok) return SetStatus("Error " + loginReq.statusText);

        const loginRes = await loginReq.json();

        SetStatus('Success')
        Cookie.set("token", loginRes.token)

        Router.push("/post")
    }

    function fieldHandler(e) {
        const name = e.target.getAttribute('name');

        SetFields({
            ...fields,
            [name]: e.target.value
        });
    }

    return(
        <div style={{margin: '0 auto', width: '300px', height: '300px', textAlign: 'center'}}>
        <h1>Login</h1>
        <h3>{status}</h3>

        <form onSubmit={loginHandler.bind(this)} style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
            Email
        <input type="text" name="email" id="email" placeholder="email" onChange={fieldHandler.bind(this)} />
            Password
            <input type="password" name="password" id="password" placeholder="****" onChange={fieldHandler.bind(this)} />
            <button type="submit">
            Login
            </button>
            <Link href="/auth/register">REGISTER</Link>
        </form>
        </div>
    )
}