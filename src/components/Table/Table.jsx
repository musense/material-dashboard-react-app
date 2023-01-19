import React, { useEffect, useState } from "react";
// @material-ui/core components
import Table from "@material-ui/core/Table";
import { FixedPlugin } from "components/FixedPlugin/FixedPlugin.jsx";
import { useDispatch } from "react-redux";
import { ADD_TAG, DELETE_TAG, UPDATE_TAG } from "../../actions/GetTagsAction";
import CustomTableBody from "../CustomTableBody/CustomTableBody";
import CustomTableHead from "../CustomTableHead/CustomTableHead";

function CustomTable({ ...props }) {
  const { tableData, tableHead, openModal, closeModal, selectedIDRef } = props;

  const nullTag = {
    id: "",
    name: "",
    showOnPage: "",
    taggedNumber: "",
  };
  const [showList, setShowList] = useState(tableData);
  const [isCreate, setIsCreate] = useState(true);
  const [selectedTag, setSelectedTag] = useState(nullTag);
  const [origSelectedTag, setOrigSelectedTag] = useState(nullTag);
  const [fixedClasses, setFixedClasses] = useState("dropdown");
  const [selectedID, setSelectedID] = useState(selectedIDRef.current);

  const dispatch = useDispatch();

  useEffect(() => {
    console.group("Table useEffect tableData");
    if (selectedIDRef.current === -1) {
      console.log(`selectedIDRef.current: ${selectedIDRef.current}`);
      setSelectedID(selectedIDRef.current);
    }
    console.table(tableData);
    console.groupEnd("Table useEffect tableData ");

    setShowList(tableData);
  }, [tableData, selectedIDRef.current]);

  const setTag = (tag) =>
    setSelectedTag({
      id: tag.id,
      name: tag.name,
      showOnPage: tag.showOnPage,
      taggedNumber: tag.taggedNumber,
    });

  const handleRowClick = (e) => {
    // TODO: popup confirm window
    const selectedID = e.currentTarget.id;
    // TODO:
    if (selectedID < 0) return;
    const sTag = showList.find((t, rowIndex) => rowIndex == selectedID);
    console.group(`handleRowClick selectedID`);
    console.log(`handleRowClick sTag: ${JSON.stringify(sTag)}`);
    console.groupEnd(`handleRowClick selectedID`);
    // TODO:
    if (!sTag) return;
    selectedIDRef.current = selectedID;
    console.log(
      `CustomTable handleRowClick selectedIDRef.current: ${
        selectedIDRef.current
      }`
    );
    setSelectedID(selectedID);
    setTag(sTag);
    setIsCreate(true);
  };

  function handleFixedClick() {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  }

  // POST
  function handleAddRow() {
    // console.group("handleAddRow selectedTag");
    // console.table(selectedTag);
    // console.groupEnd("handleAddRow selectedTag");
    const sTag = Object.values(selectedTag);
    // TODO:
    if (sTag.some((t) => !t)) return;
    const data = Object.assign({}, selectedTag);
    // console.group("handleAddRow data");
    // console.table(data);
    // console.groupEnd("handleAddRow data");
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

    // const _id = selectedTag._id;
    const data = Object.assign({}, selectedTag);
    dispatch({
      type: UPDATE_TAG,
      payload: {
        data,
      },
    });

    openModal();
    setTag(selectedTag);
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

  const setSelectedTagEmpty = () => setSelectedTag(nullTag);

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

  function handleIDChange(e) {
    const changedTag = Object.assign({}, selectedTag, {
      id: e.target.value,
    });
    setSelectedTag(changedTag);
  }

  function handleNameChange(e) {
    const changedTag = Object.assign({}, selectedTag, {
      name: e.target.value,
    });
    setSelectedTag(changedTag);
  }
  function handleShowOnPageChange(e) {
    const changedTag = Object.assign({}, selectedTag, {
      showOnPage: e.target.value,
    });
    setSelectedTag(changedTag);
  }
  function handleTaggedNumberChange(e) {
    const changedTag = Object.assign({}, selectedTag, {
      taggedNumber: e.target.value,
    });
    setSelectedTag(changedTag);
  }

  return (
    <div>
      <FixedPlugin
        handleFixedClick={handleFixedClick}
        fixedClasses={fixedClasses}
        id={selectedTag.id}
        name={selectedTag.name}
        showOnPage={selectedTag.showOnPage}
        taggedNumber={selectedTag.taggedNumber}
        isCreate={isCreate}
        handleIDChange={handleIDChange}
        handleNameChange={handleNameChange}
        handleShowOnPageChange={handleShowOnPageChange}
        handleTaggedNumberChange={handleTaggedNumberChange}
        handleCreateTag={handleCreateTag}
        handleAddRow={handleAddRow}
        handleUpdateRow={handleUpdateRow}
        handleDeleteRow={handleDeleteRow}
        handleCancel={handleCancel}
      />
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

export default CustomTable;
