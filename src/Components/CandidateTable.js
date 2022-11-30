import { useState, useEffect, useRef } from "react";
import axios from "axios";
import AddCandidate from "./AddCandidate";

const CandidateTable = () => {
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);

  const ref = useRef();

  const getFilteredData = (gotdata) => {
    setData(gotdata);
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/candidates?skip=${skip}&limit=${2}`
        );
        //   console.log(response);
        setData(response.data);
        setSkip((skip) => skip + 2);
        // useIntersection(<></>,fsfsf)
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchdata();
  }, []);

  return (
    <>
      {/* <div>
        <input placeholder="filter" />
        <button onClick={console.log("data")}>search</button>
      </div> */}
      <h1>Filter Data</h1>
      <AddCandidate
        filterTerm="filter User"
        getFilteredData={getFilteredData}
      />
      {data.map((d, index) => {
        return (
          <div
            key={d._id}
            style={{ border: "1px solid black", margin: "20px" }}
            // ref={index === data.length - 1 ? ref : null}
            ref={ref}
          >
            <h2>{d.firstName}</h2>
            <h3>{d.lastName}</h3>
            <h3>{d.email}</h3>
            <h3>{d.gender}</h3>
            {d.skills.map((r, index) => {
              return <h3 key={index}>{r}</h3>;
            })}
            {d.locations.map((r, index) => {
              return <h3 key={index}>{r}</h3>;
            })}
          </div>
        );
      })}
    </>
  );
};

export default CandidateTable;
