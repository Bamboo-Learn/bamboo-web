import React from "react";

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

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      characterSetValue: '', // TODO: remove this and use redux
      message: ''
    };

    this.updateCharacterSetValue = this.updateCharacterSetValue.bind(this);
  }

  componentDidMount() {
    // TODO: we will get the values when the page loads initially
    // not here, this can be removed
  }

  // TODO: remove this and use redux
  updateCharacterSetValue(e) {
    this.setState({
      characterSetValue: e.target.value
    });
  }

  render() {
    const { characterSetValue, message } = this.state;
    return (
      <>
        <PageHeader>Settings</PageHeader>
        <PageBody>
          <Form>
            <FormRow label="Character Set">
              <FormSelect
                onChange={this.updateCharacterSetValue}
                value={characterSetValue}
                options={CHARACTER_SETS}
              />
            </FormRow>
            <FormRow>
              <Button
                onClick={() => { }}
                tab={true}
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
}

export { Settings };
