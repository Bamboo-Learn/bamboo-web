

import React from 'react';
import { BSON } from 'realm-web';
import { connect } from 'react-redux';

import { Popup } from 'app/elements';
import { Mongodb, isSet, Phrase, makeNewPhrase } from 'app/helpers';
import { LibraryStateType, ReducerStateType } from 'app/redux';

import { EditForm } from './edit-form';

type EditOverlayPropTypes = {
  editPhraseID: BSON.ObjectID | null | 'NEW',
  onClose: () => void,
  library: LibraryStateType
};

type EditOverlayStateTypes = {
  phrase: Phrase | null | undefined,
  isOpen: boolean,
  isLoading: boolean,
}

class RawEditOverlay extends React.Component<EditOverlayPropTypes, EditOverlayStateTypes> {

  constructor(props: EditOverlayPropTypes) {
    super(props);

    this.state = {
      isOpen: false,
      isLoading: false,
      phrase: null
    }
  }

  componentDidUpdate(prevProps: EditOverlayPropTypes) {
    const { editPhraseID, library } = this.props;
    if (editPhraseID === prevProps.editPhraseID) {
      return;
    }
    switch (editPhraseID) {
      case null:
        this.setState({
          isOpen: false,
          phrase: null
        });
        break;
      case 'NEW':
        this.setState({
          isOpen: true,
          phrase: makeNewPhrase()
        });
        break;
      default:
        this.setState({
          isOpen: true,
          phrase: library.phrases.find((phrase) => phrase._id === editPhraseID) // TODO: this is wrong, we need to copy
        });
    }
  }

  updateField = (e: any) => {
    const { phrase } = this.state;
    if (e.target.name === 'confidence') {
      this.setState({
        phrase: phrase?.set('confidence', parseFloat(e.target.value))
      });
      return;
    }
    this.setState({
      phrase: phrase?.set(e.target.name, e.target.value)
    });
  }

  closeWindow = () => {
    // close the window
    this.setState({
      isLoading: false,
      isOpen: false
    });
    setTimeout(() => {
      this.props.onClose();
    }, 200);
  }

  setIsLoading = (isLoading: boolean) => {
    this.setState({
      isLoading
    });
  }

  cancel = () => {
    const { library } = this.props;
    const { phrase } = this.state;
    if (isSet(phrase?._id)) {
      this.setState({
        phrase: phrase?.revert(library.phrases.toArray())
      });
    }
    // close the window
    this.closeWindow();
  }

  save = async () => {
    const { phrase } = this.state;
    if (!phrase) {
      return;
    }


    this.setIsLoading(true);

    // adds the phrase to the db
    const insertedPhrase = await Mongodb.savePhrase(phrase);

    // adds the id to the phrase
    phrase.save(insertedPhrase);
    if (isSet(insertedPhrase.insertedId)) {
      // add phrase if newly insert to the phrases list
      // TODO: this is a redux action now
      // this.props.changePhraseAction({ action: 'ADD', phrase });
    } // otherwise it the object has been changed so no need to update phrases list
    // TODO: should we use 'UPDATE' as a phrase action

    // close the window
    this.closeWindow();
  }

  delete = async () => {
    const { phrase } = this.state;
    if (!phrase) {
      return;
    }

    this.setIsLoading(true);

    // delete the phrase from the db
    await Mongodb.removePhrase(phrase);

    // delete it from the phrases list
    // TODO: this is a redux action now
    // this.props.changePhraseAction({ action: 'DELETE', phrase });

    // close the window
    this.closeWindow();
  }

  autofill = async () => {
    const { phrase } = this.state;
    if (!phrase) {
      return;
    }


    this.setIsLoading(true);

    // get the pinyin and english for these characters
    const characters = await Mongodb.getCharacters(phrase.characters);

    // edit the phrase to include the new phrases
    const newPhrase = phrase.autofill(characters, {
      pinyin: !isSet(phrase.pinyin),
      english: !isSet(phrase.english)
    });

    // loading is false, set this phrase to be the new one
    this.setState({
      phrase: newPhrase,
      isLoading: false
    });
  }

  render() {
    const { phrase, isOpen } = this.state;
    if (!phrase) {
      return null;
    }
    return (
      <Popup
        title={(!!phrase._id) ? "Edit Phrase" : "Add New Phrase"}
        isOpen={isOpen}
        action="Save"
        onSubmit={this.save}
        onClose={this.cancel}
        isLoading={this.state.isLoading}
      >
        <EditForm
          phrase={phrase}
          updateField={this.updateField}
          deletePhrase={this.delete}
          autofill={this.autofill}
        />
      </Popup>
    );
  }
}

const mapStateToProps = (state: ReducerStateType) => {
  return {
    library: state.library
  };
};

// const mapDispatchToProps = (dispatch: any) => ({
//   appendPhrases: (newPhrases: DBPhraseInterface[]) => {
//     dispatch(appendPhrases(newPhrases))
//   }
// });

export const EditOverlay = connect(
  mapStateToProps,
  // mapDispatchToProps
)(RawEditOverlay);
