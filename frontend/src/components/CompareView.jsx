export default function CompareView({
compare1,
compare2
}){

return(

<div>

<h1>

Compare

</h1>

{compare1&&compare2?

<div className="compare">

<div>

<h2>

{compare1.PLAYER_NAME}

</h2>

PTS:
{compare1.PTS}

</div>

<div>

<h2>

{compare2.PLAYER_NAME}

</h2>

PTS:
{compare2.PTS}

</div>

</div>

:

<p>

Choose players

</p>

}

</div>

)

}