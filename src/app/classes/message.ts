

type MessageType = {
  severity: 'ERROR' | 'MESSAGE'
  code: string,
  message: string
}

export class Message implements MessageType {
  severity: 'MESSAGE'
  code: string
  message: string

  constructor({ code, message }: MessageType) {
    this.severity = 'MESSAGE';
    this.code = code;
    this.message = message;
  }
}

export class Error implements MessageType {

  // TODO: this might be overkill

  severity: 'ERROR'
  code: string
  message: string

  static NO_USER_ID = 'NO_USER_ID';
  static NOT_LOGGED_IN = 'NOT_LOGGED_IN';

  constructor({ code, message }: { code: string, message: string }) {
    this.severity = 'ERROR';
    this.code = code;
    this.message = message;
  }
}