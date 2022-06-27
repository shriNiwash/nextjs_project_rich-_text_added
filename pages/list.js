import Link from "next/link";
import Navbar from "./Components/Navbar";
import Router, { useRouter } from "next/router";

export const getStaticProps = async () => {
  const res = await fetch("https://apinextjs.herokuapp.com/data");
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

const List = ({ data }) => {
    const router = useRouter();
    function alertData(id){
        return alert("Are Your Sure Want to Delete" +id);
      
      }
    
    function handleDelete(id) {
      alertData(id);
        fetch(`https://apinextjs.herokuapp.com/delete/${id}`, {
          method: "DELETE",
        })
        .then((response)=>response.json())
        .then((daa)=>{
          console.log(daa);
          router.push("/list");
        })
        .catch((err)=>console.log(err));
    
      }
  return (
    <>
      <Navbar />
      <table className="tableData" border="2px">
        <thead className="theadData">
          <tr className="trowData">
            <th className="th">Id</th>
            <th className="th">Name</th>
            <th className="th">Sold</th>
            <th className="th">description</th>
            <th className="th">Operation</th>
          </tr>
        </thead>
        <tbody>
          {data.map((list) => {
            return (
              <tr key={list._id}>
                <td className="td">{list._id}</td>
                <td className="td">{list.name}</td>
                <td className="td">{list.sold}</td>
                <td className="td">{list.description}</td>
                <td className="td">
                  <Link href={`/update/${list._id}`}>
                    <a>Update</a>
                  </Link>
                  <button onClick={() => handleDelete(list._id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default List;
