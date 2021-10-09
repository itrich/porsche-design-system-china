import React, { useState, CSSProperties, useEffect } from 'react'
import classNames from 'classnames'
import {
  IconMinus,
  IconPlus,
  IconArrowHeadUp,
  IconArrowHeadDown
} from '@pui/icons'

import { FormItem } from '../form/form-item'
import { Input } from '../input/input'
import { componentClassNames } from '../../shared/class-util'

import './input-number.scss'

const prefixCls = 'pui-input-number'
export interface InputNumberProps {
  /** 步骤条类名 */
  className?: string

  /** 默认初始值 */
  defaultValue?: string

  /** 禁用 */
  disabled?: boolean

  /** 最大值 */
  max?: number

  /** 最小值 */
  min?: number

  /** 每次改变步数，可以为小数 */
  step?: string | number

  /** 样式 */
  style?: CSSProperties

  /** 数字加减器类型，有 default 和 arrow 两种 */
  type?: 'default' | 'arrow'

  /** 当前值 */
  value?: string

  /** 值改变回调 */
  onValueChange?: (val: string) => void
}

const InputNumber = FormItem(
  ({
    className,
    defaultValue,
    disabled = false,
    max = Infinity,
    min = -Infinity,
    step = 1,
    style,
    type = 'default',
    value,
    onValueChange
  }: InputNumberProps) => {
    const initialValue = value || defaultValue || ''
    const [currentValue, setCurrentValue] = useState(initialValue)
    useEffect(() => {
      if (value !== currentValue && value !== undefined)
        setCurrentValue(value as string)
    }, [value])
    useEffect(() => {
      onValueChange && onValueChange(currentValue)
    }, [currentValue])
    const handleValueChange = (val: string) => {
      if (!/[^.\-\d]/.test(val)) {
        setCurrentValue(val)
      }
    }
    const add = () => {
      if (!disabled) {
        setCurrentValue(currentValue => {
          const nextValue = Number(currentValue) + Number(step)
          if (nextValue > max) {
            return currentValue
          }
          return String(nextValue)
        })
      }
    }
    const reduce = () => {
      if (!disabled) {
        setCurrentValue(currentValue => {
          const nextValue = Number(currentValue) - Number(step)
          if (nextValue < min) {
            return currentValue
          }
          return String(nextValue)
        })
      }
    }
    const handleBlur = (e: React.FocusEvent) => {
      let value: number | string = (e.target as HTMLInputElement).value
      value = parseFloat(value)
      if (Number.isNaN(value)) {
        value = ''
      } else {
        if (value > max) {
          value = String(max)
        }
        if (value < min) {
          value = String(min)
        } else {
          value = String(value)
        }
      }
      setCurrentValue(value)
    }
    return (
      <div
        className={componentClassNames(
          `${prefixCls}-wrap`,
          { type },
          className
        )}
        style={style}
      >
        {type === 'default' ? (
          <>
            <div
              className={classNames('pui-minus-wrap', {
                [`${prefixCls}-icon-default`]:
                  Number(currentValue) - Number(step) >= min && !disabled,
                [`${prefixCls}-icon-disabled`]:
                  Number(currentValue) - Number(step) < min || disabled,
                [`${prefixCls}-icon-transparent`]: disabled
              })}
              onClick={reduce}
            >
              <IconMinus />
            </div>
            <div
              className={classNames('pui-plus-wrap', {
                [`${prefixCls}-icon-default`]:
                  Number(currentValue) + Number(step) <= max && !disabled,
                [`${prefixCls}-icon-disabled`]:
                  Number(currentValue) + Number(step) > max || disabled,
                [`${prefixCls}-icon-transparent`]: disabled
              })}
              onClick={add}
            >
              <IconPlus />
            </div>
          </>
        ) : (
          <div
            className={classNames('pui-arrow-wrap', {
              'pui-disabled': disabled
            })}
          >
            <IconArrowHeadUp
              onClick={add}
              className={classNames({
                [`${prefixCls}-icon-default`]:
                  Number(currentValue) + Number(step) <= max && !disabled,
                [`${prefixCls}-icon-disabled`]:
                  Number(currentValue) + Number(step) > max || disabled
              })}
            />
            <IconArrowHeadDown
              onClick={reduce}
              className={classNames({
                [`${prefixCls}-icon-default`]:
                  Number(currentValue) - Number(step) >= min && !disabled,
                [`${prefixCls}-icon-disabled`]:
                  Number(currentValue) - Number(step) < min || disabled
              })}
            />
          </div>
        )}
        <Input
          className={classNames({
            [prefixCls]: type === 'default',
            [`${prefixCls}-arrow`]: type === 'arrow'
          })}
          disabled={disabled}
          onValueChange={handleValueChange}
          value={currentValue}
          onBlur={handleBlur}
        />
      </div>
    )
  }
)

;(InputNumber as any).displayName = 'InputNumber'

export { InputNumber }
