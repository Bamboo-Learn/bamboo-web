
import {
  FiUser,
  FiPenTool,
  FiPlus,
  FiUnlock,
  FiX,
  FiTrash2,
  FiEdit,
  FiMenu,
  FiFilter
} from 'react-icons/fi'
import {
  BiGlassesAlt
} from 'react-icons/bi'

// ??? make it work like this instead: <Icon image="Autofill" className={Style.} />

export const getIcon = (icon: string | undefined) => {
  switch (icon?.toLowerCase()) {
    case 'autofill':
      return FiPenTool;
    case 'glasses':
    case 'study':
      return BiGlassesAlt;
    case 'add':
      return FiPlus;
    case 'user':
      return FiUser;
    case 'padlock':
    case 'password':
      return FiUnlock;
    case 'garbage':
    case 'trash':
      return FiTrash2;
    case 'edit':
      return FiEdit;
    case 'menu':
      return FiMenu
    case 'filter':
      return FiFilter;
    case 'cancel':
    case 'x':
      return FiX;
    default:
      console.error(`Icon (${icon}), does not exist.`);
      return FiX;
  }
}
