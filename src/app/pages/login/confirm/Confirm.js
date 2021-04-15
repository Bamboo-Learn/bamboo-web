// import React from 'react';
// import {
//   Stitch,
//   UserPasswordAuthProviderClient,
// } from 'mongodb-stitch-browser-sdk';
// import { Link } from 'react-router-dom';
// import { parse } from 'query-string';

// import { Popup } from 'app/elements';
// import { LoginBase } from '../base.js';

// import Style from './style.module.css';

// // DEPRICATED NOTES
// // this one should actually be part of the WelcomeOverlay I think
// // but for now it's fine, just have it encourage installing the Chrome app
// // and have a continue to web app button

// class Confirm extends LoginBase {
//   constructor(props) {
//     super(props);

//     Stitch.initializeDefaultAppClient('bamboo-rwymp');
//     const { token, tokenId } = parse(this.props.location.search);

//     const emailPassClient = Stitch.defaultAppClient.auth.getProviderClient(UserPasswordAuthProviderClient.factory);

//     emailPassClient.confirmUser(token, tokenId);
//     // if this token is old then resend the confirmation email with resendConfirmationEmail()
//   }

//   render() {
//     return (
//       <>
//         <Popup
//           title="Email confirmed!"
//           action="Install Chrome Extension"
//           onSubmit={this.openChromeStore}
//           isOpen={() => true}
//         >
//           <div className={Style.Message}>{'Welcome to Bamboo! You can now set up Bamboo in Chrome.'}</div>
//           {/* <Slideshow /> */}
//           <p className={Style.Additional}>
//             <Link to="/">
//               {'Continue to web app'}
//             </Link>
//           </p>
//         </Popup>
//       </>
//     );
//   }
// }

// export {
//   Confirm
// };