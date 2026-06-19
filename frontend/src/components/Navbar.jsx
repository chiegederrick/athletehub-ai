export default function Navbar({
tab,
setTab,
dark,
setDark
}){

return(

<div className="nav">

<div className="logo">

🏀 StatShot

</div>

<div>

<button onClick={()=>setTab("home")}>
Home
</button>

<button onClick={()=>setTab("compare")}>
Compare
</button>

<button onClick={()=>setTab("leaderboard")}>
Leaderboard
</button>

</div>

<button
onClick={()=>
setDark(!dark)
}
>

{dark?"☀️":"🌙"}

</button>

</div>

)

}