
// Settings Types

export type SettingsStateType = {
  displayCharacterSet: 'simp' | 'trad'
}

type SettingsActionType = {
  type: string,
  displayCharacterSet?: 'simp' | 'trad'
}

// Settings Actions

const CHANGE_DISPLAY_CHARACTER_SETTING = 'CHANGE_DISPLAY_CHARACTER_SETTING';

export const changeCharacterSet = (displayCharacterSet: 'trad' | 'simp'): SettingsActionType => ({
  type: CHANGE_DISPLAY_CHARACTER_SETTING,
  displayCharacterSet
});

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