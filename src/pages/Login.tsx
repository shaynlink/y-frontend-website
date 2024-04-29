import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UsersContext'
import { login } from '../services/AuthService'

export default function Login() {
  const navigate = useNavigate()
  const { setToken } = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const onButtonClick = () => {
    setEmailError('')
    setPasswordError('')
  
    if ('' === email) {
      setEmailError('Please enter your email')
    } else if (!/^[a-z-.0-9]+@([a-z-0-9]+\.)+[a-z-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email')
    } else if ('' === password) {
      setPasswordError('Please enter a password')
    } else if (password.length < 7) {
      setPasswordError('The password must be 8 characters or longer')
    } else {
      login(email, password)
        .then((response) => {
          if (response.data.result?.token) {
            window.localStorage.setItem('token', response.data.result.token);
            setToken?.(response.data.result.token);
            navigate('/')
          } else {
            setEmailError('Invalid credentials')
          }
          console.log('user:', response.data);
        })
        .catch((error) => {
          if (
            error.response.status === 401 &&
            error.response.data?.error?.name === 'ErrorResponse'
          ) {
            setEmailError('Invalid credentials')
          }
        })
      // loginFn(email, password)
      //   .then((user) => {
      //     if (user) {
      //       setUser?.(user)
      //       navigate('/')
      //     } else {
      //       setEmailError('Invalid credentials')
      //     }
      //   })
    }
  }

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
      </div>
    </div>
  )
}
