

export type DisplayCharacterSetOptions = 'simp' | 'trad';

// Settings Actions


type SettingsActionType = {
  type: string,
  displayCharacterSet?: DisplayCharacterSetOptions
}

const CHANGE_DISPLAY_CHARACTER_SETTING = 'CHANGE_DISPLAY_CHARACTER_SETTING';

export const SettingsActions = {
  changeCharacterSet: (displayCharacterSet: DisplayCharacterSetOptions): SettingsActionType => ({
    type: CHANGE_DISPLAY_CHARACTER_SETTING,
    displayCharacterSet
  })
}

// Settings Reducer

export type SettingsStateType = {
  displayCharacterSet: DisplayCharacterSetOptions
}

const initSettings: SettingsStateType = {
  // user data
  displayCharacterSet: 'simp',
};

export const settingsReducer = (state = initSettings, action: SettingsActionType) => {
  switch (action.type) {
    case CHANGE_DISPLAY_CHARACTER_SETTING:
      return { ...state, ...{ displayCharacterSet: action.displayCharacterSet } };
    default:
      return state;
  }
}
