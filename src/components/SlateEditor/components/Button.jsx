
import { cx, css } from '@emotion/css'

export default Button = React.forwardRef((
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
                        : '#aaa'
                    : active
                        ? 'black'
                        : '#ccc'};
          `
        )}
    />
))
