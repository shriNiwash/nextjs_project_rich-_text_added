import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import React,{useEffect} from 'react';

const Quill = ({setData}) => {
  const { quill, quillRef } = useQuill();
  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        setData(quillRef.current.firstChild.innerHTML)
      });
    }
  }, [quill]);


  return (
    <>
      <div style={{ width: 500, height: 100 }}>
        <div ref={quillRef} />
      </div>
    </>
  );
};

export default Quill;
