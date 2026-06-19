export default function PlayerCard({
player,
setSelected,
setCompare1,
setCompare2
}){

return(

<div
className="card"
onClick={()=>
setSelected(player)
}
>

<h3>

{player.PLAYER_NAME}

</h3>

<p>

{player.TEAM_ABBREVIATION}

</p>

<p>

PTS {player.PTS}

</p>

<p>

REB {player.REB}

</p>

<p>

AST {player.AST}

</p>

<button
onClick={(e)=>{

e.stopPropagation()

setCompare1(player)

}}
>

Compare 1

</button>

<button
onClick={(e)=>{

e.stopPropagation()

setCompare2(player)

}}
>

Compare 2

</button>

</div>

)

}