import React from 'react'

import { Mongodb } from 'app/classes';
import { FormText, Button, FormRow, Form } from 'app/elements';

import { validateEmail, validatePassword } from '../../base';

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
    const { email, password, valid } = this.isValidEmailAndPassword();
    if (!valid) return;

    Mongodb.loginWithEmailAndPassword({ email, password }).then(() => {
      window.location = '/library';
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

    Mongodb.createAccountWithEmailAndPassword({ email, password }).then(data => {
      this.setState({
        message: 'Account created! Redirecting to application...'
      });

      Mongodb.loginWithEmailAndPassword({ email, password }).then(data => {
        window.location = '/library';
      }).catch(err => {
        console.log(err);
      });

    }).catch(err => {
      console.log(err);
      this.setState({
        emailInput: {
          email,
          errors: [`${err.error[0].toUpperCase()}${err.error.substring(1)}.`]
        },
      });
    });
  }

  sendPasswordResetEmail(e) {
    e.preventDefault();
    const { email, valid } = this.isValidEmail();
    if (!valid) return;

    Mongodb.sendPasswordResetEmail({ email }).then(data => {
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
        <FormRow
          message={message} // TODO: make this take a message
        >
          <Button
            size="form"
            onClick={e => this.createAccountWithEmailAndPassword(e)}
            tab={true}
          >
            {'Create Account'}
          </Button>
          <Button
            size="form"
            onClick={e => this.loginWithEmailAndPassword(e)}
            color={'orange'}
            tab={true}
          >
            {'Login'}
          </Button>
        </FormRow>
      </Form>
    );
  }
}

export { LoginForm };