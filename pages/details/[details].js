import Navbar from "../Components/Navbar";
import Head from "next/head";
import Image from "next/image";


export const getServerSideProps = async (context) => {
  const id = context.query;
  const ids = id.details;

  const res = await fetch(`https://apinextjs.herokuapp.com/getData/${ids}`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

const Details = ({ data }) => {
  const { description } = data;
  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <div className="mainCard">
        <div className="card" id="cards">
          <Image src="/books.jpg" width="200" height="400"></Image>
          <div className="card-body">
            <h5 className="card-title">{data.name}</h5>
            {
              <div>
                <div dangerouslySetInnerHTML={{ __html: data.description }} />
              </div>
            }
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
