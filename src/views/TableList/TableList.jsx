import React, { useEffect, useState } from "react"; // useEffect
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { useSelector, useDispatch } from "react-redux";
import { REQUEST_TAG, GET_TAG_REQUEST } from "../../actions/GetTagsAction";
import CustomModal from "../../components/CustomModal/CustomModal";

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

function TableList(props) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const tableData = useSelector((state) => state.getTagReducer.tagList);
  const returnMessage = useSelector(
    (state) => state.getTagReducer.errorMessage
  );
  // console.group("TableList");
  // console.log(tableData);
  // console.table(tableData);
  // console.groupEnd("TableList ");
  useEffect(() => {
    if (returnMessage === "get tag finish") setIsModalOpen(false);

    dispatch({ type: REQUEST_TAG });
    // console.group("TableList useEffect");
    // console.table(tableData);
    // console.groupEnd("TableList useEffect ");
  }, []);

  const { classes } = props;

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Simple Table</h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            {tableData ? (
              <Table
                tableHeaderColor="primary"
                // tableHead={["Name", "Country", "City", "Salary"]}
                tableHead={["ID", "Name", "ShowOnPage", "TaggedNumber"]}
                tableData={tableData}
              />
            ) : (
              <CustomModal isModalOpen={isModalOpen} />
            )}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

export default withStyles(styles)(TableList);
