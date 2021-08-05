import React from 'react';

import classNames from 'classnames';

import './Icon.scss';

type IconProps = {
  icon: JSX.Element;
  className: string;
  isActive?: boolean;
  isDark?: boolean;
};

const Icon = ({
  icon,
  className,
  isActive = false,
  isDark = false,
}: IconProps): JSX.Element => {
  return (
    <div
      className={classNames(className, {
        [`${className}--active`]: isActive,
        [`${className}--dark`]: isDark,
      })}
    >
      {icon}
    </div>
  );
};

export default Icon;
