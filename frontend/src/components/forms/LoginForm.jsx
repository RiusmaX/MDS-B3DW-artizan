import { useState } from 'react'
import { useAuth } from '../../contexts/authContext'
import { Button, Input } from '@nextui-org/react'

function LoginForm () {
  const [formData, setFormData] = useState({
    identifier: 'jeanmich@mail.com',
    password: 'jeanmich'
  })

  const { state: { error, loading }, login } = useAuth()

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    login(formData)
  }

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
      <h2>SE CONNECTER</h2>
      <Input
        type='email'
        name='identifier'
        label='Email : '
        placeholder='mail@provider.com'
        value={formData.identifier}
        onChange={handleChange}
      />
      <Input
        type='password'
        name='password'
        label='Mot de passe : '
        placeholder='*********'
        value={formData.password}
        onChange={handleChange}
      />
      {
        error && <p style={{ color: 'red' }}>{error}</p>
      }
      <Button
        isLoading={loading}
        type='submit'
        color='primary'
      >
        Se connecter
      </Button>
    </form>
  )
}

export default LoginForm
