import React, {
  Suspense, lazy,
  useEffect, useRef, useState, useCallback
} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from "react-router-dom";

function EditorManager() {
  const dispatch = useDispatch();


  return (
    <>
      <header>
        <h2>文章管理</h2>
        <nav>
          <ul>
            <li>
              <Link to={'news'}>
                最新文章
              </Link>
            </li>
            <li>
              <Link to={'hot'}>
                熱門文章
              </Link>
            </li>
            <li>
              <Link to={'recommend'}>
                推薦文章
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Suspense>
        <Outlet />
      </Suspense>
    </>
  )
}


export default EditorManager