import React from 'react';

import { Popup, Button, FormText, Slider } from '../../../elements';
import { isSet } from '../../../helpers';

import Style from './style.module.css';

class EditOverlay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      isLoading: false,
      phrase: {}
    }

    this.updateField = this.updateField.bind(this);
    this.shouldHideAutofill = this.shouldHideAutofill.bind(this);
    this.shouldShowDelete = this.shouldShowDelete.bind(this);
    this.cancel = this.cancel.bind(this);
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.autofill = this.autofill.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (Object.entries(this.props.editPhrase).length !== Object.entries(prevProps.editPhrase).length) {
      // if edit phrase was not set and is set now
      this.setState({
        isOpen: Object.entries(this.props.editPhrase).length > 0,
        phrase: this.props.editPhrase
      });
    }
  }

  updateField(e, field) {
    const phrase = this.state.phrase;
    phrase[field] = e.target.value;
    this.setState({
      phrase
    });
  }

  updateConfidence(e) {
    const phrase = this.state.phrase;
    phrase.confidence = parseFloat(e.target.value);
    this.setState({
      phrase
    });
  }

  shouldHideAutofill() {
    const phrase = this.state.phrase;
    if (!isSet(phrase.characters)) {
      return true;
    }
    if (isSet(phrase.pinyin) && isSet(phrase.english)) {
      return true;
    }
    return false;
  }

  shouldShowDelete() {
    return isSet(this.state.phrase._id);
  }

  closeWindow() {
    // close the window
    this.setState({
      isLoading: false,
      isOpen: false
    });
    setTimeout(() => {
      this.props.setEditPhrase({});
    }, 200);
  }

  setIsLoading(isLoading) {
    this.setState({
      isLoading
    });
  }

  cancel() {
    if (isSet(this.state.phrase._id)) {
      this.state.phrase.revert();
    }
    // close the window
    this.closeWindow();
  }

  async save() {
    this.setIsLoading(true);

    // adds the phrase to the db
    const phrase = this.state.phrase;
    const insertedPhrase = await this.props.mongodb.savePhrase(phrase);

    // adds the id to the phrase
    phrase.save(insertedPhrase);
    if (isSet(insertedPhrase.insertedId)) {
      // add phrase if newly insert to the phrases list
      this.props.changePhraseAction({ action: 'ADD', phrase });
    } // otherwise it the object has been changed so no need to update phrases list
    // TODO: should we use 'UPDATE' as a phrase action

    // close the window
    this.closeWindow();
  }

  async delete() {
    this.setIsLoading(true);

    // delete the phrase from the db
    const phrase = this.state.phrase;
    await this.props.mongodb.removePhrase(phrase);

    // delete it from the phrases list
    this.props.changePhraseAction({ action: 'DELETE', phrase });

    // close the window
    this.closeWindow();
  }

  async autofill() {
    this.setIsLoading(true);

    // get the pinyin and english for these characters
    const phrase = this.state.phrase;
    const characters = await this.props.mongodb.getCharacters(phrase.characters);

    // edit the phrase to include the new phrases
    const newPhrase = phrase.autofill(characters, {
      pinyin: !isSet(phrase.pinyin),
      english: !isSet(phrase.english)
    });

    // loading is false, set this phrase to be the new one (TODO: FIXME: is this how it should be?)
    this.setState({
      phrase: newPhrase,
      isLoading: false
    });
  }

  render() {
    const phrase = this.state.phrase;
    return (
      <Popup
        title={(!!phrase._id) ? "Edit Phrase" : "Add New Phrase"}
        isOpen={this.state.isOpen}
        action="Save"
        onSubmit={this.save}
        onClose={this.cancel}
        isLoading={this.state.isLoading}
      >
        {/* Chinese */}
        <FormText
          label="Chinese"
          onChange={(e) => this.updateField(e, 'characters')}
          value={phrase.characters}
          placeholder="中文"
          buttonIcon="Autofill"
          buttonLabel="Autofill"
          buttonVisible={!this.shouldHideAutofill()}
          buttonCallback={(e) => this.autofill()}
        />

        {/* Pinyin */}
        <FormText
          label="Pinyin"
          onChange={(e) => this.updateField(e, 'pinyin')}
          value={phrase.pinyin}
          placeholder="pinyin"
          buttonVisible={false}
        />

        {/* English TODO: use textarea instead */}
        <FormText
          label="English"
          onChange={(e) => this.updateField(e, 'english')}
          value={phrase.english}
          placeholder="english definition"
          buttonVisible={false}
        />

        {/* Category TODO: use Select, or if select doesn't work maybe make a new one called Suggest */}

        {/* Confidence / Status */}
        <Slider
          label={phrase.confidence === 10 ? 'Learned' : phrase.confidence === 0 ? 'To Learn' : 'Learning'}
          value={phrase.confidence}
          onChange={(e) => this.updateConfidence(e)}
        />

        {
          this.shouldShowDelete() &&
          <div className={Style.ButtonHolder}>
            <Button
              icon="Garbage"
              onClick={this.delete}
              hidden={!this.shouldShowDelete()}
              label="Delete"
              doubleClick={true}
              tab={false}
              color="red"
            />
          </div>
        }

      </Popup>
    );
  }
}

export default EditOverlay;
