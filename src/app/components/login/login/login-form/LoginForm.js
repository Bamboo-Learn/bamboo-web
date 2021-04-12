import React from 'react'

import { FormText, Button, FormMessage, FormRow, Form } from '../../../../elements';
import { validateEmail, validatePassword } from '../../base';

import Style from './style.module.css';

class LoginForm extends React.Component {
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
    const { mongodb } = this.props;
    const { email, password, valid } = this.isValidEmailAndPassword();
    if (!valid) return;

    mongodb.loginWithEmailAndPassword({ email, password }).then(data => {
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
    const { mongodb } = this.props;
    const { email, password, valid } = this.isValidEmailAndPassword();
    if (!valid) return;
    mongodb.createAccountWithEmailAndPassword({ email, password }).then(data => {
      this.setState({
        message: 'Account created! Redirecting to application...'
      });
      mongodb.loginWithEmailAndPassword({ email, password }).then(data => {
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
    const { mongodb } = this.props;
    const { email, valid } = this.isValidEmail();
    if (!valid) return;

    mongodb.sendPasswordResetEmail({ email }).then(data => {
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
      <Form>
        <FormRow
          icon="User"
          errors={emailInput.errors}
        >
          <FormText
            onReturn={e => this.loginWithEmailAndPassword(e)}
            onChange={(e) => this.updateEmail(e)}
            value={emailInput.email}
            placeholder="Email"
          />
        </FormRow>
        <FormRow
          icon="Padlock"
          errors={passwordInput.errors}
          linkOnClick={e => this.sendPasswordResetEmail(e)}
          linkText={'Reset Password'}
        >
          <FormText
            onReturn={e => this.loginWithEmailAndPassword(e)}
            onChange={(e) => this.updatePassword(e)}
            value={passwordInput.password}
            placeholder="Password"
            isPassword={true}
          />
        </FormRow>
        <FormRow>
          <Button
            className={Style.Button}
            onClick={e => this.loginWithEmailAndPassword(e)}
            color={'orange'}
            tab={true}
          >
            {'Login'}
          </Button>
          <Button
            className={Style.Button}
            onClick={e => this.createAccountWithEmailAndPassword(e)}
            tab={true}
          >
            {'Create Account'}
          </Button>
        </FormRow>
        <FormMessage>{message}</FormMessage>
      </Form>
    );
  }
}

export { LoginForm };