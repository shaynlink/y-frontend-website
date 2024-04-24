import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UsersContext';
import { SignInFn, checkUserExists } from '../services/AuthService';

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
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Sign In</div>
      </div>
      <br />
      <div className="inputContainer">
        <input
          value={values.email}
          name="email"
          placeholder="Enter your email here"
          onChange={handleInputChange}
          className="inputBox"
        />
        <label className="errorLabel">{values.emailError}</label>
      </div>
      <br />
      <div className="inputContainer">
        <input
          value={values.username}
          name="username"
          placeholder="Choose a username"
          onChange={handleInputChange}
          className="inputBox"
        />
        <label className="errorLabel">{values.usernameError}</label>
      </div>
      <br />
      <div className="inputContainer">
        <input
          value={values.password}
          name="password"
          placeholder="Enter your password here"
          onChange={handleInputChange}
          className="inputBox"
        />
        <label className="errorLabel">{values.passwordError}</label>
      </div>
      <br />
      <div className="inputContainer">
        <button disabled={values.isLoading} className="inputButton" onClick={onButtonClick}>
          {values.isLoading ? 'Loading...' : 'Sign In'}
        </button>
      </div>
    </div>
  );
};

export default SignIn;
