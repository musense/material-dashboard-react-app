import React, {
  Component,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import classnames from "classnames";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import { take } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";
import {
  UPDATE_SELECTED_TAG_SUCCESS,
  DELETED_SELECTED_TAG_SUCCESS,
} from "../../actions/GetTagsAction";

import { NavLink } from "react-router-dom";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from "react-share";
import GitHubButton from "react-github-button";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import imagine1 from "assets/img/sidebar-1.jpg";
import imagine2 from "assets/img/sidebar-2.jpg";
import imagine3 from "assets/img/sidebar-3.jpg";
import imagine4 from "assets/img/sidebar-4.jpg";

import Button from "components/CustomButtons/Button.jsx";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};
export const FixedPlugin = (props) => {
  // const inputLayout = useMemo(() => <></>, [
  //   id,
  //   name,
  //   showOnPage,
  //   taggedNumber,
  // ]);
  const [classes, setClasses] = useState("dropdown show");
  const [errors, setErrors] = useState({});

  const {
    handleImageClick,
    handleColorClick,
    bgColor,
    bgImage,
    handleFixedClick,
    fixedClasses,
    selectedTag,
    addRow,
    updateRow,
    deleteRow,
  } = props;

  const [id, setID] = useState(selectedTag.id);
  const [name, setName] = useState(selectedTag.name);
  const [showOnPage, setShowOnPage] = useState(selectedTag.showOnPage);
  const [taggedNumber, setTaggedNumber] = useState(selectedTag.taggedNumber);

  const onIDChange = (e) => {
    setID(e.target.value);
  };
  const onNameChange = (e) => {
    setName(e.target.value);
  };
  const onShowOnPageChange = (e) => {
    setShowOnPage(e.target.value);
  };
  const onTaggedNumberChange = (e) => {
    setTaggedNumber(e.target.value);
  };

  const setInputEmpty = () => {
    setID("");
    setName("");
    setShowOnPage("");
    setTaggedNumber("");
  };

  const onStateAddRow = () => {
    selectedTag.id = id;
    selectedTag.name = name;
    selectedTag.showOnPage = showOnPage;
    selectedTag.taggedNumber = taggedNumber;
    console.log(`onStateAddRow!!! id: ${id}`);
    // console.log(`onStateAddRow!!! name: ${name}`);
    // console.log(`onStateAddRow!!! showOnPage: ${showOnPage}`);
    console.log(`onStateAddRow!!! selectedTag: ${JSON.stringify(selectedTag)}`);
    return addRow;
  };
 
  // {
  //   setInputEmpty();
  // }

  useEffect(() => {
    console.log(`useEffect!!! id: ${id}`);
    console.log(`useEffect!!! name: ${name}`);
    console.log(`useEffect!!! showOnPage: ${showOnPage}`);
    console.log(`useEffect!!! taggedNumber: ${taggedNumber}`);
  }, [id, name, showOnPage, taggedNumber]);

  return (
    <div
      className={classnames(
        "fixed-plugin"
        // {
        //   "rtl-fixed-plugin": props.rtlActive,
        // }
      )}
    >
      <div id="fixedPluginClasses" className={props.fixedClasses}>
        <div onClick={props.handleFixedClick()}>
          <i className="fa fa-cog fa-2x" />
        </div>

        <ul className="dropdown-menu">
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              {/* <form id="tagForm" > */}
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Update Tag</h4>
                </CardHeader>
                <CardBody>
                  <GridContainer
                    container
                    direction="column"
                    justifyContent="space-evenly"
                    alignItems="flex-start"
                  >
                    <label for="id">ID</label>
                    <input
                      key="id"
                      type="text"
                      id="id"
                      placeholder={id}
                      onChange={onIDChange}
                      on
                    />
                    <label for="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      // placeholder={selectedTag.name}
                      onChange={onNameChange}
                    />
                    <label for="showOnPage">ShowOnPage</label>
                    <input
                      type="text"
                      id="showOnPage"
                      // placeholder={selectedTag.showOnPage}
                      onChange={onShowOnPageChange}
                    />
                    <label for="taggedNumber">TaggedNumber</label>
                    <input
                      type="text"
                      id="taggedNumber"
                      // placeholder={selectedTag.taggedNumber}
                      onChange={onTaggedNumberChange}
                    />
                    {/* <label for="id">ID</label>
                    <input
                      key="id"
                      type="text"
                      id="id"
                      placeholder={id}
                      onChange={onIDChange}
                      on
                    />
                    <label for="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      // placeholder={selectedTag.name}
                      onChange={onNameChange}
                    />
                    <label for="showOnPage">ShowOnPage</label>
                    <input
                      type="text"
                      id="showOnPage"
                      // placeholder={selectedTag.showOnPage}
                      onChange={onShowOnPageChange}
                    />
                    <label for="taggedNumber">TaggedNumber</label>
                    <input
                      type="text"
                      id="taggedNumber"
                      // placeholder={selectedTag.taggedNumber}
                      onChange={onTaggedNumberChange}
                    /> */}
                    {/* <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Name"
                        id="name"
                        error={errors.name}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          required: true,
                          defaultValue: name,
                          name: "name",
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="ShowOnPage"
                        id="showOnPage"
                        error={errors.showOnPage}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          required: true,
                          defaultValue: showOnPage,
                          name: "showOnPage",
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="TaggedNumber"
                        id="taggedNumber"
                        error={errors.taggedNumber}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          required: true,
                          defaultValue: taggedNumber,
                          name: "taggedNumber",
                        }}
                      />
                    </GridItem> */}
                  </GridContainer>
                </CardBody>
              </Card>
              {/* </form> */}
            </GridItem>
          </GridContainer>
          <button type="button" value="button" onClick={onStateAddRow}>
            ADD
          </button>
          <button type="button" value="button" onClick={updateRow()}>
            UPDATE
          </button>
          <button type="button" value="button" onClick={deleteRow()}>
            DELETE
          </button>
        </ul>
      </div>
    </div>
  );
};
