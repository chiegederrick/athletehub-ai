export default function Sidebar({
page,
setPage
}){

return(

<div className="sidebar">

<div className="logo">

StatShot

</div>

<button
onClick={()=>
setPage("home")
}
>

Home

</button>

<button
onClick={()=>
setPage("compare")
}
>

Compare

</button>

<button
onClick={()=>
setPage("leaderboard")
}
>

Leaderboard

</button>

</div>

)

}