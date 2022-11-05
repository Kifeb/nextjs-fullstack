import Cookies from "js-cookie"
import Link from "next/link"
import Router from "next/router";

const Nav = () => {

    function logoutHandler(e){
        e.preventDefault()

        Cookies.remove("token");

        Router.replace("/auth/login")
    }

    return (
    <div>
        <ul style={{display: "flex", alignItems: 'center', gap: '60px', listStyleType: 'none'}}>
            <li><Link href="/post">DAFTAR</Link></li>
            <li><Link href="/post/input">ISI</Link></li>
            <li><a href="#" onClick={logoutHandler.bind(this)}>LOGOUT</a></li>
        </ul>
    </div>
  )
}

export default Nav