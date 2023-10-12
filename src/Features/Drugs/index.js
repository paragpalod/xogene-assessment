import React, { useState } from "react";
import AppShell from "../AppShell";
import { Link } from "react-router-dom";

const Drugs = () => {
  const [searchKey, setSearchKey] = useState("");
  const [drugs, setDrugs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchDrugs = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(
        `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${searchKey}`
      ).then((i) => i.json());
      if (res.drugGroup.conceptGroup) {
        setDrugs([searchKey]);
      } else {
        const suggestions = await fetch(
          `https://rxnav.nlm.nih.gov/REST/spellingsuggestions.json?name=${searchKey}`
        ).then((i) => i.json());

        if (suggestions.suggestionGroup.suggestionList?.suggestion?.length) {
          setDrugs(suggestions.suggestionGroup.suggestionList.suggestion);
        } else {
          setError("No results found for your search");
        }
      }
    } catch (e) {
      setError(e.message);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const onEnterPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchDrugs();
    }
  };
  return (
    <AppShell heading="SEARCH DRUGS">
      <h2>Search for drugs!</h2>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          onKeyDown={onEnterPress}
          style={{ height: "36px", width: "200px", padding: "0 10px" }}
          placeholder="Search Drugs by Name"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <button style={{ background: "#a5a1a1" }} onClick={searchDrugs}>
          <img
            style={{ height: "27px", paddingTop: "4px" }}
            src="/drugs/search.png"
            alt="Search Button"
          />
        </button>
      </div>
      {error ? (
        <h3>{error}</h3>
      ) : (
        <div>
          <h3>Search Result</h3>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              {drugs.map((i) => (
                <div className="drug-results" key={i}>
                  <Link to={`/drugs/${i}`}>{i}</Link>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </AppShell>
  );
};

export default Drugs;
