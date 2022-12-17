import React, { useState, useMemo } from "react";
import { EditorState, convertToRaw ,convertFromRaw} from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


import { Box} from '@mui/material';
import { useEffect } from "react";

const Text=({postData,setPostData ,post})=>{
  



  
  const [edata,setEdata]=useState(post?(EditorState.createWithContent(
    convertFromRaw(JSON.parse(post.message)))):EditorState.createEmpty())
  const [editorState, setEditorState] = useState(edata);

 
  useEffect(() => {
    if(post) {
      setEdata(EditorState.createWithContent(
      convertFromRaw(JSON.parse(post.message))))
      setPostData(post)
    }
  }, [post])
  const handleChange = (data) => {
    setEditorState(data);
  };
  
  var Data = useMemo(
    () => {
      const stringData =JSON.stringify(convertToRaw(editorState.getCurrentContent()))
      setPostData({...postData,message:stringData})
     
    },
    [editorState]
  );

//  useEffect(() => {
//   const stringData =JSON.stringify(convertToRaw(editorState.getCurrentContent()))
//        setPostData({...postData,message:stringData})
//  }, [editorState])
 

    return(<Box sx={{minHeight:"100px"}}>
                <Editor
        editorState={editorState}
        onEditorStateChange={handleChange}
        toolbarClassName="toolbarClassName"
  wrapperClassName="wrapperClassName"
  editorClassName="editorClassName"
      
      />
        
    </Box>)

}

export default Text;
