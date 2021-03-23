import React from 'react';

import classNames from 'classnames';

import './TextBlock.scss';

type TextBlockProps = {
  label?: string;
  text: string;
  subtext?: string;
  hasColumn?: boolean;
};

const TextBlock = ({
  label,
  text,
  subtext,
  hasColumn,
}: TextBlockProps): JSX.Element => {
  return (
    <div
      className={classNames('text-block', { 'text-block--column': hasColumn })}
    >
      {label ? (
        <>
          <span className="text-block__label">{label}</span>
          <span className="text-block__text">{text}</span>
        </>
      ) : (
        <>
          <span className="text-block__text">{text}</span>
          <span className="text-block__subtext">{subtext}</span>
        </>
      )}
    </div>
  );
};

export default TextBlock;
