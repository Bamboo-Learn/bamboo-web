import React from "react";

import { PageHeader, PageBody, Form, FormRow, FormSelect, FormMessage, Button } from "app/elements";

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
      characterSetValue: '',
      message: ''
    };

    this.updateCharacterSetValue = this.updateCharacterSetValue.bind(this);
  }

  componentDidMount() {
    // get current values
  }

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
              <Button onClick={() => { }} tab={true}>
                {"Update"}
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
