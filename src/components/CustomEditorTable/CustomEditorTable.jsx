import React, { useCallback, useEffect, useState } from 'react';
// @material-ui/core components
import Table from '@material-ui/core/Table';
import { useDispatch } from 'react-redux';
import CustomEditorTableBody from '../CustomTableBody/CustomEditorTableBody';
import CustomTableHead from '../CustomTableHead/CustomTableHead';

function CustomEditorTable({ ...props }) {
  const {
    tableData,
    tableHead,
    openModal,
    closeModal,
    selectedIDRef,
    isRowLink,
  } = props;

  const nullEditor = {
    id: '',
    name: '',
  };

  const [showList, setShowList] = useState(tableData);
  const [isCreate, setIsCreate] = useState(true);
  const [selectedEditor, setSelectedEditor] = useState(nullEditor);
  const [origSelectedEditor, setOrigSelectedEditor] = useState(nullEditor);
  const [fixedClasses, setFixedClasses] = useState('dropdown');
  const [selectedID, setSelectedID] = useState(selectedIDRef.current);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedIDRef.current === -1) {
      setSelectedID(selectedIDRef.current);
      setShowList(tableData);
    }
  }, [tableData, selectedIDRef.current]);

  const setEditor = (editor) =>
    setSelectedEditor({
      id: editor.id,
      name: editor.name,
    });

  // const handleRowClick = useCallback((e) => {
  //   // TODO: popup confirm window
  //   const selectedID = e.currentTarget.id;
  //   // TODO:
  //   // if (selectedID < 0) return;
  //   const sEditor = showList.find((t, rowIndex) => rowIndex == selectedID);
  //   // TODO:
  //   // if (!sEditor) return;
  //   console.log(sEditor);

  //   // console.log(showList[selectedID]);
  //   // showList.map((show, index) => {
  //   //   console.log(show);
  //   //   console.log(showList[index]);
  //   // });

  //   selectedIDRef.current = selectedID;

  //   setSelectedID(selectedID);
  //   // setEditor(sEditor);
  // }, []);

  const handleRowClick = (e) => {
    const sEditor = showList.find(
      (t, rowIndex) => rowIndex == e.currentTarget.id
    );
    console.log(sEditor);
    // selectedIDRef.current = sEditor._id;

    const selectedID = sEditor._id;
    console.log(selectedID);
    setSelectedID(selectedID);
    selectedIDRef.current = selectedID;
  };
  return (
    <div>
      <Table>
        {showList ? (
          <>
            <CustomTableHead tableHead={tableHead} />
            <CustomEditorTableBody
              selectedID={selectedID}
              handleRowClick={handleRowClick}
              showList={showList}
              isRowLink={isRowLink}
            />
          </>
        ) : null}
      </Table>
    </div>
  );
}

export default CustomEditorTable;