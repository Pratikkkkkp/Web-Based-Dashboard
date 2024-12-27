import React, { useState, useEffect } from "react";
import axios from "axios";
import OrganizationForm from "./OrganizationForm";
import TeamForm from "./TeamForm";
import MemberForm from "./MemberForm";
import HierarchicalView from "./HierarchicalView";

const Dashboard = () => {
  const [organizations, setOrganizations] = useState([]);
  const [teams, setTeams] = useState([]);
  const [individuals, setIndividuals] = useState([]);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    const response = await axios.get("http://localhost:5000/organizations");
    setOrganizations(response.data);
  };

  const fetchTeams = async (orgId) => {
    const response = await axios.get(
      `http://localhost:5000/organizations/${orgId}/teams`
    );
    setTeams(response.data);
  };

  const fetchIndividuals = async (teamId) => {
    const response = await axios.get(
      `http://localhost:5000/teams/${teamId}/members`
    );
    setIndividuals(response.data);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <OrganizationForm fetchOrganizations={fetchOrganizations} />
      <TeamForm organizations={organizations} fetchTeams={fetchTeams} />
      <MemberForm teams={teams} fetchIndividuals={fetchIndividuals} />
      <HierarchicalView
        organizations={organizations}
        teams={teams}
        individuals={individuals}
        fetchTeams={fetchTeams}
        fetchIndividuals={fetchIndividuals}
      />
    </div>
  );
};

export default Dashboard;
