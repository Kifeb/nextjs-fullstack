import Router from "next/router";
import { useState } from "react";
import { unauthorizePage } from "../../middlewere/authorizationPage";

export async function getServerSideProps(ctx){

  await unauthorizePage(ctx)

  return {
      props: {}
  }
}

export default function Register() {
  const [fields, SetFields] = useState({email: "", password: ""})
  const [status, SetStatus] = useState("")

  async function registerHandler(e){
    e.preventDefault();

    SetStatus("Loading")

    const registerReq = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if(!registerReq.ok) return SetStatus("Error");

    await registerReq.json()

    SetFields({email: "", password: ""})
    SetStatus("Success")

    Router.push("/auth/login")

  }



  function filedHandler(e){
    const name = e.target.getAttribute("name")
    
    SetFields({
      ...fields,
      [name]: e.target.value
    })
    

  }

  return (
    <div style={{margin: '0 auto', width: '300px', height: '300px', textAlign: 'center'}}>
      <h1>Register</h1>
      <h3>{status}</h3>

      <form onSubmit={registerHandler.bind(this)} style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
        Email
        <input type="text" name="email" id="email" placeholder="email" onChange={filedHandler.bind(this)}/>
        Password
        <input type="password" name="password" id="password" placeholder="****" onChange={filedHandler.bind(this)} />
        <button type="submit">
          Register
        </button>
      </form>
    </div>
  )
}