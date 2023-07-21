import React, { useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Icon from './../EditBodyCell/Icon'

export default function HeaderCell({
  name,
  patchKey = null,
  patchType = null,
  className = null,
  reducerName = null
}) {
  const dispatch = useDispatch();
  const sortingDirection = useSelector((state) => state[reducerName]['sortingMap'][patchKey]);

  console.log(`🚀 ~ file: EditorListBody.jsx:190 ~ sortingDirection`, sortingDirection)

  const onSortingClick = (type, key) => {
    dispatch({
      type: type,
      payload: {
        key: key
      }
    })
  }
  const inputProps = useMemo(() => patchKey ? ({
    type: 'button',
    value: name,
    onClick: () => onSortingClick(patchType, patchKey)
  }) : ({
    type: 'button',
    value: name,
  }), [name, patchKey, patchType])

  const icon = (patchKey) => {
    if (!patchKey) return null

    const iconClassName = `
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 10px;`

    const icon_name = sortingDirection === 'asc' ? 'arrow_upward' : 'arrow_downward'
    return < Icon iconName={icon_name} classes={iconClassName} />
  };
  return <div className={className} >
    <input {...inputProps} />
    {icon(patchKey)}
  </div>;
}