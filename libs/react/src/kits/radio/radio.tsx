import React, { ChangeEventHandler, CSSProperties, useMemo } from 'react';
import { componentClassNames } from '../../shared/class-util';
import './radio.scss';

export interface Props {
  // 组件属性 //

  /** 类名 */
  className?: string;
  /** 样式 */
  style?: CSSProperties;

  /* 标签 */
  label?: string;

  /* 值 */
  value?: string | number;

  /** 是否禁用 */
  disabled?: boolean;

  // 组件事件 //

  /* 点击事件 */
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

/**
 * Primary UI component for user interaction
 */
let idCounter = 0;
const generateId = () => {
  idCounter++;
  return 'checkbox-' + idCounter;
};
const Radio = ({ className, style, disabled, label, onChange }: Props) => {
  const id = useMemo(() => generateId(), []);
  return (
    <label
      htmlFor={id}
      className={componentClassNames('pui-radio', { disabled: disabled + '' }, className)}
      style={style}
    >
      <input id={id} name="default" type="radio" onChange={onChange} disabled={disabled} /> {label}
    </label>
  );
};

export { Radio };
