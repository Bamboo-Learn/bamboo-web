import React from 'react';

// import { Row, Col } from '../../elements/table';
// import { makeLoadHistoryString } from '../sub-header/SubHeader.js';
import { DEFAULT_PHRASE, Phrase, strCompare } from '../../../helpers';
import PhraseComponent from './phrase/PhraseComponent.js';

import Style from './style.module.css';

class Phrases extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phrases: [],
      newPhrase: {}
    }

    this.addNewPhrase = this.addNewPhrase.bind(this);

  }

  componentDidUpdate(prevProps) {
    if (this.props.needsLoad && !prevProps.needsLoad) {
      // if it needs to load and previously did not
      this.loadPhrases();
    }
    if (this.props.phraseAction.action !== prevProps.phraseAction.action) {
      switch (this.props.phraseAction.action) {
        case 'DELETE':
          this.removePhrase(this.props.phraseAction.phrase);
          break;
        case 'ADD':
          this.addPhrase(this.props.phraseAction.phrase);
          break;
        default:
          break;
      }
      // reset the phrase action
      this.props.changePhraseAction({ action: '', phrase: {} });
    }
  }

  async loadPhrases() {
    console.log("LOAD")

    // get the new phrases and add them to the phrases
    const phrases = this.state.phrases;
    const loadedPhrases = await this.props.mongodb.getPhrases(this.props.filter);
    loadedPhrases.forEach((phrase) => {
      const existingPhrase = this.state.phrases.find(p => p._id.equals(phrase._id))
      if (!existingPhrase) {
        // if not already in the array then add it
        phrases.push(new Phrase(phrase));
      }
    });

    // set the phrases to the combinded collection
    this.setState({
      phrases: phrases
    });

    // set needs load to false
    this.props.setNeedsLoad(false);
  }

  displayPhrases() {
    // filters phrases based on the global filter
    const { orderBy, reverse, page, perPage } = this.props.filter;
    const displayPhrases = this.state.phrases
      .sort((a, b) => {
        const order = strCompare(a.original[orderBy], b.original[orderBy]);
        return (reverse) ? -1 * order : order;
      })
      .slice(page * perPage, (page + 1) * perPage);

    return displayPhrases;
  }

  removePhrase(phrase) {
    const phrases = this.state.phrases.filter(p => {
      return p._id !== phrase._id;
    });
    this.setState({
      phrases
    });
  }

  addPhrase(phrase) {
    console.log({ add: phrase });
    const phrases = this.state.phrases;
    phrases.push(phrase);
    this.setState({
      phrases
    });
  }

  addNewPhrase() {
    const userID = this.props.mongodb.userID();
    const defaultPhrase = DEFAULT_PHRASE(userID);
    this.setState({
      newPhrase: defaultPhrase
    });
  }

  render() {
    const displayPhrases = this.displayPhrases();

    // let NewPhrase = () => (
    // 	<Row
    // 		className={Style.AddNew}
    // 		onClick={this.addNewPhrase}
    // 	>
    // 		{/* AddButton */}
    // 		<Col className={Style.ColAddNew}>
    // 			<div className="Toggle noselect">
    // 				<div className={Style.Arrow}></div>
    // 			</div>
    // 		</Col>
    // 	</Row>
    // );

    // if (Object.entries(this.state.newPhrase).length > 0) {
    // 	NewPhrase = () => (<PhraseComponent
    // 		key={'new-phrase'}
    // 		phrase={this.state.newPhrase}
    // 	/>);
    // }

    return (
      <div className={Style.Phrases}>
        {/* <NewPhrase /> */}
        {
          displayPhrases.map((phrase, i) => {
            return (
              <PhraseComponent
                key={i}
                phrase={phrase}
                setEditPhrase={this.props.setEditPhrase}
              />
            );
          })
        }
      </div>
    );
  }
}

export default Phrases;