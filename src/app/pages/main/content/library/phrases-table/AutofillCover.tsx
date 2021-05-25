
import React, { FC } from 'react';
import classNames from 'classnames';

// import { Icon } from 'app/elements';

import Style from './style.module.scss';

type AutofillCoverProps = {
  visible: boolean,
  pinyin: string,
  english: string,
  // autofill: () => void
}

export const AutofillCover: FC<AutofillCoverProps> = ({ visible, pinyin, english }) => {
  const className = classNames({
    // hidden when no chinese text or english / pinyin in focus
    [Style.hidden]: !visible || pinyin !== '' || english !== '',
    [Style.coverAutofill]: true,
    // [Style.colPinyin]: pinyin === '' && english !== '',
    // [Style.colEnglish]: pinyin !== '' && english === '',
  });
  return (
    <div className={className}>
      {/* <Icon icon="enter" />  */}
      {/* NOTE: onReturn listener is in the character enter input */}
      {'[RETURN] to autofill,'}
      {/* <Icon icon="tab" />  */}
      {' [TAB] to enter manually'}
    </div>
  )
};