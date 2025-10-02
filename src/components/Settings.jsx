import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from 'react';

export function Settings() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
      let nameFromStorage = localStorage.getItem("app_name") || "";
      let emailFromStorage = localStorage.getItem("app_email") || "";
      setName(nameFromStorage);
      setEmail(emailFromStorage)
  }, [])

  function handleNameChange(e) {
    setName(e.target.value);
    localStorage.setItem("app_name", e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
    localStorage.setItem("app_email", e.target.value);
  }


  return (
    <div className="p-10 flex gap-20 h-full items-center">
      <div className="flex-1">
        <div className="mb-10">
          <Label className="mb-2" htmlFor="email">Name</Label>
          <Input value={name} onChange={(e) => handleNameChange(e)} type="name" id="email" placeholder={name} />
        </div>
        <div>
          <Label className="mb-2" htmlFor="email">Email</Label>
          <Input value={email} onChange={(e) => handleEmailChange(e)} type="email" id="email" placeholder={email}/>
        </div>
      </div>
      <div className="flex-1">
        <h1 className="mb-10">Name: {name}</h1>
        <h1 className="mb-10">Email: {email}</h1>
      </div>
    </div>
  )
}
