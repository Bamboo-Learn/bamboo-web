
import React from 'react';

import { PhraseDisplay } from 'app/helpers';
// import { Button } from 'app/elements';

import { Row } from '../table';
// import { } from './ColLarge';
import { ColOpenerSmall, ColConfidenceSmall, ColDefinitionSmall } from './ColSmall'; // ColRevealSmall, ColChineseSmall
// import Style from './style.module.css';

export const RowPhrase = ({ phrase: { confidence, characters, pinyin, english } }: { phrase: PhraseDisplay }) => {
  return (
    <Row confidence={confidence}>
      {/* <ColOpenerSmall /> */}
      {/* <ColChinese characters={characters} /> */}
      <ColDefinitionSmall pinyin={pinyin} english={english} /* TODO: add pack to here */ />
      {/* ColRevealSmall has the options like edit and delete*/}
      {/* <RowReveal isOpen={false}> */}
      <ColConfidenceSmall confidence={confidence} />
      {/* <ColOptionsSmall /> */}
      {/* </RowReveal> */}

      {/* TODO: Large part here */}
    </Row>
  );
}

  // {/* 
  //         TODO: determine where to put this. In ColRevealSmall? Across the whole bottom? 
  //         The old way was this is on the right side and the defenition is in the reveal
  //       */}


  //     {/* Confidence */}
  //     <Col
  //       className={Style.ColConfidenceUpright}
  //       style={{
  //         background: (confidence === 0) ? '#999' : (confidence === 10) ? '#23833d' : '#33a853'
  //       }}
  //     />
  //     <ColChineseLarge>
  //       <CellChinese characters={characters} />
  //     </ColChineseLarge>
  //     <ColPackLarge>
  //       <CellPack />
  //     </ColPackLarge>

  //     {/* <ColChinese />
  //       <ColConfidence />
  //       <ColHidden></ColHidden> */}

  //     {/* Chinese*/}
  //     <Col className={Style.ColChinese}>
  //       {/* ng-click="googleTranslate(phrase)"> */}
  //       <input
  //         className={Style.InputChinese}
  //         type="text"
  //         value={characters}
  //         onChange={() => { }} // TODO:
  //       />
  //     </Col>


  //     {/* Pinyin */}
  //     <Col className={Style.ColPinyin}>
  //       <input
  //         className={Style.InputPinyin}
  //         value={pinyin}
  //         onChange={() => { }}
  //       />
  //     </Col>

  //     {/* English */}
  //     <Col className={Style.ColEnglish}>
  //       <textarea
  //         className={Style.InputEnglish}
  //         type="text"
  //         value={english}
  //         onChange={() => { }}
  //       >
  //       </textarea>
  //     </Col>

  //     {/* Actions */}
  //     <Col className={Style.ColActions}>
  //       <div className={Style.ButtonHolder}>
  //         <Button
  //           icon="Edit"
  //           onClick={() => this.props.setEditPhrase(this.props.phrase)}
  //           label="Edit"
  //           doubleClick={false}
  //           tab={false}
  //           color="blue"
  //         />
  //       </div>
  //     </Col>