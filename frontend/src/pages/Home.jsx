import { useEffect,useState } from "react"

import axios from "axios"

const API=
"https://athletehub-backend-yvgn.onrender.com"

export default function Home({

user

}){

const[
players,
setPlayers
]

=
useState([])

const[
search,
setSearch
]

=
useState("")

const[
favorites,
setFavorites
]

=
useState([])

useEffect(()=>{

load()

loadFav()

},[])

async function load(){

const res=

await axios.get(
`${API}/nba-players`
)

setPlayers(
res.data
)

}

async function loadFav(){

const res=

await axios.get(
`${API}/favorites/${user.email}`
)

setFavorites(
res.data
)

}

async function fav(name){

await axios.post(
`${API}/favorite`,
{
email:
user.email,

player:
name
}
)

loadFav()

}

return(

<div>

<div className="header">

<input
placeholder="Search"
value={search}
onChange={
e=>

setSearch(
e.target.value
)
}
/>

</div>

<div className="featured">

{

players

.filter(
p=>

p.PLAYER_NAME

.toLowerCase()

.includes(

search

.toLowerCase()

)

)

.slice(0,20)

.map(

p=>

<div
className="player"
>

<h2>

{p.PLAYER_NAME}

</h2>

<p>

{p.TEAM_ABBREVIATION}

</p>

<button
onClick={()=>
fav(
p.PLAYER_NAME
)
}
>

★ Favorite

</button>

</div>

)

}

</div>

<h2>

Favorites

</h2>

{

favorites.map(

f=>

<div>

{f[0]}

</div>

)

}

</div>

)

}