import { useState } from "react";
import Quill from "./Components/quill"

const NewFile = ()=>{

    const [data,setData] = useState(['']);
    const description = data;
    console.log(description);
    return(<>
    <Quill setData={setData} />
    <div><h1>{data}</h1></div>
    </>)
}

export default NewFile;