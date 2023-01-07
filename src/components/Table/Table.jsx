import React, {
  useState,
  // useEffect, useCallback
} from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// import Checkbox from "@material-ui/core/Checkbox";
// import Check from "@material-ui/icons/Check";
// import GridItem from "components/Grid/GridItem.jsx";
// import CustomInput from "components/CustomInput/CustomInput.jsx";
// import Edit from "@material-ui/icons/Edit";
// import IconButton from "@material-ui/core/IconButton";
// import Tooltip from "@material-ui/core/Tooltip";
// import Close from "@material-ui/icons/Close";
import { FixedPlugin } from "components/FixedPlugin/FixedPlugin.jsx";
// core components
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";
// import { GET_SELECTED_TAG_SUCCESS } from "../../actions/GetTagsAction";
// import { useDispatch, useSelector } from "react-redux";
import TAG from "./../../model/tags";

function CustomTable({ ...props }) {
  const {
    classes,
    tableHead,
    // tableData,
    tableHeaderColor,
    // checkedIndexes,
  } = props;

  const nullTag = {
    id: "",
    name: "",
    showOnPage: "",
    taggedNumber: "",
  };

  const [tableData, setTableData] = useState(TAG); // original data

  const [tagList, setTagList] = useState(tableData); // mutable data
  const [selectedTag, setSelectedTag] = useState(nullTag);
  const [origSelectedTag, setOrigSelectedTag] = useState(nullTag);

  const [errors, setErrors] = useState({ username: "" });
  const [email, setEmail] = useState();

  const [image, setImage] = useState();
  const [color, setColor] = useState();
  const [fixedClasses, setFixedClasses] = useState("dropdown");

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleTagRowClick = (e) => {
    console.log(`handleTagRowClick id: ${e.currentTarget.id.substring(0, 1)}`);
    const selectedIndex = e.currentTarget.id.substring(0, 1);
    const sTag = tagList.filter((t, index) => index == selectedIndex).flat();
    console.log(`handleTagRowClick setSelectedTag: ${JSON.stringify(sTag)}`);
    setSelectedIndex(selectedIndex);
    setTag(sTag);
    // dispatch({
    //   type: GET_SELECTED_TAG_SUCCESS,
    //   payload: {
    //     selectedIndex: e.currentTarget.id.substring(0, 1),
    //   },
    // });
    // handelRowSelected = true
  };
  // const handleTagRowOver = (e) => {
  //   console.log(`handleTagRowOver id: ${e.currentTarget.id.substring(0, 1)}`);
  // };

  const setTag = (tag) => {
    setSelectedTag({
      id: tag[0],
      name: tag[1],
      showOnPage: tag[2],
      taggedNumber: tag[3],
    });
    setOrigSelectedTag({
      id: tag[0],
      name: tag[1],
      showOnPage: tag[2],
      taggedNumber: tag[3],
    });
  };

  const handleImageClick = (image) => {
    setImage(image);
  };
  const handleColorClick = (color) => {
    setColor(color);
  };

  const handleFixedClick = () => {
    console.log(`fixedClasses: ${fixedClasses}`);
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleAddRow = () => {
    console.log(`add row!!! add row : ${JSON.stringify(selectedTag)}`);
    const sTag = Object.values(selectedTag);
    if (sTag.some((t) => !t)) {
      console.log(`add row!!! add row : ${"required content!!!"}`);
      return;
    }
    const nowTagList = [...tagList].concat([sTag]);
    console.log(
      `add row!!! add row nowTagList : ${JSON.stringify(nowTagList)}`
    );

    setTag(nullTag);
    setTagList(nowTagList);
  };
  const handleUpdateRow = () => {
    console.log(`update row!!! selected row index: ${selectedIndex}`);
    console.log(
      `update row!!! selected row origSelectedTag: ${JSON.stringify(
        origSelectedTag
      )}`
    );
    console.log(
      `update row!!! selected row selectedTag: ${JSON.stringify(selectedTag)}`
    );

    if (JSON.stringify(origSelectedTag) === JSON.stringify(selectedTag)) {
      console.log(`update row!!! nothing to update!!!`);
      return;
    }

    const sTag = Object.values(selectedTag);
    const uTagList = tagList.map((t, index) =>
      index == selectedIndex ? sTag : t
    );

    console.log(`update row!!! selected row uTagList: ${uTagList}`);
    setTag(sTag);
    setTagList(uTagList);
  };

  const handleDeleteRow = () => {
    if (selectedIndex < 0) return;
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
  };
  return (
    <div className={classes.tableResponsive}>
      <FixedPlugin
        handleImageClick={() => handleImageClick}
        handleColorClick={() => handleColorClick}
        bgColor={"color"}
        bgImage={"image"}
        handleFixedClick={() => handleFixedClick}
        fixedClasses={fixedClasses}
        selectedTag={selectedTag}
        addRow={() => handleAddRow}
        updateRow={() => handleUpdateRow}
        deleteRow={() => handleDeleteRow}
      />
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow>
              {/* <TableCell /> */}
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
              <TableCell />
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tagList.map((prop, key) => {
            return (
              <>
                <TableRow
                  key={key}
                  onClick={handleTagRowClick}
                  // onMouseOver={handleTagRowOver}
                  id={key + "_Row"}
                  hover={true}
                  selected={key == selectedIndex}
                >
                  {prop.map((prop, key) => {
                    return (
                      <TableCell className={classes.tableCell} key={key}>
                        {prop}
                      </TableCell>
                    );
                  })}
                  {/* <TableCell className={classes.tableActions}>
                    <Tooltip
                      id="tooltip-top"
                      title="Edit Task"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <IconButton
                        aria-label="Edit"
                        className={classes.tableActionButton}
                      >
                        <Edit
                          id={key + "_Edit"}
                          className={
                            classes.tableActionButtonIcon + " " + classes.edit
                          }
                          onClick={onEdit}
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      id="tooltip-top-start"
                      title="Remove"
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <IconButton
                        aria-label="Close"
                        className={classes.tableActionButton}
                      >
                        <Close
                          className={
                            classes.tableActionButtonIcon + " " + classes.close
                          }
                          onclick={onClose}
                        />
                      </IconButton>
                    </Tooltip>
                  </TableCell> */}
                </TableRow>
              </>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};

export default withStyles(tableStyle)(CustomTable);
