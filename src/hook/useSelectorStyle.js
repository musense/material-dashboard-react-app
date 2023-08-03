import { useMemo } from "react";

export default function useSelectorStyle(controlWidth, controlHeight) {
    const styles = useMemo(() => {
        return {
          control: (base) => ({
            ...base,
            borderColor: 'black',
            boxShadow: 'none',
            width: controlWidth,
            '&:hover': {
              borderColor: 'black',
            }
          }),
          valueContainer: (base) => ({
            ...base,
            paddingTop: 'unset',
            paddingBottom: 'unset',
          }),
          input: (base) => ({
            ...base,
            // paddingTop: 'unset',
            // paddingBottom: 'unset',
            // marginTop: 'unset',
            // marginBottom: 'unset',
            height: controlHeight
          }),
          menuPortal: (base) => ({
            ...base,
            borderColor: 'black',
            border: '1px solid black',
            zIndex: 9999,
          }),
          menu: (base) => ({
            ...base,
            zIndex: 99999,
            color: 'black',
            backgroundColor: 'white',
            border: '1px solid black'
          }),
        }
      }, [controlWidth, controlHeight])


      return styles
}
