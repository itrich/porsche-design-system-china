import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { IconArrowHeadDown, IconCheck, IconErrorFilled } from '@pui/icons'

import { FormErrorText } from '../error-text/error-text'
import { componentClassNames } from '../../shared/class-util'
import { FormItem, FormItemProps } from '../form/form-item'
import {
  useDefaultSize,
  usePopShowState,
  useElementPos
} from '../../shared/hooks'

import './select.scss'

export interface SelectOption<T> {
  text: string
  value: T
}

export interface SelectProps<T> {
  // 组件属性 //

  /** 类名 */
  className?: string

  /** 样式 */
  style?: CSSProperties

  /** 是否禁用 */
  disabled?: boolean

  /** 大小 */
  size?: 'medium' | 'small'

  /* 值 */
  value?: T

  /* 默认值 */
  defaultValue?: T

  /* 占位符 */
  placeholder?: string

  /* 显示过滤输入框 */
  filterInput?: boolean

  /* 选项 */
  options?: string | string[] | SelectOption<T>[]

  /* 错误 */
  error?: FormErrorText

  /* 值改变事件 */
  onValueChange?: (value: T) => void

  /* 控制菜单打开 */
  defaultOpen?: boolean

  /* 控制菜单打开 */
  open?: boolean

  /* 显示清除按钮 */
  showClearButton?: boolean

  /* 菜单显示状态改变 */
  onMenuVisibleChange?: (visible: boolean) => void
}

// 必须骗下storybook，让它能显示属性列表
// eslint-disable-next-line import/no-mutable-exports
let Select = <T,>(props: SelectProps<T> & FormItemProps) => {
  return <div>{props}</div>
}

Select = FormItem(
  <T,>({
    className,
    disabled = false,
    value,
    defaultValue,
    error,
    size,
    options = [],
    filterInput,
    onValueChange,
    placeholder,
    defaultOpen,
    showClearButton = false,
    open,
    onMenuVisibleChange
  }: SelectProps<T>) => {
    const selectState = useState(defaultValue || null)
    let selectValue = selectState[0]
    const setSelectValue = selectState[1]
    const [showOptionList, setShowOptionList, puiPopupWrap] = usePopShowState(
      () => {
        if (open === undefined) {
          setMenuOpen(undefined)
        }
      }
    )
    const isControlledByValue = useRef(value !== undefined)
    const [filterValue, setFilterValue] = useState('')
    const [defaultSize] = useDefaultSize()
    const isFirstLoad = useRef(true)
    const rootElementRef = useRef<any>(null)
    const isDestroyed = useRef(false)
    const [menuPos, updatePos] = useElementPos(rootElementRef)
    const [menuOpen, setMenuOpen] = useState(
      open !== undefined ? open : defaultOpen
    )
    size = size || defaultSize

    if (value) {
      selectValue = value
      isControlledByValue.current = true
    }

    let selectOptions: SelectOption<T>[] = []
    if (typeof options === 'string') {
      const optionParts = options.split(',')
      optionParts.forEach(optionPart => {
        const optionTextValue = optionPart.split(':')
        selectOptions.push({
          text: optionTextValue[0],
          value: (optionTextValue.length > 1
            ? optionTextValue[1]
            : optionTextValue[0]) as any
        })
      })
    } else if (Array.isArray(options)) {
      if (options.length > 0 && typeof options[0] === 'object') {
        selectOptions = options as SelectOption<T>[]
      } else {
        ;(options as string[]).forEach(option => {
          selectOptions.push({ text: option, value: option as any })
        })
      }
    }

    let displayText = ''
    if (isControlledByValue.current) {
      selectOptions.forEach(option => {
        if (option.value === value) {
          displayText = option.text
        }
      })
    } else {
      selectOptions.forEach(option => {
        if (option.value === selectValue) {
          displayText = option.text
        }
      })
    }

    useEffect(() => {
      if (!isFirstLoad.current) {
        onMenuVisibleChange &&
          onMenuVisibleChange(
            (menuOpen !== undefined ? menuOpen : showOptionList) && !disabled
          )
      }
      isFirstLoad.current = false
    }, [(menuOpen !== undefined ? menuOpen : showOptionList) && !disabled])

    useEffect(() => {
      if (open !== undefined) {
        setMenuOpen(open)
      }
    }, [open])

    return (
      <div
        ref={rootElement => {
          isDestroyed.current = rootElement === null
          if (rootElement) {
            rootElementRef.current = rootElement
          }
          if (rootElement && rootElementRef.current === null) {
            updatePos()
            setTimeout(() => {
              if (!isDestroyed.current) {
                updatePos()
              }
            }, 1000)
          }
        }}
        className={componentClassNames(
          'pui-select',
          {
            size,
            disabled: disabled + '',
            active: showOptionList + '',
            error: error ? error.show + '' : 'false'
          },
          className
        )}
      >
        <input
          className="pui-select-input"
          readOnly
          value={displayText}
          placeholder={placeholder}
          onClick={evt => {
            evt.stopPropagation()
            updatePos()
            if (!showOptionList) {
              setFilterValue('')
            }
            setShowOptionList(!showOptionList)
          }}
          disabled={disabled}
        />
        {showClearButton && selectValue && (
          <IconErrorFilled
            className="pui-select-clear-icon"
            onClick={evt => {
              setSelectValue(null as any)
              onValueChange && onValueChange(null as any)
              evt.stopPropagation()
              evt.preventDefault()
              setShowOptionList(false)
            }}
          />
        )}
        <IconArrowHeadDown className="pui-select-icon" />
        {(menuOpen !== undefined ? menuOpen : showOptionList) &&
          !disabled &&
          ReactDOM.createPortal(
            <div
              style={{ position: 'absolute', ...menuPos }}
              className={`pui-select-size-${size}`}
            >
              <div
                className="pui-select-list"
                onClick={evt => {
                  evt.stopPropagation()
                }}
              >
                {filterInput && (
                  <input
                    value={filterValue}
                    placeholder="请输入选项"
                    onChange={evt => {
                      setFilterValue(evt.target.value)
                    }}
                    className="pui-select-filter"
                  />
                )}
                <div className="pui-select-option-wrap">
                  {selectOptions
                    .filter(item => {
                      if (filterValue) {
                        return (
                          item.text
                            .toLowerCase()
                            .indexOf(filterValue.toLowerCase()) >= 0
                        )
                      }
                      return true
                    })
                    .map((option, inx) => (
                      <div
                        key={option.value + ' ' + inx}
                        className={
                          'pui-select-option ' +
                          (option.value === selectValue
                            ? 'pui-select-option-selected'
                            : '')
                        }
                        onClick={() => {
                          if (open === undefined) {
                            setMenuOpen(undefined)
                          }
                          setShowOptionList(false)
                          setSelectValue(option.value)
                          onValueChange && onValueChange(option.value)
                        }}
                      >
                        {option.text}
                        {option.value === selectValue && <IconCheck />}
                      </div>
                    ))}
                </div>
              </div>
            </div>,
            puiPopupWrap
          )}
      </div>
    )
  }
)
;(Select as any).displayName = 'Select'
export { Select }
