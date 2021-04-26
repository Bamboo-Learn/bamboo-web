
import React from 'react';

import { Button } from 'app/elements';

import { Row, Col } from './Table.js';
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

class RowPhrase extends React.Component {
  render() {
    const { phrase: { confidence, characters, pinyin, english } } = this.props;
    return (
      <Row openable={true} confidence={confidence}>

        {/* Confidence */}
        <Col
          className={Style.ColConfidenceUpright}
          style={{
            background: (confidence === 0) ? '#999' : (confidence === 10) ? '#23833d' : '#33a853'
          }}
        >
        </Col>

        {/* Chinese*/}
        <Col className={Style.ColChinese}>
          {/* ng-click="googleTranslate(phrase)"> */}
          <input
            className={Style.InputChinese}
            type="text"
            value={characters}
            onChange={() => { }} // TODO:
          />
        </Col>

        {/* Confidence */}
        <Col className={Style.ColConfidence}>
          <div
            className="ConfidenceBar noselect"
            style={confidenceBackground(confidence)}
          >
          </div>
        </Col>

        {/* Small Definition */}
        <Col className={Style.ColDefinition}>
          <p>
            <span className={Style.Pinyin}>{pinyin}</span> &mdash; <span className={Style.English}>{english}</span>
          </p>
        </Col>

        {/* Pinyin */}
        <Col className={Style.ColPinyin}>
          <input
            className={Style.InputPinyin}
            value={pinyin}
            onChange={() => { }}
          />
        </Col>

        {/* English */}
        <Col className={Style.ColEnglish}>
          <textarea
            className={Style.InputEnglish}
            type="text"
            value={english}
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

export { RowPhrase };