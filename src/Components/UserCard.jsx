import React from "react";

const UserCard = ({ user }) => {
  console.log(user);
  // const { firstName, lastName } = user;

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure className="m-3">
        <img src={user?.photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{user?.firstName + " " + user?.lastName}</h2>
        <p>{user?.about}</p>
        <div className="card-actions flex-col">
          <button className="btn btn-error w-full">Ignore</button>
          <button className="btn btn-success w-full">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
