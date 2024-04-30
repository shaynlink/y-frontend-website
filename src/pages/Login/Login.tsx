import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/UsersContext'
import { login } from '../../services/AuthService'
import styles from './Login.module.scss'

export default function Login() {
  const navigate = useNavigate()
  const { setToken } = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onButtonClick = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    
    setErrorMessage('')
  
    if ('' === email) {
      setErrorMessage('Please enter your email')
    } else if (!/^[a-z-.0-9]+@([a-z-0-9]+\.)+[a-z-]{2,4}$/.test(email)) {
      setErrorMessage('Please enter a valid email')
    } else if ('' === password) {
      setErrorMessage('Please enter a password')
    } else if (password.length < 7) {
      setErrorMessage('The password must be 8 characters or longer')
    } else {
      setIsLoading(true)
      login(email, password)
        .then((response) => {
          if (response.data.result?.token) {
            window.localStorage.setItem('token', response.data.result.token);
            setToken?.(response.data.result.token);
            navigate('/')
          } else {
            setErrorMessage('Invalid credentials')
          }
          console.log('user:', response.data);
        })
        .catch((error) => {
          if (
            error.response.status === 401 &&
            error.response.data?.error?.name === 'ErrorResponse'
          ) {
            setErrorMessage('Invalid credentials')
          }
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Welcome back <span className={styles.waveLoop}>👋</span></h1>
        <form className={styles.form} onSubmit={onButtonClick}>
          <h3 className={styles.error}>{errorMessage}</h3>
          <label htmlFor="email" className={styles.label}>Enter your email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email here"
            onChange={(ev) => setEmail(ev.target.value)}
            className={styles.input}
          />
          <label htmlFor="password" className={styles.label}>Enter your password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password here"
            onChange={(ev) => setPassword(ev.target.value)}
            className={styles.input}
          />

          {!isLoading && (
            <button className={styles.btn} type="submit">
              Log In
            </button>
          )}

          {isLoading && (
            <div className={styles.loading}>
              <span className={styles.spinner} />
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
