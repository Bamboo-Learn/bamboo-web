


// Settings Actions

type SettingsActionType = {
  type: string,
  displayCharacterSet?: 'simp' | 'trad'
}

const CHANGE_DISPLAY_CHARACTER_SETTING = 'CHANGE_DISPLAY_CHARACTER_SETTING';

export const SettingsActions = {
  changeCharacterSet: (displayCharacterSet: 'trad' | 'simp'): SettingsActionType => ({
    type: CHANGE_DISPLAY_CHARACTER_SETTING,
    displayCharacterSet
  })
}

// Settings Reducer

export type SettingsStateType = {
  displayCharacterSet: 'simp' | 'trad'
}

const initSettings: SettingsStateType = {
  // user data
  displayCharacterSet: 'simp', // 'trad'
};

export const settingsReducer = (state = initSettings, action: SettingsActionType) => {
  switch (action.type) {
    case CHANGE_DISPLAY_CHARACTER_SETTING:
      return { ...state, ...{ displayCharacterSet: action.displayCharacterSet } };
    default:
      return state;
  }
}
