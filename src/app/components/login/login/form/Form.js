import React from 'react'

import { Mongodb } from '../../../../helpers';
import { Text } from '../../../../elements';
import { validateEmail, validatePassword } from '../../base';

import Style from './style.module.css';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emailInput: {
        email: '',
        errors: []
      },
      passwordInput: {
        password: '',
        errors: []
      },
      message: ''
    }

    this.createAccountWithEmailAndPassword = this.createAccountWithEmailAndPassword.bind(this);
    this.loginWithEmailAndPassword = this.loginWithEmailAndPassword.bind(this);
    this.sendPasswordResetEmail = this.sendPasswordResetEmail.bind(this);
  }


  componentDidMount() {
    this.mongodb = new Mongodb();
  }

  updateEmail(e) {
    this.setState({
      emailInput: {
        email: e.target.value,
        errors: []
      }
    });
  }

  updatePassword(e) {
    this.setState({
      passwordInput: {
        password: e.target.value,
        errors: []
      }
    });
  }

  // returns true when valid, otherwise sets the state with errors and returns false
  isValidEmailAndPassword() {
    const emailInput = validateEmail(this.state.emailInput);
    const passwordInput = validatePassword(this.state.passwordInput);
    if (emailInput.errors.length > 0 || passwordInput.errors.length > 0) {
      this.setState({
        emailInput,
        passwordInput
      });
      return {
        valid: false,
        email: emailInput.email,
        password: passwordInput.password
      };
    }
    return {
      valid: true,
      email: emailInput.email,
      password: passwordInput.password
    };
  }

  isValidEmail() {
    const emailInput = validateEmail(this.state.emailInput);
    let valid = true;
    if (emailInput.errors.length > 0) {
      this.setState({
        emailInput
      });
      valid = false;
    }
    return {
      valid,
      email: emailInput.email
    };
  }

  isValidPassword() {
    const passwordInput = validatePassword(this.state.passwordInput);
    let valid = true;
    if (passwordInput.errors.length > 0) {
      this.setState({
        passwordInput
      });
      valid = false;
    }
    return {
      valid,
      password: passwordInput.password
    };
  }

  loginWithEmailAndPassword(e) {
    e.preventDefault();
    const { email, password, valid } = this.isValidEmailAndPassword();
    if (!valid) return;

    this.mongodb.loginWithEmailAndPassword({ email, password }).then(data => {
      window.location = '/';
    }).catch(err => {
      this.setState({
        emailInput: {
          email,
          errors: ['Invalid email or password.']
        },
        passwordInput: {
          password,
          errors: ['Create an account if you do not have one, or reset password if you do.']
        }
      });
    });
  }

  createAccountWithEmailAndPassword(e) {
    e.preventDefault();
    const { email, password, valid } = this.isValidEmailAndPassword();
    if (!valid) return;
    this.mongodb.createAccountWithEmailAndPassword({ email, password }).then(data => {
      this.setState({
        message: 'Account created! Redirecting to application...'
      });
      this.mongodb.loginWithEmailAndPassword({ email, password }).then(data => {
        window.location = '/';
      }).catch(err => {
        console.log(err);
      });
    }).catch(err => {
      console.log(err);
    });
  }

  sendPasswordResetEmail(e) {
    e.preventDefault();
    const { email, valid } = this.isValidEmail();
    if (!valid) return;

    this.mongodb.sendPasswordResetEmail({ email }).then(data => {
      this.setState({
        message: 'Reset email has been sent.'
      });
    }).catch(err => {
      console.log(err);
    });
  }

  render() {

    const { emailInput, passwordInput, message } = this.state;
    return (
      <div className={Style.Form}>
        <div className={Style.Errors}>
          {emailInput.errors.map((err, i) => (<p key={`email-error-${i}`} className={Style.Error}> {err} </p>))}
          {passwordInput.errors.map((err, i) => (<p key={`password-error-${i}`} className={Style.Error}> {err} </p>))}
        </div>

        <Text
          icon="User"
          onChange={(e) => this.updateEmail(e)}
          value={emailInput.email}
          placeholder="Email"
          buttonVisible={false}
          isError={emailInput.errors.length > 0}
        />

        <Text
          icon="Padlock"
          onChange={(e) => this.updatePassword(e)}
          value={passwordInput.password}
          placeholder="Password"
          buttonVisible={false}
          isPassword={true}
          isError={passwordInput.errors.length > 0}
        />

        {message !== '' && <div className={Style.Message}>{message}</div>}

        <p className={Style.Additional}>
          <span onClick={e => this.sendPasswordResetEmail(e)}>
            {'Reset Password'}
          </span>
        </p>

        <button onClick={e => this.loginWithEmailAndPassword(e)} className={Style.login}>
          {'Login'}
        </button>

        <button onClick={e => this.createAccountWithEmailAndPassword(e)}>
          {'Create Account'}
        </button>

      </div>
    );
  }
}

export { Form };