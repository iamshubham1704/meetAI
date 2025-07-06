"use client"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const {
    data: session,
  } = authClient.useSession()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = () => {
    authClient.signUp.email({
      email,
      name,
      password,
    }, {
      onError: () => {
        window.alert("Something went wrong")
      },
      onSuccess: () => {
        window.alert("Siccess")
      }
    })
  }
  const onLogIn = () => {
    authClient.signIn.email({
      email,
      password,
    }, {
      onError: () => {
        window.alert("Something went wrong")
      },
      onSuccess: () => {
        window.alert("Siccess")
      }
    })
  }

  if (session) {
    return (
      <div className="flex flex-col p-4 gap-y-4">
        <p>Logged In as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>SigOut</Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-col p-4 gap-y-4">
        <input placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={onSubmit}>Create User</Button>
      </div>
      <div className="flex flex-col p-4 gap-y-4">
        <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={onLogIn}>Log IN</Button>
      </div>
    </div>
  )
}
