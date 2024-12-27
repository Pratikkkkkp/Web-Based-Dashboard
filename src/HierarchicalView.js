import React from "react";

const HierarchicalView = ({
  organizations,
  teams,
  individuals,
  fetchTeams,
  fetchIndividuals,
}) => {
  return (
    <div>
      <h2>Organizations</h2>
      {organizations.map((org) => (
        <div key={org.id}>
          <h3 onClick={() => fetchTeams(org.id)}>{org.name}</h3>
          {teams.map(
            (team) =>
              team.organization_id === org.id && (
                <div key={team.id}>
                  <h4 onClick={() => fetchIndividuals(team.id)}>{team.name}</h4>
                  <ul>
                    {individuals.map(
                      (ind) =>
                        ind.team_id === team.id && (
                          <li key={ind.id}>
                            {ind.name} (
                            {ind.image_url ? (
                              <span style={{ color: "green" }}>
                                Image Uploaded
                              </span>
                            ) : (
                              <span style={{ color: "red" }}>
                                Image Not Uploaded
                              </span>
                            )}
                            )
                          </li>
                        )
                    )}
                  </ul>
                </div>
              )
          )}
        </div>
      ))}
    </div>
  );
};

export default HierarchicalView;
