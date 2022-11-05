import Router from "next/router";
import { useState } from "react";
import Nav from "../../components/Nav";
import { authorizePage } from "../../middlewere/authorizationPage"

export async function getServerSideProps(ctx){
    const {token} = await authorizePage(ctx)
    console.log(token);
    const posts = await fetch("http://127.0.0.1:3000/api/post", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const datas = await posts.json()
    return {
        props: {
            token,
            posts: datas.data
        }
    }
}

export default function PostIndex(props){

    const [posts, SetPost] = useState(props.posts)

    async function deleteHandler(id, e){
        e.preventDefault()

        const {token} = props

        const ask = confirm("Yakin ingin dihapus");

        if(ask) {
            const deletePost = await fetch(`/api/post/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            await deletePost.json()

            const postFiltered = posts.filter((post) => {
                return post.id !== id && post;
            });

            SetPost(postFiltered)
        }
    }

    function editHandler(id, e){
        Router.push("/post/edit/"+id)
    }

    let no = 1
    return(
        <div>
            <Nav />
            <h1 style={{textAlign: "center"}}>Posts</h1>
            {posts.map(post => (
                <div key={post.id}style={{height: "100%",width: '50%', margin: '0 auto'}}>
                    {!post ? <h3>Data Masih Kosong</h3> : ""}
                    <h3>{no++}. {post.title}</h3>
                    <div>
                        <button onClick={editHandler.bind(this, post.id)}>Edit</button>  
                        <button onClick={deleteHandler.bind(this, post.id)}>Delete</button>
                    </div>
                    <hr/>
                </div>
            ))}
        </div>
    )
}