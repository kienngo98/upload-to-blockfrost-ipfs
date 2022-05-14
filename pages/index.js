import React, {useReducer} from 'react';
import '../styles/Home.module.css'
import DropZone from '../components/DropZone/DropZone';

export default function Home() {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_IN_DROP_ZONE':
        return { ...state, inDropZone: action.inDropZone };
      case 'ADD_FILE_TO_LIST':
        return { ...state, fileList: state.fileList.concat(action.files)};
      default:
        return state;
    }
  }

  const [data, dispatch] = useReducer(reducer, {
    inDropZone: false,
    fileList: []
  });

  return (
    <DropZone data={data} dispatch={dispatch} />
  )
}
