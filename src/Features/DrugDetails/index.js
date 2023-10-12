import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppShell from "../AppShell";

const DrugDetails = () => {
  const { drugName } = useParams();
  const [drug, setDrug] = useState(null);
  const [ndc, setNdc] = useState([]);

  useEffect(() => {
    fetch(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${drugName}`)
      .then((i) => i.json())
      .then((res) => {
        let drugData = null;
        res.drugGroup.conceptGroup?.forEach((i) => {
          if (!drugData && i.conceptProperties?.[0]?.rxcui) {
            drugData = i.conceptProperties[0];
          }
        });
        if(drugData) {
          setDrug(drugData);
          fetch(`https://rxnav.nlm.nih.gov/REST/rxcui/${drugData.rxcui}/ndcs.json`).then(i => i.json()).then(ndcRes => {
            if(ndcRes.ndcGroup?.ndcList?.ndc?.length) {
              setNdc(ndcRes.ndcGroup.ndcList.ndc);
            }
          })
        }
      });
  }, [drugName]);

  return (
    <AppShell heading="DRUG DETAILS">
      <h2>Name of drug</h2>
      {drug && (
        <div className="drug-details">
          <div><strong>Id:</strong> {drug.rxcui}</div>
          <div><strong>Name:</strong> {drug.name}</div>
          <div><strong>Synonym:</strong> {drug.synonym}</div>
        </div>
      )}
      <h2>Associated NDCs</h2>
      <div className="drug-details">
        {ndc.map((i, index) => (
          <div><strong>NDC {index +1}:</strong> {i}</div>
        ))}
      </div>
    </AppShell>
  );
};

export default DrugDetails;
