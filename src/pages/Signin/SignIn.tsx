import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UsersContext';
import { SignInFn, checkUserExists } from '../../services/AuthService';
import styles from '../Login/Login.module.scss';

interface SignInProps {
  email: string;
  password: string;
  username: string;
  emailError: string;
  passwordError: string;
  usernameError: string;
  isLoading: boolean;
}

const SignIn = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [values, setValues] = useState<SignInProps>({
    email: '',
    password: '',
    username: '',
    emailError: '',
    passwordError: '',
    usernameError: '',
    isLoading: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const validateInput = async () => {
    let errors = { emailError: '', passwordError: '', usernameError: '' };
    if (!values.email) {
      errors.emailError = 'Please enter your email';
    } else if (!/^[a-z-.]+@([a-z-]+\.)+[a-z-]{2,4}$/.test(values.email)) {
      errors.emailError = 'Please enter a valid email';
    } else {
      const emailExists = await checkUserExists(values.email, 'email');
      if (emailExists) {
        errors.emailError = 'Email is already taken';
      }
    }

    if (!values.username) {
      errors.usernameError = 'Please enter a username';
    } else {
      const usernameExists = await checkUserExists(values.username, 'username');
      if (usernameExists) {
        errors.usernameError = 'Username is already taken';
      }
    }

    if (!values.password) {
      errors.passwordError = 'Please enter a password';
    } else if (values.password.length < 7) {
      errors.passwordError = 'The password must be 8 characters or longer';
    }
    return errors;
  };

  const onButtonClick = async () => {
    const errors = await validateInput();
    setValues({ ...values, ...errors, isLoading: true });

    if (!errors.emailError && !errors.passwordError && !errors.usernameError) {
      SignInFn(values.email, values.password, values.username)
        .then(user => {
          if (user) {
            setUser(user);
            navigate('/');
          } else {
            setValues({ ...values, passwordError: 'Invalid credentials', isLoading: false });
          }
        })
        .catch(error => {
          console.error('Login failed:', error);
          setValues({ ...values, passwordError: 'Login failed. Please try again.', isLoading: false });
        });
    } else {
      setValues({ ...values, isLoading: false });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>   Welcome <span className={styles.waveLoop}>👋   </span></h1>
          <form className={styles.form}>
          <h3 className={styles.error}>{}</h3>
          <label htmlFor="email" className={styles.label}>Enter your email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            placeholder="Enter your email here"
            onChange={() => handleInputChange}
            className={styles.input}
          />
          <label htmlFor="username" className={styles.label}>Choose a username</label>
          <input
            type="text"
            name="username"
            value={values.username}
            placeholder="Choose a username"
            onChange={() => handleInputChange}
            className={styles.input}
          />
          <label htmlFor="password" className={styles.label}>Enter your password</label>
          <input
            type="password"
            name="password"
            value={values.password}
            placeholder="Enter your password here"
            onChange={() => handleInputChange}
            className={styles.input}
          />

          {!values.isLoading && (
            <button className={styles.btn} disabled={values.isLoading} onClick={onButtonClick}>
              Sign In
            </button>
          )}

          {!values.isLoading && (
            <button className={styles.btn} onClick={() => navigate('/Login')}>
              Log In
            </button>
          )}

          {values.isLoading && (
            <div className={styles.loading}>
              <span className={styles.spinner} />
            </div>
          )}
          </form>
      </div>
    </div>
  );
};

export default SignIn;
