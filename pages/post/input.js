import Router from "next/router";
import { useState } from "react"
import Nav from "../../components/Nav";
import { authorizePage } from "../../middlewere/authorizationPage"


export async function getServerSideProps(ctx) {
    const { token } = await authorizePage(ctx);

    return {
        props: {
            token
        }
    }
}

export default function PostCreate(props){

    const [fields, SetFields] = useState({title: "", content: ""})
    const [status, SetStatus] = useState("")
    
    async function createHandler(e) {
        e.preventDefault();

        SetStatus("Loading")
        const { token } = props;

        const create = await fetch('/api/post/create', {
            method: 'POST',
            body: JSON.stringify(fields),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        if(!create.ok) return console.log(create.statusText);

        await create.json();
        SetStatus("Success")

        Router.push("/post")
    }

    function fieldHandler(e){
        const name = e.target.getAttribute("name")

        SetFields({
            ...fields,
            [name]: e.target.value
        })
    }

  return (
    <div>
        <Nav />
        <h1>Create a Post</h1>
        <h3>{status}</h3>

        <form onSubmit={createHandler.bind(this)}>
        <input
                onChange={fieldHandler.bind(this)}
                type="text" 
                placeholder="Title" 
                name="title" 
            />
            <br />
            <textarea
                onChange={fieldHandler.bind(this)}
                placeholder="Content" 
                name="content" 
            ></textarea>
            <br />
            
            <button type="submit">
                Create Post
            </button>
        </form>
    </div>
  )
}