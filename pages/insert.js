import { useState } from "react";
import Navbar from "./Components/Navbar";
import { useRouter } from "next/router";
import Quill from "./Components/quill";

const Insert = () => {
  const router = useRouter();
  const [data, setData] = useState("");
  const [Book, setBook] = useState({
    name: "",
    sold: "",
    description:""
  });

  Book.description = data;
  function onTextField(e) {
    setBook({
      ...Book,
      [e.target.name]: e.target.value,
      description:data
    });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    fetch("https://apinextjs.herokuapp.com/insert", {
      method: "POST",
      body: JSON.stringify(Book),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((daa) => {
        console.log(daa);
        router.push("/list");
      });
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
            onChange={(e) => onTextField(e)}
            id="name"
            placeholder="sold"
          />
          <br />
          <div className="quils">
            <Quill setData={setData} />
          </div>
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

export default Insert;
