import { useState } from "react"

import Login from "./auth/Login"
import Register from "./auth/Register"

import Home from "./pages/Home"
import Compare from "./pages/Compare"
import Leaderboard from "./pages/Leaderboard"

import Sidebar from "./components/Sidebar"

import "./styles.css"

export default function App(){

const [user,setUser]=useState(null)

const [page,setPage]=useState("home")

const [mode,setMode]=useState("login")

if(!user){

return(

<div className="auth">

<div className="authBox">

<div className="brand">

StatShot

</div>

{

mode==="login"

?

<Login
setUser={setUser}
/>

:

<Register/>

}

<button
className="switch"

onClick={()=>

setMode(

mode==="login"

?

"register"

:

"login"

)

}

>

{

mode==="login"

?

"Create Account"

:

"Login"

}

</button>

</div>

</div>

)

}

return(

<div className="app">

<Sidebar
page={page}
setPage={setPage}
/>

<div className="content">

{

page==="home"

&&

<Home user={user}/>

}

{

page==="compare"

&&

<Compare/>

}

{

page==="leaderboard"

&&

<Leaderboard/>

}

</div>

</div>

)

}