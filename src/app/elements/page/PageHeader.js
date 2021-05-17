import React from 'react';

import Style from './style.module.scss';

export const PageHeader = ({ children }) => {
  if (typeof children === 'string') {
    return (
      <PageHeader>
        <PageHeaderTitle>
          {children}
        </PageHeaderTitle>
      </PageHeader>
    );
  }
  return (
    <div className={Style.header}>
      {children}
    </div>
  );
}

export const PageHeaderTitle = ({ children }) => {
  return (
    <div className={Style.headerTitle}>
      {children}
    </div>
  );
}

export const PageHeaderActions = ({ children }) => {
  return (
    <div className={Style.headerActions}>
      {children}
    </div>
  );
}

