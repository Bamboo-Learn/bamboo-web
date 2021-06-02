

import React from 'react';
import { BSON } from 'realm-web';
import { connect } from 'react-redux';

import { Popup } from 'app/elements';
import { Mongodb, isSet, Phrase, DBPhrase, makeNewPhrase, DBPhraseInterface } from 'app/classes';
import { LibraryStateType, ReducerStateType, LibraryActions } from 'app/redux';

import { EditForm } from './edit-form';

type EditOverlayPropTypes = {
  editPhraseID: BSON.ObjectID | null | 'NEW',
  onClose: () => void,
  library: LibraryStateType,
  appendNewPhrase: (newPhrase: DBPhraseInterface) => void
  updatePhrase: (phrase: DBPhrase) => void
};

type EditOverlayStateTypes = {
  phrase: Phrase | DBPhrase | null | undefined,
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
        // do nothing when editPhrase is null
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
          phrase: library.phrases.find((phrase) => phrase._id === editPhraseID)?.copy()
        });
    }
  }

  updateField = (e: any) => {
    const { phrase } = this.state;
    if (e.target.name === 'progress') {
      this.setState({
        phrase: phrase?.set('progress', parseFloat(e.target.value))
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
    this.closeWindow();
  }

  updatePhrase = async (phrase: DBPhrase) => {
    await Mongodb.updatePhrase(phrase); // TODO: const data = 
    this.props.updatePhrase(phrase);
  }

  createPhrase = async (phrase: Phrase) => {
    const insertableData = phrase.makeStorableData();
    const savedPhraseData = await Mongodb.createPhrase(insertableData);
    this.props.appendNewPhrase({ ...insertableData, _id: savedPhraseData.insertedId });
  }

  save = async () => {
    const { phrase } = this.state;
    if (!phrase) {
      return;
    }

    this.setIsLoading(true);

    if (phrase instanceof DBPhrase) {
      await this.updatePhrase(phrase);
    } else {
      await this.createPhrase(phrase);
    }

    this.setIsLoading(false);
    this.closeWindow();
  }

  // delete = async () => {
  //   const { phrase } = this.state;
  //   if (!phrase || !(phrase instanceof DBPhrase)) {
  //     return;
  //   }
  //   this.setIsLoading(true);
  //   // delete the phrase from the db
  //   await Mongodb.removePhrase(phrase);
  //   // close the window
  //   this.closeWindow();
  // }

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
        title={(phrase instanceof DBPhrase) ? "Edit Phrase" : "Add New Phrase"}
        isOpen={isOpen}
        action="Save"
        onSubmit={this.save}
        onClose={this.cancel}
        isLoading={this.state.isLoading}
      >
        <EditForm
          phrase={phrase}
          updateField={this.updateField}
          // deletePhrase={this.delete}
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

const mapDispatchToProps = (dispatch: any) => ({
  appendNewPhrase: (newPhrase: DBPhraseInterface) => {
    dispatch(LibraryActions.appendNewPhrase(new DBPhrase(newPhrase)))
  },
  updatePhrase: (phrase: DBPhrase) => {
    dispatch(LibraryActions.updatePhrase(phrase));
  }
});

export const EditOverlay = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawEditOverlay);
