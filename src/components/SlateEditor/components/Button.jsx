import React from "react";
import { cx, css } from '@emotion/css'

const InnerButton = (
    props,
    ref
) => {
    const {
        active,
        onMouseDown,
        reversed = false,
        title = '',
        className,
        ...rest
    } = props

    const color = reversed
        ? active
            ? 'white'
            : '#aaa'
        : active
            ? 'black'
            : '#ccc'

    return <span
        {...rest}
        ref={ref}
        title={title}
        onMouseDown={onMouseDown}
        className={cx(
            className,
            css`
          cursor: pointer;
          color: ${color};
          `
        )}
    />
}

const Button = React.forwardRef(InnerButton)

export default Button;