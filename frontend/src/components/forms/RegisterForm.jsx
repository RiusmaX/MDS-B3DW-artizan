import { useState } from 'react'

import { validateRegisterForm } from '../../services/formAuthValidation'
import { toast } from 'react-toastify'
import { Button, Input, Switch } from '@nextui-org/react'
import { useAuth } from '../../contexts/authContext'

function RegisterForm () {
  // Version simple
  // const [firstName, setFirstName] = useState('')
  // const [lastName, setLastName] = useState('')
  const { register, state: { loading } } = useAuth()
  const [isArtisan, setIsArtisan] = useState(false)

  const [errors, setErrors] = useState({
    firstName: null,
    lastName: null,
    username: null,
    email: null,
    password: null,
    artisanName: null
  })

  const [formData, setFormData] = useState({
    firstName: 'Marius',
    lastName: 'Sergent',
    username: 'test56',
    email: 'tooto@toto.fr',
    password: '123456',
    artisanName: 'Marius'
  })

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const _errors = validateRegisterForm(formData)
    if (_errors) {
      setErrors(_errors)
    } else {
      register(formData)
      toast.success('Inscription réussie')
    }
  }

  return (
    <>
      <h2 className='text-2xl font-bold my-8'>Inscription</h2>
      <form className='flex flex-col min-w-80 gap-3' onSubmit={handleSubmit}>
        <Input
          name='lastName'
          label='Nom : '
          placeholder='Entrez votre nom...'
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />
        <Input
          name='firstName'
          label='Prénom : '
          placeholder='Entrez votre prénom...'
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />
        <Input
          name='username'
          label="Nom d'utilisateur : "
          placeholder="Entrez votre nom d'utilisateur..."
          value={formData.username}
          onChange={handleChange}
        />
        <Input
          name='email'
          label='Email : '
          placeholder='Entrez votre adresse email...'
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          name='password'
          label='Mot de passe : '
          placeholder='Entrez un mot de passe...'
          value={formData.password}
          onChange={handleChange}
        />
        <Switch onValueChange={setIsArtisan} isSelected={isArtisan}>
          Je suis un artisan
        </Switch>
        {
          isArtisan &&
            <Input
              name='artisanName'
              label="Nom d'arisan : "
              placeholder="Entrez votre nom d'artisan..."
              value={formData.artisanName}
              onChange={handleChange}
            />
        }
        <Button
          type='submit'
          color='primary'
          isLoading={loading}
        >
          S'enregistrer
        </Button>
      </form>
    </>
  )
}

export default RegisterForm
