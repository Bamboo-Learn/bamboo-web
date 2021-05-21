
import React, { FC } from 'react';

import {
  FiUser,
  FiPenTool,
  FiPlus,
  FiUnlock,
  FiX,
  FiTrash2,
  FiEdit,
  FiMenu,
  FiFilter,
  FiArrowUp,
  FiArrowDown
} from 'react-icons/fi'
import {
  BiGlassesAlt
} from 'react-icons/bi'


const getIcon = (icon: string | undefined) => {
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
    case 'down':
      return FiArrowUp;
    case 'up':
      return FiArrowDown;
    default:
      console.error(`Icon (${icon}), does not exist.`);
      return FiX;
  }
};

type IconProps = {
  className?: string,
  icon: string,
};

export const Icon: FC<IconProps> = ({ className, icon }) => {
  const IconElement = getIcon(icon);
  return (
    <IconElement className={className} />
  );
}