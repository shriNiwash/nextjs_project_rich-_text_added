import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../Components/Navbar";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;

import "react-quill/dist/quill.snow.css";

export const getServerSideProps = (context) => {
  const id = context.query;
  const data = id.update;

  return {
    props: {
      data,
    },
  };
};

const Update = ({ data }) => {
  const Router = useRouter();
  console.log(data);
  // console.log("hello"+Docs.description);
  const [Description, setDescription] = useState("");

  const [Books, setBooks] = useState({
    name: "",
    sold: "",
  });

  const id = data;

  useEffect(() => {
    IsData();
  }, [id]);

  async function IsData() {
    const response = await fetch(
      `https://apinextjs.herokuapp.com/getData/${id}`
    );
    const data = await response.json();
    const { name, sold, description } = data;
    console.log("hello" + name);
    setBooks({ name, sold });
    setDescription(description);
    console.log(description);
  }
  // function setQuil(content) {
  //   console.log(content);
  //   setDescription({...Description,content});
  // }

  function onTextField(e) {
    setBooks({
      ...Books,
      [e.target.name]: e.target.value,
    });
  }
  // useEffect(()=>{
  //   setDocs(Books);
  // },[id])

  // function shri(){
  //   if(typeof window !== 'undefined' && ReactQuill)
  //   {
  //     return(
  //       <ReactQuill
  //       name="description"
  //       theme="snow"
  //       value={Description}
  //       onChange={data=>setDescription(data)}
  //     />

  //     )

  //   }
  //   else false;
  // }

  const onSubmit = (e) => {
    const { name, sold } = Books;
    console.log(name);
    e.preventDefault();
    console.log(id);
    fetch(`https://apinextjs.herokuapp.com/update/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name,
        sold,
        description: Description,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((daa) => {
        console.log(daa);
        Router.push("/list");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <form>
          <label>Name</label>
          <br />
          <input
            type="text"
            name="name"
            value={Books.name}
            onChange={(e) => onTextField(e)}
            id="name"
            placeholder="name"
          />
          <br />

          <label>Sold</label>
          <br />
          <input
            type="number"
            name="sold"
            value={Books.sold}
            onChange={(e) => onTextField(e)}
            id="name"
            placeholder="sold"
          />
          <br />
          <br />
          <div className="quilName">
          {if(typeof document !== 'undefined')
          {
         return( <ReactQuill
        name="description"
        theme="snow"
        value={Description}
        onChange={data=>setDescription(data)}
      />)
          }
          else return false;
          }
        
            {/* <ReactQuill
              name="description"
              theme="snow"
              value={Description}
              onChange={data=>setDescription(data)}
            /> */}
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />

          <input
            type="submit"
            name="submit"
            onClick={(e) => onSubmit(e)}
            value="submit"
          />
        </form>
      </div>
    </>
  );
};

export default Update;
