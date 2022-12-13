import React, { useState, useMemo } from "react";
import { EditorState, convertToRaw ,convertFromRaw} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import "./styles.css";

import { Box} from '@mui/material';
import { useEffect } from "react";

const Text=({postData,setPostData ,post})=>{
  

  // const dataTobeset = post?(createWithContent(
  //   convertFromRaw(JSON.parse(post.message)):

  // console.log(post)
  const [edata,setEdata]=useState(post?(EditorState.createWithContent(
    convertFromRaw(JSON.parse(post.message)))):EditorState.createEmpty())
  const [editorState, setEditorState] = useState(edata);
  // const [editorState, setEditorState] = useState(EditorState.createEmpty())
 
  useEffect(() => {
    if(post) {
      setEdata(EditorState.createWithContent(
      convertFromRaw(JSON.parse(post.message))))
    }
  }, [post])
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
// EditorState.createWithContent(
//   convertFromRaw(rawContentState)