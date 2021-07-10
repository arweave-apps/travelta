import React from 'react';

import classNames from 'classnames';

import './Panel.scss';

type PanelProps = { children: React.ReactNode; className?: string };

const Panel = ({ children, className = '' }: PanelProps): JSX.Element => {
  return <div className={classNames(className, 'panel')}>{children}</div>;
};

export default Panel;
