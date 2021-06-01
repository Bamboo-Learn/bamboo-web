import React from 'react';
import { parse } from 'query-string';

import { Mongodb } from 'app/classes';
import { Form, FormRow, FormText, Button } from 'app/elements';

import { Container, ContainerLeft, ContainerRight, Display } from '../components';

class Reset extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSplashOverlayOpen: true,
      passwordInput: {
        password: '',
        errors: []
      },
    }

    this.resetPassword = this.resetPassword.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isSplashOverlayOpen: false
      })
    }, 200);
  }

  updatePassword(e) {
    this.setState({
      passwordInput: {
        password: e.target.value,
        errors: []
      }
    });
  }

  resetPassword(e) {
    e.preventDefault();

    const { token, tokenId } = parse(this.props.location.search);
    const { valid, password } = this.isValidPassword();
    if (!valid) return;

    Mongodb.resetPassword(token, tokenId, password).then(() => {
      console.log("Successfully reset password!");
      window.location = '/';
    }).catch(err => {
      console.log("Error resetting password:", err);
    });
  }

  render() {
    const { passwordInput, isSplashOverlayOpen } = this.state;

    return (
      <>
        <Container isSplashOverlayOpen={isSplashOverlayOpen}>
          <ContainerLeft>
            <h1>{'Reset Password'}</h1>
            <Form>
              <FormRow
                icon="Padlock"
                errors={passwordInput.errors}
              >
                <FormText
                  onReturn={e => this.resetPassword(e)}
                  onChange={(e) => this.updatePassword(e)}
                  value={passwordInput.password}
                  placeholder="New Password"
                  isPassword={true}
                />
              </FormRow>
              <FormRow>
                <Button
                  size="form"
                  onClick={e => this.loginWithEmailAndPassword(e)}
                  tab={true}
                >
                  {'Reset'}
                </Button>
              </FormRow>
            </Form>
          </ContainerLeft>
          <ContainerRight>
            <Display />
          </ContainerRight>
        </Container>
      </>
    );
  }
}

export {
  Reset
};