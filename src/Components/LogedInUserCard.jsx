import React from "react";

const LogedInUserCard = ({ user }) => {
  const { firstName, lastName, age, gender, about, photoUrl } = user;
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img src={photoUrl} alt="LogedIn User Image" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName + " " + lastName}
          <div className="badge badge-secondary"></div>
        </h2>
        <p>{about}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">{age}</div>
          <div className="badge badge-outline">{gender}</div>
        </div>
      </div>
    </div>
  );
};

export default LogedInUserCard;
