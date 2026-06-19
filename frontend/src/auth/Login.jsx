import axios from "axios"

const API=
"https://athletehub-backend-yvgn.onrender.com"

export default function Login({
setUser
}){

async function submit(e){

e.preventDefault()

const email=
e.target.email.value

const password=
e.target.password.value

const res=
await axios.post(
`${API}/login`,
{
email,
password
}
)

if(
res.data.token
){

setUser(
{
email
}
)

}

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
placeholder="Password"
/>

<button>

Login

</button>

</form>

)

}