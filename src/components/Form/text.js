import React, { useState, useMemo } from "react";
import { EditorState, convertToRaw ,convertFromRaw} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import "./styles.css";

import { Box, Button} from '@mui/material';

const Text=({postData,setPostData})=>{
  const dataTobeset =EditorState.createEmpty();

  const [editorState, setEditorState] = useState(dataTobeset);
  // const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const handleChange = (data) => {
    setEditorState(data);
  };
  // var htmlData = useMemo(
  //   () => draftToHtml(convertToRaw(editorState.getCurrentContent())),
  //   [editorState]
  // );
  var Data = useMemo(
    () => {

      const stringData =JSON.stringify(convertToRaw(editorState.getCurrentContent()))
      setPostData({...postData,message:stringData})
    },
    [editorState]
  );

  // const setHtml=()=>{
  //   const message=JSON.stringify(Data)
  //   console.log(message)
  // }

    return(<Box sx={{minHeight:"100px"}}>
                <Editor
        editorState={editorState}
        onEditorStateChange={handleChange}
        toolbarClassName="toolbarClassName"
  wrapperClassName="wrapperClassName"
  editorClassName="editorClassName"
        // toolbar={toolbarOptions}
      />
        
    </Box>)

}

export default Text;