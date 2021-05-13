

import { AutofillIcon } from "./AutofillIcon";
import { UserIcon } from "./UserIcon";
import { PadlockIcon } from "./PadlockIcon";
import { CancelIcon } from "./CancelIcon";
import { GarbageIcon } from "./GarbageIcon";
import { AddIcon } from "./AddIcon";
import { EditIcon } from "./EditIcon";
import { LevelsIcon } from './LevelsIcon';
import { NextIcon } from "./NextIcon";
import { PreviousIcon } from "./PreviousIcon";

export { CheckIcon } from "./CheckIcon";
export { ClipboardIcon } from "./ClipboardIcon";
export { LookupIcon } from "./LookupIcon";
export { SearchIcon } from "./SearchIcon";

// TODO: use these icons instead https://github.com/feathericons/feather#feather
// make it work like this instead: <Icon image="Autofill" className={Style.} />

export const getIcon = (icon: string | undefined) => {
  switch (icon) {
    case 'Autofill':
      return AutofillIcon;
    case 'Add':
      return AddIcon;
    case 'User':
      return UserIcon;
    case 'Padlock':
      return PadlockIcon;
    case 'Cancel':
      return CancelIcon;
    case 'Garbage':
      return GarbageIcon;
    case 'Edit':
      return EditIcon;
    case 'Filter':
      return LevelsIcon;
    case 'Next':
      return NextIcon;
    case 'Previous':
      return PreviousIcon;
    default:
      return CancelIcon;
  }
}

export {
  AutofillIcon,
  AddIcon,
  CancelIcon,
  GarbageIcon,
  UserIcon,
  EditIcon,
  PadlockIcon,
  LevelsIcon,
  NextIcon,
  PreviousIcon
};