import axios from "axios"

const API=
"https://athletehub-backend-yvgn.onrender.com"

export default function Register(){

async function submit(e){

e.preventDefault()

await axios.post(
`${API}/register`,
{
email:
e.target.email.value,

password:
e.target.password.value
}
)

alert(
"Account Created"
)

}

return(

<form
onSubmit={submit}
>

<input
name="email"
placeholder="Email"
/>

<input
name="password"
type="password"
/>

<button>

Register

</button>

</form>

)

}