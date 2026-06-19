export default function Leaderboards({
players
}){

const pts=
[...players]
.sort((a,b)=>
b.PTS-a.PTS
)
.slice(0,5)

return(

<div>

<h1>

🏆 Top 5

</h1>

{pts.map((p,i)=>(

<p key={i}>

{i+1}

{p.PLAYER_NAME}

{p.PTS}

</p>

))}

</div>

)

}