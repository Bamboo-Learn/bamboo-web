

export function validateEmail({ email }) {
  // eslint-disable-next-line
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const valid = re.test(String(email).toLowerCase());
  return {
    email: String(email).toLowerCase().trim(),
    errors: !valid ? ['Email is invalid.'] : []
  }
  // TODO: 'Email already exists, try resetting password'
}

export function validatePassword({ password }) {
  // if it is less than 8 characters
  const valid = password.length >= 8;
  return {
    password,
    errors: !valid ? ['Password must be at least 8 characters long.'] : []
  }
}
