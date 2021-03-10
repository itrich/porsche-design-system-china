import React, { ChangeEventHandler, CSSProperties, useRef } from 'react';
import { Button } from '../button/button';
import { Input } from '../input/input';
import { componentClassNames } from '../../shared/class-util';
import './search.scss';

export interface Props {
  // 组件属性 //

  /* 类名 */
  className?: string;
  /* 样式 */
  style?: CSSProperties;

  /* 占位符 */
  placeHolder?: string;
  /* 是否禁用 */
  disabled?: boolean;

  // 组件事件 //

  /* 点击事件 */
  onChange?: ChangeEventHandler;
  onSearch?: (value: string) => void;
}

const Search = ({ className, style, placeHolder, disabled = false, onChange, onSearch }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={componentClassNames('pui-search', {}, className)} style={style}>
      <Input onChange={onChange} disabled={disabled} placeHolder={placeHolder} />
      <Button
        type="secondary"
        onClick={() => {
          if (inputRef !== null && onSearch) {
            onSearch(inputRef.current!.value);
          }
        }}
      >
        S
      </Button>
    </div>
  );
};

export { Search };
