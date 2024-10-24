import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../const";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      // console.log(res);

      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };
  console.log(requests);
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) return <h2>No Request found</h2>;

  return (
    <div className="text-center my-10 w-1/2 mx-auto">
      <h2 className="text-bold text-2xl">Requests</h2>
      {requests.map((request) => {
        const {
          about,
          _id,
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          skills,
        } = request.fromUserId;
        return (
          <div
            className="flex m-4 p-4 justify-between rounded-lg bg-base-300"
            key={_id}
          >
            <div>
              <img
                className="w-20 h-20 rounded-full"
                src={photoUrl}
                alt="photo"
              />
            </div>
            <div className="text-left mx-4">
              <h2>{firstName + " " + lastName}</h2>
              {age && gender && <p>{age + "," + gender}</p>}
              <p>{about}</p>
            </div>
            <div className="flex flex-col">
              <button
                className="btn btn-secondary w-20 my-2"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-accent w-20 my-2"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
