import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../const";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  console.log(connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      //console.log(res?.data?.data);
      dispatch(addConnections(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) return;
  if (connections.length === 0)
    return <h1 className="text-bold text-2xl">No connections found</h1>;
  return (
    <div className="text-center my-10 w-1/2 mx-auto">
      <h2 className="text-bold text-2xl">Connections</h2>
      {connections.map((connection) => {
        return (
          <div className="flex m-4 p-4 rounded-lg bg-base-300">
            <div>
              <img
                className="w-20 h-20 rounded-full"
                src={connection?.photoUrl}
                alt="photo"
              />
            </div>
            <div className="text-left mx-4">
              <h2>{connection?.firstName + " " + connection?.lastName}</h2>
              {connection.age && connection.gender && (
                <p>{connection.age + "," + connection.gender}</p>
              )}
              <p>{connection?.about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
