import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { FixedPlugin } from "components/FixedPlugin/FixedPlugin.jsx";
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";
import CustomTableBody from "../CustomTableBody/CustomTableBody";
import { REQUEST_TAG, ADD_TAG } from "../../actions/GetTagsAction";
import { useSelector, useDispatch } from "react-redux";

function CustomTable({ ...props }) {
  const { tableData } = props;

  const nullTag = {
    id: "",
    name: "",
    showOnPage: "",
    taggedNumber: "",
  };
  const [tagList, setTagList] = useState(tableData); // mutable data

  // const tableHeaderColor = "primary";
  const tableHead = ["ID", "Name", "ShowOnPage", "TaggedNumber"];
  const dispatch = useDispatch();
  const addTagSuccess = useSelector(
    (state) => state.getTagReducer.errorMessage === "add tag successfully"
  );
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    // console.group("Table useEffect tableData");
    // console.table(tableData);
    // console.groupEnd("Table useEffect tableData ");
    setTagList(tableData);
    if (addTagSuccess == true) dispatch({ type: REQUEST_TAG });
  }, [addTagSuccess, tableData]);

  const [isCreate, setIsCreate] = useState(true);

  const [selectedTag, setSelectedTag] = useState(nullTag);
  const [origSelectedTag, setOrigSelectedTag] = useState(nullTag);

  const [fixedClasses, setFixedClasses] = useState("dropdown");

  const handleRowClick = (e) => {
    console.log(
      `%chandleTagRowClick id: ${e.currentTarget.id.substring(0, 1)}`,
      "color:red"
    );
    const selectedIndex = e.currentTarget.id.substring(0, 1);
    const sTag = tagList.find((t, index) => index == selectedIndex);

    setSelectedIndex(selectedIndex);
    setTag(sTag);
    setIsCreate(true);

    // dispatch({
    //   type: GET_SELECTED_TAG_SUCCESS,
    //   payload: {
    //     selectedIndex: e.currentTarget.id.substring(0, 1),
    //   },
    // });
    // handelRowSelected = true
  };

  const setTag = (tag) => {
    setSelectedTag({
      id: tag.id,
      name: tag.name,
      showOnPage: tag.showOnPage,
      taggedNumber: tag.taggedNumber,
    });
    setOrigSelectedTag({
      id: tag.id,
      name: tag.name,
      showOnPage: tag.showOnPage,
      taggedNumber: tag.taggedNumber,
    });
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
    console.table(selectedTag);
    const sTag = Object.values(selectedTag);
    if (sTag.some((t) => !t)) return;

    dispatch({
      type: ADD_TAG,
      tag: selectedTag,
    });

    setSelectedTagEmpty();
    setIsCreate(true);
  }

  // PATCH
  function handleUpdateRow() {
    if (selectedIndex < 0) return;

    // console.table(origSelectedTag);
    // console.table(selectedTag);

    if (JSON.stringify(origSelectedTag) === JSON.stringify(selectedTag)) {
      // console.log(`update row!!! nothing to update!!!`);
      return;
    }

    const sTag = Object.values(selectedTag);
    const uTagList = tagList.map((t, index) =>
      index == selectedIndex ? sTag : t
    );

    // console.log(`update row!!! selected row uTagList: ${uTagList}`);
    setTag(sTag);
    setTagList(uTagList);
  }

  // DELETE
  function handleDeleteRow() {
    if (selectedIndex < 0) {
      // console.log(`delete row!!! nothing to delete!!!`);
      return;
    }
    const dTagList = [...tagList];
    let isDeleted = false;

    // console.log(
    //   `delete row!!! selected row selectedTag.values: ${JSON.stringify(
    //     Object.values(selectedTag)
    //   )}`
    // );
    tagList.forEach((t, i) => {
      if (isDeleted) return;
      // console.log(
      //   `delete row!!! selected tagList.forEach t: ${JSON.stringify(t)}`
      // );
      if (JSON.stringify(t) == JSON.stringify(Object.values(selectedTag))) {
        dTagList.splice(selectedIndex, 1);
        setTagList(dTagList);
        setSelectedTag(nullTag);
        setSelectedIndex(-1);
        isDeleted = true;
      }
    });
  }

  const setSelectedTagEmpty = () => {
    setSelectedTag(nullTag);
    setOrigSelectedTag(nullTag);
  };

  function handleCancel() {
    setSelectedTag(origSelectedTag);
    setOrigSelectedTag(origSelectedTag);
    setSelectedIndex(selectedIndex);
  }

  function handleCreateTag() {
    setSelectedIndex(-1);
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
    // <div className={classes.tableResponsive}>
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
      {/* <Table className={classes.table}> */}
      <Table>
        {tagList ? (
          <>
            <TableHead>
              <TableRow>
                {tableHead.map((prop, key) => (
                  <TableCell key={key}>{prop}</TableCell>
                ))}
                <TableCell />
              </TableRow>
            </TableHead>
            <CustomTableBody
              selectedIndex={selectedIndex}
              handleRowClick={handleRowClick}
              tagList={tagList}
            />
          </>
        ) : null}
      </Table>
    </div>
  );
}

// CustomTable.defaultProps = {
//   tableHeaderColor: "gray",
// };

// CustomTable.propTypes = {
//   // classes: PropTypes.object.isRequired,
//   tableHeaderColor: PropTypes.oneOf([
//     "warning",
//     "primary",
//     "danger",
//     "success",
//     "info",
//     "rose",
//     "gray",
//   ]),
//   tableHead: PropTypes.arrayOf(PropTypes.string),
//   tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
// };

// export default withStyles(tableStyle)(CustomTable);
export default CustomTable;
