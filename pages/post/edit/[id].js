import Router from "next/router";
import { useState } from "react"
import { authorizePage } from "../../../middlewere/authorizationPage"


export async function getServerSideProps(ctx) {
    const { token } = await authorizePage(ctx);

    const {id} = ctx.query;

    const res = await fetch(`http://127.0.0.1:3000/api/post/detail/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await res.json()

    return {
        props: {
            token,
            post: data.data
        }
    }
}

export default function PostEdit({post, token}){

    const [fields, SetFields] = useState({title: post.title, content: post.content})
    const [status, SetStatus] = useState("")
    
    async function updateHandler(e) {
        e.preventDefault();

        SetStatus("Loading")

        const update = await fetch(`/api/post/update/${post.id}`, {
            method: 'PUT',
            body: JSON.stringify(fields),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        if(!update.ok) return console.log(update.statusText);

        await update.json();
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
    <h1>Edit a Post</h1>
    <h3>{status}</h3>

    <form onSubmit={updateHandler.bind(this)}>
       <input
            onChange={fieldHandler.bind(this)}
            type="text" 
            placeholder="Title" 
            name="title" 
            defaultValue={post.title}
        />
        <br />
        <textarea
            onChange={fieldHandler.bind(this)}
            placeholder="Content" 
            name="content"
            defaultValue={post.content}
        ></textarea>
        <br />
        
        <button type="submit">
            Edit
        </button>
    </form>
</div>
  )
}