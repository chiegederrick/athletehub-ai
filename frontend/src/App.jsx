import { useEffect, useState } from "react"
import axios from "axios"

import "./styles.css"

import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Filters from "./components/Filters"
import PlayerCard from "./components/PlayerCard"
import PlayerModal from "./components/PlayerModal"
import CompareView from "./components/CompareView"
import Leaderboards from "./components/Leaderboards"

const API =
"https://athletehub-backend-yvgn.onrender.com"

export default function App(){

const [players,setPlayers]=useState([])
const [dark,setDark]=useState(true)

const [search,setSearch]=useState("")
const [team,setTeam]=useState("ALL")

const [selected,setSelected]=useState(null)

const [compare1,setCompare1]=useState(null)
const [compare2,setCompare2]=useState(null)

const [tab,setTab]=useState("home")

useEffect(()=>{
loadPlayers()
},[])

const loadPlayers=async()=>{
const res=
await axios.get(`${API}/nba-players`)

setPlayers(res.data)
}

const filtered=
players.filter(p=>

(team==="ALL"||
p.TEAM_ABBREVIATION===team)

&&

p.PLAYER_NAME
.toLowerCase()
.includes(
search.toLowerCase()
)
)

return(

<div className={dark?"dark":"light"}>

<Navbar
tab={tab}
setTab={setTab}
dark={dark}
setDark={setDark}
/>

{tab==="home"&&(
<>
<Hero/>

<Filters
players={players}
search={search}
setSearch={setSearch}
team={team}
setTeam={setTeam}
/>

<div className="grid">

{filtered.map((p,i)=>(

<PlayerCard
key={i}
player={p}
setSelected={setSelected}
setCompare1={setCompare1}
setCompare2={setCompare2}
/>

))}

</div>

</>
)}

{tab==="compare"&&(

<CompareView
compare1={compare1}
compare2={compare2}
/>

)}

{tab==="leaderboard"&&(

<Leaderboards
players={players}
/>

)}

<PlayerModal
selected={selected}
setSelected={setSelected}
/>

</div>

)

}