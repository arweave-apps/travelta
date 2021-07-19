import React from 'react';

import classNames from 'classnames';

import './Icon.scss';

type IconProps = {
  icon: JSX.Element;
  className: string;
  isActive?: boolean;
};

const Icon = ({
  icon,
  className,
  isActive = false,
}: IconProps): JSX.Element => {
  return (
    <div
      className={classNames(className, {
        [`${className}--active`]: isActive,
      })}
    >
      {icon}
    </div>
  );
};

export default Icon;
