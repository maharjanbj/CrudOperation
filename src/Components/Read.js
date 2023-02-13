import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Read = () => {

  const [data, setData] = useState([]);
  const [tabledark, setTableDark] = useState('');

  // Search engin filtration process

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((eachData) => {
    return (
      eachData.name.toLowerCase().includes(searchTerm.toLowerCase()) 
      // || eachData.id.toLowerCase().includes(searchTerm.toLowerCase())
      // || eachData.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  function getData() {
    axios
      .get("https://63e77e63ac3920ad5bdeccc1.mockapi.io/crud")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  }

  //edit

  const setToLocalStorage = (id, name, email) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
  }

  //For Delete

  function handleDelete(id) {
    axios.delete(
      `https://63e77e63ac3920ad5bdeccc1.mockapi.io/crud/${id}`
      )
      .then(() => {
        getData();
      })
  }

  //when you add new data/update this operation automatically run
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
    <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox"
   onClick={() => {
    if(tabledark === "table-dark") {
      setTableDark("");
    }
    else { 
      setTableDark("table-dark");
    }
  }}/>
</div>
    <div className="d-flex justify-content-between m-2">
    <h2>Read Operation</h2>
      <Link to='/'>
      <button className="btn btn-secondary">Create</button>
      </Link>
      </div>

      <table className={`table ${tabledark}`}>
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        {filteredData.map((eachData) => {
          return (
            <>
              <tbody>
                <tr>
                  <th scope="row">{eachData.id}</th>
                  <td>{eachData.name}</td>
                  <td>{eachData.email}</td>
                  <td>
                    <Link to="/update">
                    <button className="btn-success"
                    onClick={() => 
                      setToLocalStorage(
                        eachData.id,
                        eachData.name,
                        eachData.email
                      )}
                      >
                        Edit{""}
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button className="btn-danger" onClick={() => handleDelete(eachData.id)}>Delete</button>
                  </td>
                </tr>
              </tbody>
            </>
          );
        })}
      </table>
    </>
  );
};
export default Read;