import { Button, Input } from '@nextui-org/react'
import { useState } from 'react'

function UpdateProfile ({ user, onUpdate, isLoading, onClose }) {
  console.log(user)
  const [formData, setFormData] = useState({
    email: user.email,
    username: user.username
  })

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onUpdate(formData, user.id)
    onClose()
  }
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
      <Input
        type='email'
        name='email'
        label='Email : '
        placeholder='mail@provider.com'
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        name='username'
        label="Nom d'utilisateur : "
        placeholder="Entrez votre nom d'utilisateur..."
        value={formData.username}
        onChange={handleChange}
      />
      <Button
        type='submit'
        color='primary'
        isLoading={isLoading}
      >
        Modifier
      </Button>
    </form>
  )
}

export default UpdateProfile
