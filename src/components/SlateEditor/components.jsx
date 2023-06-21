import React from "react";
import { cx, css } from '@emotion/css'
import ReactDOM from 'react-dom'


export const Portal = ({ children }) => {
    return typeof document === 'object'
        ? ReactDOM.createPortal(children, document.body)
        : null
}

export const Menu = React.forwardRef(({ className, ...props }, ref) => (
    <div
        {...props}
        data-test-id="menu"
        ref={ref}
        className={cx(
            className,
            css`
            & > * {
              display: inline-block;
            }
            & > * + * {
              margin-left: 15px;
            }
          `
        )}
    />
)
)

export const Button = React.forwardRef((
    {
        active,
        onMouseDown,
        reversed = false,
        title = '',
        className,
        ...props },
    ref
) => (
    <span
        {...props}
        ref={ref}
        title={title}
        onMouseDown={onMouseDown}
        className={cx(
            className,
            css`
          cursor: pointer;
          color: ${reversed
                    ? active
                        ? 'white'
                    :  '#aaa'
                    :  active
                        ? 'black'
                        : '#ccc'};
          `
        )}
    />
)
)


export const Icon = React.forwardRef((
    {
        icon,
        className = '',
        ...props
    },
    ref) => (
    <span
        {...props}
        ref={ref}
        className={cx(
            'material-icons',
            css`
        font-size: 18px;
        color    : #999;
        vertical-align: text-bottom;`
        )}>{icon}</span>
)
)

