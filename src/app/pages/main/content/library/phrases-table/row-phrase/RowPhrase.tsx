
import React, { useState } from 'react';

import { PhraseDisplay } from 'app/helpers';
import { Row } from 'app/elements';

// import { } from './ColLarge';
import { ColChinese, ColPinyin, ColEnglish, ColOptions } from './Col';
import { ColOpenerSmall, ColConfidenceSmall } from './ColSmall'; // ColRevealSmall, ColChineseSmall

export const RowPhrase = ({ phrase: { confidence, characters, pinyin, english } }: { phrase: PhraseDisplay }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = (e: any) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  return (
    <Row confidence={confidence} isOpen={isOpen}>
      <ColOpenerSmall isOpen={isOpen} onClick={toggleIsOpen} />
      <ColChinese characters={characters} />
      <ColConfidenceSmall confidence={confidence} />
      {/* hidden-sm */}
      <ColPinyin pinyin={pinyin} />
      <ColEnglish english={english} />
      {/* <ColPackSmall pack={pack} /> */}
      {/* ColRevealSmall 
        {/* ColPackLarge */}
      {/* ColPinyinLarge */}
      {/* ColEnglishLarge */}
      {/* ColOptionsLarge */}
      <ColOptions /> {/* has the options like edit and delete */}
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