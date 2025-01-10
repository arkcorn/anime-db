import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createLazyFileRoute('/register')({
  component: RouteComponent,
})

function RouteComponent() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
  }

  return <div>
    <form onSubmit={handleSubmit}>
      <input type='email'
      value={formData.email}
      placeholder='Email'
      onChange={(e) => {
        setFormData({...formData, email: e.target.value})
      }}></input>
      <input type='password'
      value={formData.password}
      placeholder='Password'
      onChange={(e) => {
        setFormData({...formData, password: e.target.value})
      }}></input>
      <button type='submit'>Submit</button>
    </form>
  </div>
}
