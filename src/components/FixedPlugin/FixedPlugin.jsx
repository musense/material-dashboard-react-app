import classnames from "classnames";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import React, { useState } from "react";

// @material-ui/core components


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
  const [classes, setClasses] = useState("dropdown show");

  // console.group('FixedPlugin props')
  // console.table(props);
  // console.groupEnd('FixedPlugin props ')

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
        <div onClick={props.handleFixedClick}>
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
                    <label htmlFor="id">ID</label>
                    <input
                      type="text"
                      id="id"
                      value={props.id}
                      onChange={props.handleIDChange}
                    />
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={props.name}
                      onChange={props.handleNameChange}
                    />
                    <label htmlFor="showOnPage">ShowOnPage</label>
                    <input
                      type="text"
                      id="showOnPage"
                      value={props.showOnPage}
                      onChange={props.handleShowOnPageChange}
                    />
                    <label htmlFor="taggedNumber">TaggedNumber</label>
                    <input
                      type="text"
                      id="taggedNumber"
                      value={props.taggedNumber}
                      onChange={props.handleTaggedNumberChange}
                    />
                  </GridContainer>
                </CardBody>
              </Card>
              {/* </form> */}
            </GridItem>
          </GridContainer>
          {props.isCreate ? (
            <button
              type="button"
              value="button"
              onClick={props.handleCreateTag}
            >
              CREATE
            </button>
          ) : (
            <button type="button" value="button" onClick={props.handleAddRow}>
              ADD
            </button>
          )}

          <button type="button" value="button" onClick={props.handleUpdateRow}>
            UPDATE
          </button>
          <button type="button" value="button" onClick={props.handleDeleteRow}>
            DELETE
          </button>
          <button type="button" value="button" onClick={props.handleCancel}>
            CANCEL
          </button>
        </ul>
      </div>
    </div>
  );
};
