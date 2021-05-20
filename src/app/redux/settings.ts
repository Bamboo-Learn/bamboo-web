
// Settings Types

export type SettingsStateType = {
  displayCharacterSet: 'simp' | 'trad'
}

type SettingsActionType = {
  type: number,
  displayCharacterSet?: string
}

// Settings Actions


const CHANGE_DISPLAY_CHARACTER_SETTING = 6;

// Settings Reducer

const initSettings: SettingsStateType = {
  // user data
  displayCharacterSet: 'trad',
};

export const settingsReducer = (state = initSettings, action: SettingsActionType) => {
  switch (action.type) {
    case CHANGE_DISPLAY_CHARACTER_SETTING:
      return { ...state, ...{ displayCharacterSet: action.displayCharacterSet } };
    default:
      return state;
  }
}