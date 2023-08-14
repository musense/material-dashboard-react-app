import React, { useEffect, useState } from 'react';
// @material-ui/core components
import Table from '@material-ui/core/Table';
import { useDispatch } from 'react-redux';
import { ADD_TAG, DELETE_TAG, UPDATE_TAG } from '../../actions/GetTagsAction';
import CustomTableBody from '../CustomTableBody/CustomTableBody';
import CustomTableHead from '../CustomTableHead/CustomTableHead';

function CustomTable({ ...props }) {
  const { showList, tableHead, openModal, closeModal, selectedIDRef } = props;

  // const [showList, setShowList] = useState(tableData);
  const [isCreate, setIsCreate] = useState(true);

  const [selectedTag, setSelectedTag] = useState(null);
  const [origSelectedTag, setOrigSelectedTag] = useState(null);

  const [fixedClasses, setFixedClasses] = useState('dropdown');
  const [selectedID, setSelectedID] = useState(selectedIDRef.current);

  const dispatch = useDispatch();

  useEffect(() => {
    // setShowList(tableData);
  }, [selectedIDRef.current]);

  const handleRowClick = (e) => {
    // TODO: popup confirm window
    const selectedID = e.currentTarget.id;
    // TODO:
    if (selectedID < 0) return;
    const sTag = showList.find((t, rowIndex) => rowIndex == selectedID);
    // TODO:
    if (!sTag) return;
    selectedIDRef.current = selectedID;
    setSelectedID(selectedID);
    setSelectedTag(sTag);
    setIsCreate(true);
  };

  function handleFixedClick() {
    if (fixedClasses === 'dropdown') {
      setFixedClasses('dropdown show');
    } else {
      setFixedClasses('dropdown');
    }
  }

  // POST
  function handleAddRow() {
    const sTag = Object.values(selectedTag);
    // TODO:
    if (sTag.some((t) => !t)) return;
    const data = Object.assign({}, selectedTag);
    dispatch({
      type: ADD_TAG,
      payload: {
        data,
      },
    });

    openModal();
    setSelectedTagEmpty();
    setIsCreate(true);
  }

  // PATCH
  function handleUpdateRow() {
    // TODO: add confirm window
    // TODO:
    if (selectedID < 0) return;
    // TODO:
    if (JSON.stringify(origSelectedTag) === JSON.stringify(selectedTag)) return;

    const data = Object.assign({}, selectedTag);
    dispatch({
      type: UPDATE_TAG,
      payload: {
        data,
      },
    });

    openModal();
    setSelectedTag(selectedTag);
  }

  // DELETE
  function handleDeleteRow() {
    // TODO: add confirm window
    // TODO:
    if (selectedID < 0) return;
    dispatch({
      type: DELETE_TAG,
      payload: {
        data: selectedTag.id,
      },
    });
    openModal();
  }

  const setSelectedTagEmpty = () => setSelectedTag(null);

  function handleCancel() {
    setSelectedTag(origSelectedTag);
    setOrigSelectedTag(origSelectedTag);
    setSelectedID(selectedID);
  }

  function handleCreateTag() {
    setSelectedID(-1);
    setSelectedTagEmpty();
    setIsCreate(false);
  }

  function handleChange(e) {


    // const changedTag = Object.assign({}, selectedTag, {
    //   name: e.target.value,
    // });
    // setSelectedTag(changedTag);
  }

  return (
    <div>
      {/* <Table>
        {showList ? (
          <>
            <CustomTableHead tableHead={tableHead} />
            <CustomTableBody
              selectedID={selectedID}
              handleRowClick={handleRowClick}
              showList={showList}
            />
          </>
        ) : null}
      </Table> */}
    </div>
  );
}

export default CustomTable;
