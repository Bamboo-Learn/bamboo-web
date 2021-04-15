
import React from 'react';

import { Button, Row, Col } from 'app/elements';

import Style from './style.module.css';

function confidenceBackground(confidence) {
  const fill = '33a853';
  const back = 'daeedd';
  const percent = 100 * confidence / 10;
  return {
    background: `
      linear-gradient(
        90deg, 
        #${fill} 0%, 
        #${fill} ${percent}%,
        #${back} ${percent}%,
        #${back} 100%
      )`
  };
}

class PhraseComponent extends React.Component {
  render() {
    const phrase = this.props.phrase;
    return (
      <Row openable={true} confidence={phrase.confidence}>

        {/* Confidence */}
        <Col
          className={Style.ColConfidenceUpright}
          style={{
            background: (phrase.confidence === 0) ? '#999' : (phrase.confidence === 10) ? '#33a853' : '#23833d'
          }}
        >
        </Col>

        {/* Chinese*/}
        <Col className={Style.ColChinese}>
          {/* ng-click="googleTranslate(phrase)"> */}
          <input
            className={Style.InputChinese}
            type="text"
            value={phrase.characters}
            onChange={() => { }} // TODO:
          />
        </Col>

        {/* Confidence */}
        <Col className={Style.ColConfidence}>
          <div
            className="ConfidenceBar noselect"
            style={confidenceBackground(phrase.confidence)}
          >
          </div>
        </Col>

        {/* Small Definition */}
        <Col className={Style.ColDefinition}>
          <p>
            <span className={Style.Pinyin}>{phrase.pinyin}</span> &mdash; <span className={Style.English}>{phrase.english}</span>
          </p>
        </Col>

        {/* Pinyin */}
        <Col className={Style.ColPinyin}>
          <input
            className={Style.InputPinyin}
            value={phrase.pinyin}
            onChange={() => { }}
          />
        </Col>

        {/* English */}
        <Col className={Style.ColEnglish}>
          <textarea
            className={Style.InputEnglish}
            type="text"
            value={phrase.english}
            onChange={() => { }}
          >
          </textarea>
        </Col>

        {/* Actions */}
        <Col className={Style.ColActions}>
          <div className={Style.ButtonHolder}>
            <Button
              icon="Edit"
              onClick={() => this.props.setEditPhrase(this.props.phrase)}
              label="Edit"
              doubleClick={false}
              tab={false}
              color="blue"
            />
          </div>
        </Col>
      </Row>
    );
  }
}

export default PhraseComponent;