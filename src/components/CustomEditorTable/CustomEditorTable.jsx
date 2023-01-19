import React, { useCallback, useEffect, useState } from "react";
// @material-ui/core components
import Table from "@material-ui/core/Table";
import { useDispatch } from "react-redux";
import CustomTableBody from "../CustomTableBody/CustomTableBody";
import CustomTableHead from "../CustomTableHead/CustomTableHead";

function CustomEditorTable({ ...props }) {
  const { tableData, tableHead, openModal, closeModal, selectedIDRef } = props;

  const nullEditor = {
    id: "",
    name: "",
  };

  const [showList, setShowList] = useState(tableData);
  const [isCreate, setIsCreate] = useState(true);
  const [selectedEditor, setSelectedEditor] = useState(nullEditor);
  const [origSelectedEditor, setOrigSelectedEditor] = useState(nullEditor);
  const [fixedClasses, setFixedClasses] = useState("dropdown");
  const [selectedID, setSelectedID] = useState(selectedIDRef.current);

  const dispatch = useDispatch();

  useEffect(() => {
    console.group("CustomEditorTable useEffect tableData");
    if (selectedIDRef.current === -1) {
      console.log(`selectedIDRef.current: ${selectedIDRef.current}`);
      setSelectedID(selectedIDRef.current);
      setShowList(tableData);
    }
    console.table(tableData);
    console.groupEnd("CustomEditorTable useEffect tableData ");

  }, [tableData, selectedIDRef.current]);

  const setEditor = (editor) =>
    setSelectedEditor({
      id: editor.id,
      name: editor.name,
    });

  const handleRowClick = useCallback((e) => {
    // TODO: popup confirm window
    console.group(`handleRowClick selectedID`);
    // console.log(
    //   `handleRowClick selectedID: ${e.currentTarget.children[0].innerText}`
    // );
    console.dir(e.currentTarget.id);
    console.groupEnd(`handleRowClick selectedID`);
    const selectedID = e.currentTarget.id;
    // TODO:
    // if (selectedID < 0) return;
    // const sEditor = showList.find((t, rowIndex) => rowIndex == selectedID);
    // TODO:
    // if (!sEditor) return;
    selectedIDRef.current = selectedID;

    setSelectedID(selectedID);
    // setEditor(sEditor);
  }, []);

  return (
    <div>
      <Table>
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
      </Table>
    </div>
  );
}

export default CustomEditorTable;
