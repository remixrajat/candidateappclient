import axios from "axios";
import { useState, useEffect, useRef } from "react";
import "./App.css";
import CandidateTable from "./Components/CandidateTable";
import AddCandidate from "./Components/AddCandidate";
import Navbar from "./Components/Navbar";
import { Route } from "react-router-dom";
import useIntersection from "./Components/IntersectionObserver";

function App() {
  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  // const ref = useRef();

  // let inViewPort = useIntersection(ref, "-200px");
  // if (inViewPort) {
  //   console.log(inViewPort);
  // }

  return (
    <div>
      <Navbar />
      <main>
        <Route path="/" exact>
          <CandidateTable />
        </Route>
        <Route path="/candidates">
          <AddCandidate />
        </Route>
      </main>
    </div>
  );
}

export default App;
