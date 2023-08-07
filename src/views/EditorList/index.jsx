import React, { useEffect, useState } from 'react'; // useState
// core components
import Card from 'components/Card/Card.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import EditorListHeader from "./EditorListHeader";
import EditorListBody from "./EditorListBody";

import * as GetEditorAction from "../../actions/GetEditorAction";
import { reDispatchMessage } from './../../reducers/errorMessage';


function EditorList() {

  const dispatch = useDispatch();
  const returnMessage = useSelector(state => state.getEditorReducer.errorMessage);
  console.log("🚀 ~ file: index.jsx:20 ~ EditorList ~ returnMessage:", returnMessage)

  useEffect(() => {
    if (reDispatchMessage.includes(returnMessage)) {
      dispatch({ type: GetEditorAction.REQUEST_EDITOR })
    }

  }, [returnMessage]);

  useEffect(() => {
    dispatch({ type: GetEditorAction.REQUEST_EDITOR });
  }, [])

  const [isModalOpen, setIsModalOpen] = useState(true);



  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }
  return (
    <div className={'container'}>
      {/* <CustomModal ariaHideApp={false} isModalOpen={isModalOpen} /> */}
      {/* <div className={'wrapper'}> */}
      <Card>
        <EditorListHeader />
        <EditorListBody />
      </Card>
      {/* </div> */}
      <Outlet />
    </div>
  );
}


export default EditorList;






