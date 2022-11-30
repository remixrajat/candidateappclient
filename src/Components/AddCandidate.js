import axios from "axios";
import { useState, useEffect } from "react";

const AddCandidate = (props) => {
  const term = props ? props.filterTerm : "Add USer";

  const [buttonName, setButtonName] = useState(term);
  useEffect(() => {
    setButtonName(term);
  }, [props?.filterTerm]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastname: "",
    email: "",
    gender: "",
    skills: [],
    locations: [],
  });

  const [skillsData, setSkillsdata] = useState([
    "skill1",
    "skill2",
    "skill3",
    "skill4",
    "skill5",
    "skill6",
    "skill7",
    "skill8",
    "skill9",
    "skill10",
  ]);

  const [locationsData, setLocatiopnsdata] = useState([
    "city1",
    "city2",
    "city3",
    "city4",
    "city5",
    "city6",
    "city7",
    "city8",
    "city9",
    "city10",
  ]);
  const [showSkillData, setShowSkillData] = useState(false);
  const [showLocationData, setShowLocationData] = useState(false);

  const handleFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillDataChange = (e, d) => {
    if (!formData.skills.filter((m) => m == d)[0]) {
      // console.log(e.target.name, d);
      setFormData({ ...formData, ["skills"]: [...formData.skills, d] });
    }
  };

  const handleLocationDataChange = (e, d) => {
    if (!formData.locations.filter((m) => m == d)[0]) {
      // console.log(e.target.name, d);
      setFormData({ ...formData, ["locations"]: [...formData.locations, d] });
    }
  };

  const handleFormSubmit = async (e) => {
    // console.log(e.target.value);
    e.preventDefault();
    console.log(formData);
    if (term === "filter User") {
      const response = await axios.put(
        "http://localhost:8000/candidates",
        formData
      );
      props.getFilteredData(response.data);
      console.log(response);
    } else {
      const response = await axios.post(
        "http://localhost:8000/candidates",
        formData
      );
      console.log(response);
    }
  };
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input
          onChange={handleFormDataChange}
          type="text"
          name="firstName"
          value={formData.firstName}
          placeholder="First name"
        />
        <input
          name="lastname"
          onChange={handleFormDataChange}
          type="text"
          placeholder="Last name"
        />
        <input
          onChange={handleFormDataChange}
          name="email"
          type="text"
          placeholder="Email"
        />
        <input
          onChange={handleFormDataChange}
          name="gender"
          type="text"
          placeholder="Gender"
        />

        <button>{buttonName}</button>
      </form>
      <button
        onClick={() => {
          // console.log("vhvjagdjk");
          setShowSkillData(!showSkillData);
        }}
      >
        Select skills
      </button>

      {showSkillData &&
        skillsData.map((d, index) => {
          return (
            <div
              name="skills"
              key={index}
              onClick={(e) => {
                console.log(d);
                handleSkillDataChange(e, d);
              }}
            >
              {d}
            </div>
          );
        })}
      <button
        onClick={() => {
          // console.log("vhvjagdjk");
          setShowLocationData(!showLocationData);
        }}
      >
        Select locations
      </button>
      {showLocationData &&
        locationsData.map((d, index) => {
          return (
            <div
              name="skills"
              key={index}
              onClick={(e) => {
                handleLocationDataChange(e, d);
              }}
            >
              {d}
            </div>
          );
        })}
    </>
  );
};

export default AddCandidate;
