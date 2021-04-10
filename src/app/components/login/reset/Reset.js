// import React from 'react';
// import {
//   Stitch,
//   UserPasswordAuthProviderClient,
// } from 'mongodb-stitch-browser-sdk';
// import { parse } from 'query-string';

// import { Text } from '../../../elements/form/Text.js';
// import { Popup } from '../../../elements/popup/Popup.js';
// import { LoginBase } from '../base.js';

// import Style from './style.module.css';

// class Reset extends LoginBase {
//   constructor(props) {
//     super(props);

//     this.client = Stitch.initializeDefaultAppClient('bamboo-rwymp');
//     this.emailPassClient = Stitch.defaultAppClient.auth.getProviderClient(UserPasswordAuthProviderClient.factory);

//     this.resetPassword = this.resetPassword.bind(this);
//   }

//   resetPassword(e) {
//     e.preventDefault();

//     const { token, tokenId } = parse(this.props.location.search);
//     const { valid, password } = this.isValidPassword();
//     if (!valid) return;

//     this.emailPassClient.resetPassword(token, tokenId, password).then(() => {
//       console.log("Successfully reset password!");
//       window.location = '/';
//     }).catch(err => {
//       console.log("Error resetting password:", err);
//     });
//   }

//   render() {
//     const { passwordInput } = this.state;

//     return (
//       <>
//         <Popup
//           title="Reset Password"
//           action="Reset Password"
//           isOpen={() => true}
//           onSubmit={e => this.resetPassword(e)}
//         >
//           <div className={Style.Errors}>
//             {passwordInput.errors.map((err, i) => (<p key={`password-error-${i}`} className={Style.Error}> {err} </p>))}
//           </div>
//           <Text
//             icon="Padlock"
//             onChange={(e) => this.updatePassword(e)}
//             value={passwordInput.password}
//             placeholder="New Password"
//             buttonVisible={false}
//             isPassword={true}
//             isError={passwordInput.errors.length > 0}
//           />
//         </Popup>
//       </>
//     );
//   }
// }

// export {
//   Reset
// };