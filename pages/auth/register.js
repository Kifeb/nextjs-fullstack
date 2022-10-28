import { useState } from "react";

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

    const registerRes = await registerReq.json()
    console.log(registerRes);

    SetStatus("Success")

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
      <h3>{SetStatus}</h3>

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