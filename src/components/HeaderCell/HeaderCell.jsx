import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'views/Icons/Icon';
import styles from './HeaderCell.module.css'

export default function HeaderCell({
  name,
  selectedPatchKey = '',
  patchKey = '',
  patchType = '',
  className = '',
  reducerName = ''
}) {

  const dispatch = useDispatch();
  const getSortingDirection = (state) => state[reducerName]['sortingMap'][patchKey]

  const sortingDirection = useSelector(getSortingDirection);

  const onSortingClick = (type, key) => {
    dispatch({
      type: type,
      payload: {
        key: key
      }
    })
  }
  let inputProps = {
    value: name,
  }

  if (patchKey) {
    inputProps = {
      ...inputProps,
      onClick: () => onSortingClick(patchType, patchKey)
    }
  }


  const icon = (patchKey) => {
    if (!patchKey) return null
    const iconName = sortingDirection === 'asc' ? 'arrowDown' : 'arrowUp'
    return < Icon icon={iconName} />
  };

  const activeClassName = patchKey === selectedPatchKey ? styles['active'] : ''
  return <div className={`${styles['header-cell']} ${activeClassName} ${className}`}>
    <span {...inputProps}> {inputProps.value}</span>
    {icon(patchKey)}
  </div>;
}