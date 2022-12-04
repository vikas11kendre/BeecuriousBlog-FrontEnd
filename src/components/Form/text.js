import React, { useState } from 'react';
import { convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
// import { convertToHTML } from 'draft-convert';
// import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import './App.css';
import { Box} from '@mui/material';

const Text=()=>{
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
      );
      const  [convertedContent, setConvertedContent] = useState(null);
      const handleEditorChange = async (state) => {
        // const data = convertToRaw(editorState.getCurrentContent());
         await setEditorState(state);
       
        // convertContentToHTML();
        
        console.log(convertedContent)
        // console.log(data)
      }
      // const convertContentToHTML = () => {
      //   // let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
      //   setConvertedContent(currentContentAsHTML);
      // }
    //   const createMarkup = (html) => {
    //     return  {
    //       __html: DOMPurify.sanitize(html)
    //     }
    //   }
    
    return(<Box>
                <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
        <Box>
        {/* <div  dangerouslySetInnerHTML={createMarkup(convertedContent)}></div> */}
        </Box>
    </Box>)

}

export default Text;