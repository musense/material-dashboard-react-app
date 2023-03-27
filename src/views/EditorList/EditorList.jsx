import React, { useEffect, useRef, useState } from 'react'; // useState
// @material-ui/core components
import { withStyles } from '@material-ui/styles';
// core components
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';
import CustomEditorTable from 'components/CustomEditorTable/CustomEditorTable.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  REQUEST_EDITOR,
  DELETE_EDITOR,
  INITIAL_EDITOR,
} from '../../actions/GetEditorAction';
import CustomModal from '../../components/CustomModal/CustomModal';
import Button from 'components/CustomButtons/Button';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { REQUEST_TAG } from '../../actions/GetTagsAction';

const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
};

function EditorList(props) {
  const { classes } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const titleList = useSelector((state) => state.getEditorReducer.titleList);

  console.log(
    '🚀 ~ file: EditorList.jsx:59 ~ EditorList ~ titleList:',
    titleList
  );
  const tableHead =
    titleList && titleList.length > 0 && Object.keys(titleList[0]);

  const [addEditorDisabled, setAddEditorDisabled] = useState(false);

  const [isRowLink, setIsRowLink] = useState(true);
  const returnMessage = useSelector(
    (state) => state.getEditorReducer.errorMessage
  );
  const mounted = useRef();
  const selectedIDRef = useRef(null);
  useEffect(() => {
    if (!mounted.current) {
      //componentDidMount
      selectedIDRef.current = -1;
      mounted.current = true;
      dispatch({ type: REQUEST_EDITOR });
      dispatch({ type: REQUEST_TAG });
    } else {
      //componentDidUpdate
      if (returnMessage && returnMessage.indexOf('successfully') !== -1) {
        if (returnMessage.indexOf('update') === -1) {
          selectedIDRef.current = -1;
        }
        closeModal();
      }
    }

    return () => { };
  }, [returnMessage]);

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }
  function onSelectEditorClick() {
    setIsRowLink((prevIsRowLink) => !prevIsRowLink);
  }
  function onDeleteEditorClick() {
    const ids = [selectedIDRef.current];

    dispatch({
      type: DELETE_EDITOR,
      payload: {
        data: {
          ids,
        },
      },
    });
  }

  function initialEditorState() {
    dispatch({ type: INITIAL_EDITOR });
  }
  function onAddNewEditor() {
    initialEditorState()
    navigate('/admin/editorList/edit/new');
  }
  return (
    <GridContainer>
      {/* <CustomModal ariaHideApp={false} isModalOpen={isModalOpen} /> */}
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Editor List</h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this editor list
            </p>
          </CardHeader>
          <CardBody>
            {titleList && titleList.length > 0 ? (
              <>
                <CustomEditorTable
                  tableHeaderColor='primary'
                  tableHead={tableHead}
                  tableData={titleList}
                  openModal={openModal}
                  closeModal={closeModal}
                  initialEditorState={initialEditorState}
                  selectedIDRef={selectedIDRef}
                  isRowLink={isRowLink}
                />
                <div className={'EditorList-Button-Container'}>
                  <Button color='info' onClick={() => onSelectEditorClick()}>
                    {isRowLink ? 'Select Editor' : 'Cancel Select'}
                  </Button>
                  <div
                    className={
                      isRowLink ? 'HideDeleteButton' : 'ShowDeleteButton'
                    }
                  >
                    <Button
                      color='danger'
                      disabled={addEditorDisabled}
                      onClick={() => onDeleteEditorClick()}
                    >
                      Delete Editor
                    </Button>
                  </div>
                </div>
              </>
            ) : null}
            <Button
              color='info'
              disabled={addEditorDisabled}
              onClick={() => onAddNewEditor()}
            >
              Add New Editor
            </Button>
          </CardBody>
        </Card>
      </GridItem>
      <Outlet />
    </GridContainer>
  );
}

export default withStyles(styles)(EditorList);
