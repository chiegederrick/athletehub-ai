export default function Filters({
players,
search,
setSearch,
team,
setTeam
}){

const teams=
[
"ALL",

...new Set(
players.map(
p=>
p.TEAM_ABBREVIATION
)

)

]

return(

<div className="filters">

<input
placeholder="Search"
value={search}
onChange={(e)=>
setSearch(
e.target.value
)}
/>

<select
value={team}
onChange={(e)=>
setTeam(
e.target.value
)}
>

{teams.map(
t=>

<option>

{t}

</option>

)}

</select>

</div>

)

}