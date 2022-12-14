import "./App.css";
import React, { useState, useEffect } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";

const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/women/95.jpg";

function App() {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [value, setValue] = useState("random person");
  const [title, setTitle] = useState("name");

  // Function to fetch users

  const getPerson = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const person = data.results[0];
    const { phone, email } = person;
    const { large: image } = person.picture; // to get nested properties out of the object
    const { password } = person.login;
    const { first, last } = person.name;
    const {
      dob: { age },
    } = person;
    const {
      street: { number, name },
    } = person.location;

    const newPerson = {
      image,
      phone,
      email,
      password,
      age,
      street: `${number} ${name}`,
      name: `${first} ${last}`,
    };

    setPerson(newPerson);
    setLoading(false);
    setTitle("name");
    setValue(newPerson.name);
  };

  useEffect(() => {
    getPerson()
  }, []);

  const handleValue = (e) => {
    if (e.target.classList.contains("icon")) {
      // check if the target that hover over have a class of icon
      const newValue = e.target.dataset.label;
      setTitle(newValue);
      setValue(person[newValue]); // dynamically access the property value by passing in the property
    }
  };


  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            src={
              (person && person.image) || defaultImage
            } /* if person is not known then look for person that image and if is not the case then display default image again */
            alt="Random user"
            className="user-img"
          />
          <p className="user-title">My {title} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button
              className="icon"
              data-label="name"
              onMouseOver={handleValue}
              onClick={(e) => {setTitle("name", setValue(person.name))}}
            >
              <FaUser />
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseOver={handleValue}
              onClick={(e) => {setTitle("email", setValue(person.email))}}
            >
              <FaEnvelopeOpen />
            </button>
            <button className="icon"
            data-label="age"
            onMouseOver={handleValue}
            onClick={(e) => {setTitle("age", setValue(person.age))}}
            >
              <FaCalendarTimes />
            </button>
            <button
              className="icon"
              data-label="street"
              onMouseOver={handleValue}
              onClick={(e) => {setTitle("street", setValue(person.street))}}
            >
              <FaMap />
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseOver={handleValue}
              onClick={(e) => {setTitle("phone", setValue(person.phone))}}
            >
              <FaPhone />
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseOver={handleValue}
              onClick={(e) => {setTitle("password", setValue(person.password))}}
            >
              <FaLock />
            </button>
          </div>
          <button className="btn" type="button" onClick={getPerson}>
            {loading ? "loading..." : "random user"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
