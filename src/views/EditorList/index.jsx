import React, { useEffect, useState } from 'react'; // useState
// core components
import Card from 'components/Card/Card.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import EditorListHeader from "./EditorListHeader";
import EditorListBody from "./EditorListBody";

import * as GetEditorAction from "../../actions/GetEditorAction";
import { reDispatchMessage } from './../../reducers/errorMessage';
import { getServerMessage } from 'reducers/GetEditorReducer';


function EditorList() {

  const dispatch = useDispatch();
  const serverMessage = useSelector(getServerMessage);

  useEffect(() => {
    if (reDispatchMessage.includes(serverMessage)) {
      dispatch({ type: GetEditorAction.REQUEST_EDITOR })
    }

  }, [serverMessage]);

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






