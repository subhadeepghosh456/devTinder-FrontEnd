import axios from "axios";
import React from "react";
import { BASE_URL } from "../const";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  console.log(user);
  const dispatch = useDispatch();
  // const { firstName, lastName } = user;
  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {}
  };
  return (
    user && (
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure className="m-3">
          <img src={user?.photoUrl} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {user?.firstName + " " + user?.lastName}
          </h2>
          <p>{user?.about}</p>
          <div className="card-actions flex-col">
            <button
              className="btn btn-error w-full"
              onClick={() => handleSendRequest("ignored", user._id)} //interested
            >
              Ignore
            </button>
            <button
              className="btn btn-success w-full"
              onClick={() => handleSendRequest("interested", user._id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default UserCard;
