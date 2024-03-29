import cn from 'classnames';
import { LabelHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}

const Label: React.FC<Props> = ({ className = 'mb-3', ...rest }) => {
  return (
    <label
      className={twMerge(
        cn(
          'block text-body-dark font-semibold text-sm leading-none mb-3',
          className,
        ),
      )}
      {...rest}
    />
  );
};

export default Label;
