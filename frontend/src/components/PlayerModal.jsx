export default function PlayerModal({
selected,
setSelected
}){

if(!selected)
return null

return(

<div
className="overlay"
onClick={()=>
setSelected(null)
}
>

<div className="modal">

<h1>

{selected.PLAYER_NAME}

</h1>

<h2>

{selected.TEAM_ABBREVIATION}

</h2>

<p>

PTS:
{selected.PTS}

</p>

<p>

REB:
{selected.REB}

</p>

<p>

AST:
{selected.AST}

</p>

</div>

</div>

)

}