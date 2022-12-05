import React from "react";
import { useEffect, useState } from "react";
import styles from "../home.module.css";

import axios from "axios";

const baseURL = "http://127.0.0.1:8000/lab_finder_app/lab_finder";

export default function QuerySearch() {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    axios
      .get(baseURL)
      .then((response) => {
        setInfo(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    // eslint-disable-next-line
  }, []);

  JSON.stringify(info);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = info.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(info);
    }
  };

  return (
    <div className={styles.main}>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Pincode, Test or City"
            onChange={(e) => searchItems(e.target.value)}
          />

          <div className={styles.grid}>
            {searchInput.length > 1
              ? filteredResults.map((val) => {
                  return (
                    <div className={styles.card}>
                      <p>Lab Id: {val.lab_id}</p>
                      <p>Lab Code: {val.Lab_Code}</p>
                      <p>
                        Name and Contact Details:{" "}
                        {val.NAME_CONTACT_DETAILS_OF_THE_LABORATORY}
                      </p>
                      <p>Type: {val.Type}</p>
                      <p>Lab In Charge: {val.Lab_In_Charge}</p>
                      <p>Phone Number: {val.Phone_Number}</p>
                      <p>Email Id: {val.Email_Id}</p>
                      {/* <p>{val.MD_Pathologist}</p>
                      <p>{val.Certifilcations}</p> */}
                      <p>Pin Code: {val.Pincode}</p>
                      <p>City: {val.City}</p>
                      <p>Type of Tests: {val.Types_of_Tests}</p>
                    </div>
                  );
                })
              : info.map((val) => {
                  return (
                    <div className={styles.card}>
                      <p>Lab Id: {val.lab_id}</p>
                      <p>Lab Code: {val.Lab_Code}</p>
                      <p>
                        Name and Contact Details:{" "}
                        {val.NAME_CONTACT_DETAILS_OF_THE_LABORATORY}
                      </p>
                      <p>Type: {val.Type}</p>
                      <p>Lab In Charge: {val.Lab_In_Charge}</p>
                      <p>Phone Number: {val.Phone_Number}</p>
                      <p>Email Id: {val.Email_Id}</p>
                      {/* <p>{val.MD_Pathologist}</p>
                      <p>{val.Certifilcations}</p> */}
                      <p>Pin Code: {val.Pincode}</p>
                      <p>City: {val.City}</p>
                      <p>Type of Tests: {val.Types_of_Tests}</p>
                    </div>
                  );
                })}
          </div>
          <div></div>
        </div>
      )}
    </div>
  );
}
