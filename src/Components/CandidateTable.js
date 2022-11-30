import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import AddCandidate from "./AddCandidate";

const CandidateTable = () => {
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);

  const observer = useRef();
  const lastElementRef = useCallback((node) => {
    // console.log(node);
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log("Visible");
        setSkip((skip) => skip + 4);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  const getFilteredData = (gotdata) => {
    if (gotdata.length > 0) setData(gotdata);
    else alert("No data found");
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/candidates?skip=${skip}&limit=${4}`
        );
        if (response.data.length > 0) {
          setData(response.data);
        } else {
          //   alert("No data found");
        }
        // setSkip((skip) => skip + 2);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchdata();
  }, [skip]);

  return (
    <>
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
            ref={index === data.length - 1 ? lastElementRef : null}
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
