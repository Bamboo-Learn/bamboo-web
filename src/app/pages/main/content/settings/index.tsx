import React, { FC, } from "react"; // useState
import { connect } from 'react-redux';

import { ReducerStateType, SettingsStateType, SettingsActions } from 'app/redux';
import { PageHeader, PageBody, Form, FormRow, FormSelect, FormMessage, Button } from 'app/elements';

const CHARACTER_SETS = [
  {
    value: 'trad',
    label: 'Traditional'
  },
  {
    value: 'simp',
    label: 'Simplified'
  }
];

type SettingsPropTypes = {
  settings: SettingsStateType,
  changeCharacterSet: (displayCharacterSet: 'trad' | 'simp') => void
}

const RawSettings: FC<SettingsPropTypes> = ({ settings: { displayCharacterSet }, changeCharacterSet }) => {
  // const [message, setMessage] = useState<string>('');
  const message = '';

  return (
    <>
      <PageHeader>{'Settings'}</PageHeader>
      <PageBody>
        <Form>
          <FormRow label="Character Set">
            <FormSelect
              onChange={changeCharacterSet}
              value={displayCharacterSet}
              options={CHARACTER_SETS}
            />
          </FormRow>
          <FormRow>
            <Button
              onClick={() => { }}
              tab={true}
              // TODO: disabled when no changes, or unsaveable
              // color={'grey'} when no changes
              size="form"
            >
              {"Update"}
            </Button>
            <Button
              onClick={() => { }}
              color={'grey'}
              size="form"
            >
              {'Cancel'}
            </Button>
          </FormRow>
          <FormMessage>{message}</FormMessage>
        </Form>
      </PageBody>
    </>
  );
}

const mapStateToProps = (state: ReducerStateType) => {
  return {
    settings: state.settings
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  changeCharacterSet: (displayCharacterSet: 'trad' | 'simp') => {
    dispatch(SettingsActions.changeCharacterSet(displayCharacterSet))
  }
});

export const Settings = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawSettings);

