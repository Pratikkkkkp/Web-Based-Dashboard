import React, { useState } from "react";
import axios from "axios";

const MemberForm = ({ teams, fetchIndividuals }) => {
  const [newMember, setNewMember] = useState({
    teamId: "",
    name: "",
    uniqueId: "",
  });
  const [imageUpload, setImageUpload] = useState(null);

  const handleMemberSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newMember.name);
    formData.append("uniqueId", newMember.uniqueId);
    formData.append("teamId", newMember.teamId);
    formData.append("image", imageUpload);
    await axios.post("http://localhost:5000/members", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    fetchIndividuals(newMember.teamId);
    setNewMember({ teamId: "", name: "", uniqueId: "" });
    setImageUpload(null);
  };

  return (
    <form onSubmit={handleMemberSubmit}>
      <h2>Add Member</h2>
      <select
        value={newMember.teamId}
        onChange={(e) => setNewMember({ ...newMember, teamId: e.target.value })}
      >
        <option value="">Select Team</option>
        {teams.map((team) => (
          <option key={team.id} value={team.id}>
            {team.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Member Name"
        value={newMember.name}
        onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Unique ID"
        value={newMember.uniqueId}
        onChange={(e) =>
          setNewMember({ ...newMember, uniqueId: e.target.value })
        }
      />
      <input type="file" onChange={(e) => setImageUpload(e.target.files[0])} />
      <button type="submit">Add Member</button>
    </form>
  );
};

export default MemberForm;
