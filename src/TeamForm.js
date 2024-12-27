import React, { useState } from "react";
import axios from "axios";

const TeamForm = ({ organizations, fetchTeams }) => {
  const [newTeam, setNewTeam] = useState({ orgId: "", name: "" });

  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/teams", newTeam);
    fetchTeams(newTeam.orgId);
    setNewTeam({ orgId: "", name: "" });
  };

  return (
    <form onSubmit={handleTeamSubmit}>
      <h2>Add Team</h2>
      <select
        value={newTeam.orgId}
        onChange={(e) => setNewTeam({ ...newTeam, orgId: e.target.value })}
      >
        <option value="">Select Organization</option>
        {organizations.map((org) => (
          <option key={org.id} value={org.id}>
            {org.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Team Name"
        value={newTeam.name}
        onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
      />
      <button type="submit">Add Team</button>
    </form>
  );
};

export default TeamForm;
