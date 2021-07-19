import React from 'react';

import classNames from 'classnames';

import './Layout.scss';

type LayoutProps = {
  className: string;
  children: React.ReactNode;
  containerSize: 'small' | 'big';
  tag: 'section' | 'header' | 'footer';
};

const Layout = ({
  className,
  children,
  containerSize,
  tag: Tag,
}: LayoutProps): JSX.Element => {
  return (
    <Tag className={className}>
      <div
        className={classNames({
          'container-small': containerSize === 'small',
          'container-big': containerSize === 'big',
        })}
      >
        {children}
      </div>
    </Tag>
  );
};

export default Layout;
