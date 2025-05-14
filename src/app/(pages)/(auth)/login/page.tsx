import Form from "next/form"


async function  loginUser(){
    const response = await fetch("", {
        method: "POST",
        body: JSON.stringify({})
    })
}

export default function Login(){
    return(
        <Form action={loginUser} autoComplete="on">

        </Form>
    )
}