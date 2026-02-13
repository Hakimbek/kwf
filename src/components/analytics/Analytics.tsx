import type {
  IPlan,
  IFact,
  ICompany,
  IPlanVersion,
  IFactItem,
  IManager,
} from "../../type/type.ts";
import { useState, useEffect, useMemo } from "react";
import {
  FACT_COLLECTION,
  PLAN_COLLECTION,
  COMPANY_COLLECTION,
  MANAGERS_COLLECTION,
  subscribeToCollection,
} from "../../firebase/services.ts";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter.ts";
import { FormGroup, Input, Label } from "reactstrap";
import { RegionSales } from "../chart/region/RegionSales.tsx";
import { RegionClients } from "../chart/region/RegionClients.tsx";
import { RegionMargin } from "../chart/region/RegionMargin.tsx";
import styles from "./Analytics.module.css";

export const Analytics = () => {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [facts, setFacts] = useState<IFact[]>([]);
  const [plans, setPlans] = useState<IPlan[]>([]);
  const [managers, setManagers] = useState<IManager[]>([]);

  const [planItems, setPlanItems] = useState<IPlanVersion[]>([]);
  const [factItems, setFactItems] = useState<IFactItem[]>([]);

  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [selectedFactId, setSelectedFactId] = useState("");
  const [selectedManagerId, setSelectedManagerId] = useState("");
  const [filter, setFilter] = useState<"region" | "product" | "client">(
    "region",
  );

  useEffect(() => {
    const unsubCompanies = subscribeToCollection(
      COMPANY_COLLECTION,
      setCompanies,
    );
    const unsubFacts = subscribeToCollection(FACT_COLLECTION, setFacts);
    const unsubPlans = subscribeToCollection(PLAN_COLLECTION, setPlans);
    const unsubManagers = subscribeToCollection(
      MANAGERS_COLLECTION,
      setManagers,
    );

    return () => {
      unsubCompanies();
      unsubFacts();
      unsubPlans();
      unsubManagers();
    };
  }, []);

  useEffect(() => {
    if (!selectedPlanId) return;

    const unsubscribe = subscribeToCollection(
      `${PLAN_COLLECTION}/${selectedPlanId}/items`,
      setPlanItems,
    );

    return () => unsubscribe();
  }, [selectedPlanId]);

  useEffect(() => {
    if (!selectedFactId) return;

    const unsubscribe = subscribeToCollection(
      `${FACT_COLLECTION}/${selectedFactId}/items`,
      setFactItems,
    );

    return () => unsubscribe();
  }, [selectedFactId]);

  const filteredData = useMemo(() => {
    if (selectedManagerId === "All") {
      return { facts: factItems, plans: planItems };
    }

    return {
      facts: factItems.filter((f) => f.managerId === selectedManagerId),
      plans: planItems.filter((p) => p.managerId === selectedManagerId),
    };
  }, [selectedManagerId, planItems, factItems]);

  return (
    <div className={styles.wrapper}>
      <div className="d-flex align-items-center justify-content-between">
        <h2 className={styles.title}>Analytics</h2>
        <div className="d-flex gap-3">
          <FormGroup>
            <Label for="company">Company</Label>
            <Input
              id="company"
              type="select"
              value={selectedCompanyId}
              className={`${selectedCompanyId === "" && "text-secondary"}`}
              onChange={(e) => setSelectedCompanyId(e.target.value)}
            >
              <option value="" hidden>
                Select company...
              </option>
              {companies.map(({ id, name }) => (
                <option key={id} value={id} className="text-black">
                  {name}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="fact">Fact</Label>
            <Input
              id="fact"
              type="select"
              value={selectedFactId}
              className={`${selectedFactId === "" && "text-secondary"}`}
              onChange={(e) => setSelectedFactId(e.target.value)}
            >
              <option value="" hidden>
                Select fact...
              </option>
              {facts
                .filter(({ companyId }) => companyId === selectedCompanyId)
                .map(({ id, year, month }) => (
                  <option key={id} value={id} className="text-black">
                    {year} {capitalizeFirstLetter(month)}
                  </option>
                ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="plan">Plan</Label>
            <Input
              id="plan"
              type="select"
              value={selectedPlanId}
              className={`${selectedPlanId === "" && "text-secondary"}`}
              onChange={(e) => setSelectedPlanId(e.target.value)}
            >
              <option value="" hidden>
                Select plan...
              </option>
              {plans
                .filter(({ companyId }) => companyId === selectedCompanyId)
                .map(({ id, name }) => (
                  <option key={id} value={id} className="text-black">
                    {capitalizeFirstLetter(name)}
                  </option>
                ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="manager">Manager</Label>
            <Input
              id="manager"
              type="select"
              value={selectedManagerId}
              className={`${selectedManagerId === "" && "text-secondary"}`}
              onChange={(e) => setSelectedManagerId(e.target.value)}
            >
              <option value="" hidden>
                Select manager...
              </option>
              <option value="All" className="text-black">
                All
              </option>
              {managers
                .filter(({ companyId }) => companyId === selectedCompanyId)
                .map(({ id, name }) => (
                  <option key={id} value={id} className="text-black">
                    {capitalizeFirstLetter(name)}
                  </option>
                ))}
            </Input>
          </FormGroup>
        </div>
      </div>
      <div className="d-flex gap-2">
        <button
          className={`${styles.filterButton} ${filter === "region" && styles.filterButton_active}`}
          onClick={() => setFilter("region")}
        >
          Region
        </button>
        <button
          className={`${styles.filterButton} ${filter === "product" && styles.filterButton_active}`}
          onClick={() => setFilter("product")}
        >
          Product
        </button>
        <button
          className={`${styles.filterButton} ${filter === "client" && styles.filterButton_active}`}
          onClick={() => setFilter("client")}
        >
          Client
        </button>
      </div>
      {filter === "region" && (
        <div className="d-flex flex-column gap-5">
          <RegionSales plan={filteredData.plans} fact={filteredData.facts} />
          <RegionClients fact={filteredData.facts} />
          <RegionMargin fact={filteredData.facts} />
        </div>
      )}
    </div>
  );
};
