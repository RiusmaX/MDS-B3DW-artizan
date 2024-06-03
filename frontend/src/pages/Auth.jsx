import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RegisterForm from '../components/forms/RegisterForm'
import LoginForm from '../components/forms/LoginForm'
import { useAuth } from '../contexts/authContext'

function Auth () {
  const [isRegister, setIsRegister] = useState(false)
  const navigate = useNavigate()

  const { state: { jwt, user } } = useAuth()

  useEffect(() => {
    if (user && jwt) {
      navigate('/dashboard')
    }
  }, [user, jwt])

  return (
    <div className='container mx-auto max-w-fit'>
      {
        isRegister
          ? <RegisterForm />
          : <LoginForm />
      }
      <a onClick={() => setIsRegister(!isRegister)} className='cursor-pointer'>
        {isRegister ? "J'ai déjà un compte" : "Je n'ai pas de compte"}
      </a>
    </div>
  )
}

export default Auth
