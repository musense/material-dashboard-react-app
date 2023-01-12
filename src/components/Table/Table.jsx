import React, { useState, useEffect } from "react";
// @material-ui/core components
import Table from "@material-ui/core/Table";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import TableCell from "@material-ui/core/TableCell";
import { FixedPlugin } from "components/FixedPlugin/FixedPlugin.jsx";
import CustomTableHead from "../CustomTableHead/CustomTableHead";
import CustomTableBody from "../CustomTableBody/CustomTableBody";
import {
  REQUEST_TAG,
  ADD_TAG,
  UPDATE_TAG,
  DELETE_TAG,
} from "../../actions/GetTagsAction";
import { useSelector, useDispatch } from "react-redux";

function CustomTable({ ...props }) {
  const { tableData } = props;

  const nullTag = {
    id: "",
    name: "",
    showOnPage: "",
    taggedNumber: "",
  };
  const [tagList, setTagList] = useState(tableData);
  const [isCreate, setIsCreate] = useState(true);
  const [selectedTag, setSelectedTag] = useState(nullTag);
  const [origSelectedTag, setOrigSelectedTag] = useState(nullTag);
  const [fixedClasses, setFixedClasses] = useState("dropdown");
  const tableHead = ["ID", "Name", "ShowOnPage", "TaggedNumber"];

  const dispatch = useDispatch();
  const addTagSuccess = useSelector(
    (state) => state.getTagReducer.errorMessage === "add tag successfully"
  );
  const updateTagSuccess = useSelector(
    (state) => state.getTagReducer.errorMessage === "update tag successfully"
  );
  const deleteTagSuccess = useSelector(
    (state) => state.getTagReducer.errorMessage === "delete tag successfully"
  );
  const addTagFail = useSelector(
    (state) => state.getTagReducer.errorMessage === "add tag fail!"
  );
  const updateTagFail = useSelector(
    (state) => state.getTagReducer.errorMessage === "update tag fail!"
  );
  const deleteTagFail = useSelector(
    (state) => state.getTagReducer.errorMessage === "delete tag fail!"
  );
  const [selectedID, setSelectedID] = useState(-1);

  useEffect(() => {
    // console.group("Table useEffect tableData");
    // console.table(tableData);
    // console.groupEnd("Table useEffect tableData ");
    if (addTagSuccess || updateTagSuccess || deleteTagSuccess)
      dispatch({ type: REQUEST_TAG });
    // TODO: popup window
    if (addTagFail || updateTagFail || deleteTagFail)
      console.error("!!!SERVER ERROR!!!");

    setTagList(tableData);
  }, [
    addTagSuccess,
    updateTagSuccess,
    deleteTagSuccess,
    addTagFail,
    updateTagFail,
    deleteTagFail,
    tableData,
  ]);
  const setTag = (tag) =>
    setSelectedTag({
      id: tag.id,
      name: tag.name,
      showOnPage: tag.showOnPage,
      taggedNumber: tag.taggedNumber,
    });

    
  const handleRowClick = (e) => {
    // TODO: popup confirm window
    console.group(`handleRowClick selectedID`);
    console.log(
      `handleRowClick selectedID: ${e.currentTarget.children[0].innerText}`
    );
    console.groupEnd(`handleRowClick selectedID`);
    const selectedID = e.currentTarget.children[0].innerText;
    // TODO:
    if (!selectedID || selectedID < 0) return;
    const sTag = tagList.find((t) => t.id == selectedID);
    // TODO:
    if (!sTag) return;

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

    setSelectedTagEmpty();
    setIsCreate(true);
  }

  // PATCH
  function handleUpdateRow() {
    // TODO: add confirm window
    // TODO:
    if (selectedID < 0) return;
    // console.group("handleUpdateRow selectedTag");
    // console.table(selectedTag);
    // console.groupEnd("handleUpdateRow ");
    // console.group("handleUpdateRow origSelectedTag");
    // console.table(origSelectedTag);
    // console.groupEnd("handleUpdateRow ");

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

    setTag(selectedTag);
  }

  // DELETE
  function handleDeleteRow() {
    // TODO: add confirm window
    // console.group("handleDeleteRow selectedIndex");
    // console.log(selectedID);
    // console.groupEnd("handleDeleteRow ");
    // TODO:
    if (selectedID < 0) return;
    // console.group("handleDeleteRow origSelectedTag");
    // console.table(origSelectedTag);
    // console.groupEnd("handleDeleteRow ");
    dispatch({
      type: DELETE_TAG,
      payload: {
        data: selectedID,
      },
    });
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
        {tagList ? (
          <>
            <CustomTableHead tableHead={tableHead} />
            <CustomTableBody
              selectedID={selectedID}
              handleRowClick={handleRowClick}
              tagList={tagList}
            />
          </>
        ) : null}
      </Table>
    </div>
  );
}

export default CustomTable;
