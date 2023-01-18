import React, { useState, useEffect } from "react"; // useState
import { useSelector, useDispatch } from "react-redux";
import CustomModal from "../../components/CustomModal/CustomModal";
import IEditor from "../IEditor/IEditor";
import { REQUEST_EDITOR } from "../../actions/GetEditorAction";
import ReactDOM from "react-dom";
import { BrowserRouter, NavLink, Route, Switch, Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

function EditorList(props) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const titleList = useSelector((state) => state.getEditorReducer.titleList);
  const returnMessage = useSelector(
    (state) => state.getEditorReducer.errorMessage
  );
  console.log(`EditorList useEffect titleList: ${JSON.stringify(titleList)}`);
  useEffect(() => {
    if (returnMessage === "get editor finish") setIsModalOpen(false);
    
    dispatch({ type: REQUEST_EDITOR });
  }, []);

  const { classes } = props;

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Editor List</h4>
          <p className={classes.cardCategoryWhite}>
            Here is a subtitle for this editor list
          </p>
        </CardHeader>
      </GridItem>
      <CardBody>
        {titleList ? (
          <Table
            tableHeaderColor="primary"
            tableHead={["ID", "Title"]}
            tableData={titleList}
          />
        ) : (
          <CustomModal isModalOpen={isModalOpen} />
        )}
      </CardBody>
      {/* <NavLink to={`/editor/editorPage`}>{"editorPage"}</NavLink> */}
    </GridContainer>
  );
}

export default withStyles(styles)(EditorList);

// {
//   titleList
//     ? titleList.map((t, index) => (
//         <Link to={`/admin/ieditor?id=${t._id}`}>{t.title}</Link>
//       ))
//     : null;
// }
