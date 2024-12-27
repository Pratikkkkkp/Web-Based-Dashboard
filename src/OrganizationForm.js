import React, { useState } from "react";
import axios from "axios";

const OrganizationForm = ({ fetchOrganizations }) => {
  const [newOrg, setNewOrg] = useState({ name: "", email: "", location: "" });

  const handleOrgSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/organizations", newOrg);
    fetchOrganizations();
    setNewOrg({ name: "", email: "", location: "" });
  };

  return (
    <form onSubmit={handleOrgSubmit}>
      <h2>Register Organization</h2>
      <input
        type="text"
        placeholder="Name"
        value={newOrg.name}
        onChange={(e) => setNewOrg({ ...newOrg, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newOrg.email}
        onChange={(e) => setNewOrg({ ...newOrg, email: e.target.value })}
      />
      <input
        type="text"
        placeholder="Location"
        value={newOrg.location}
        onChange={(e) => setNewOrg({ ...newOrg, location: e.target.value })}
      />
      <button type="submit">Add Organization</button>
    </form>
  );
};

export default OrganizationForm;
