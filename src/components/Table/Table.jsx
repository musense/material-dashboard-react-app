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
import { errorMessage } from "./../../reducers/errorMessage";
import { useSelector, useDispatch } from "react-redux";
import CustomModal from "../CustomModal/CustomModal";

function CustomTable({ ...props }) {
  const { tableData, tableHead } = props;

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const tableHead = ["ID", "Name", "ShowOnPage", "TaggedNumber"];

  const dispatch = useDispatch();

  const returnMessage = useSelector(
    (state) => state.getTagReducer.errorMessage
  );
  let successMessages = [],
    failMessages = [],
    finishMessages = [];
  const [selectedID, setSelectedID] = useState(-1);

  const filterErrorMessagesAndReturn = (
    errorMsgs,
    filterType,
    reduceMessages
  ) =>
    (reduceMessages = Object.keys(errorMsgs)
      .filter((key) => key.endsWith(filterType))
      .reduce((acc, cur) => [...acc, cur], []));

  filterErrorMessagesAndReturn(errorMessage, "Success", successMessages);
  filterErrorMessagesAndReturn(errorMessage, "Fail", failMessages);
  filterErrorMessagesAndReturn(errorMessage, "Finish", finishMessages);

  useEffect(() => {
    // console.group("Table useEffect tableData");
    // console.table(tableData);
    // console.groupEnd("Table useEffect tableData ");
    if (successMessages.includes(returnMessage))
      dispatch({ type: REQUEST_TAG });
    // TODO: popup window
    if (failMessages.includes(returnMessage))
      console.error("!!!SERVER ERROR!!!");
    if (finishMessages.includes(returnMessage)) closeModal();

    setTagList(tableData);
  }, [returnMessage, tableData]);
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

    openModal();
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

    openModal();
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

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }
  return (
    <div>
      <CustomModal isModalOpen={isModalOpen} />
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
