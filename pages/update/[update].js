import Navbar from "../Components/Navbar";
import { useState,useEffect } from "react";
import { useRouter } from "next/router";

export const getServerSideProps = (context)=>{
    const id = context.query;
    const data = id.update;
    console.log(data);

    return{
        props:{
            data
        }
    }
}
const update = ({data}) => {
    const router = useRouter();
    const id  =data;
  const [Books, setBooks] = useState({
    name: "",
    sold: "",
  });

  useEffect(() => {
    isData();
  }, [id]);

  async function isData() {
    const response = await fetch(
      `https://apinextjs.herokuapp.com/getData/${id}`
    );
    const data = await response.json();
    setBooks(data);
  }

  function onTextField(e) {
    setBooks({
      ...Books,
      [e.target.name]: e.target.value,
    });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    fetch(`https://my-web-crud.herokuapp.com/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(Books),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((daa) => {
        console.log(daa);
        router.push("/list");
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

export default update;
