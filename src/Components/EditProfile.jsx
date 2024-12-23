import React, { useState } from "react";
import LogedInUserCard from "./LogedInUserCard";
import axios from "axios";
import { BASE_URL } from "../const";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import Toast from "./Toast";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      setShow(true);
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender: gender.toLowerCase(),
          about,
          photoUrl,
        },
        { withCredentials: true }
      );
      // console.log(res?.data?.message);
      setMessage(res?.data?.message);

      setTimeout(() => {
        setShow(false);
      }, 3000);

      dispatch(addUser(res?.data?.data));
    } catch (error) {}
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First name : </span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last name : </span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Age : </span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Gender : </span>
                  </div>
                  <input
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">About : </span>
                  </div>
                  <input
                    type="text"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Photo : </span>
                  </div>
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
              </div>

              <div className="card-actions justify-center">
                <button
                  className="btn btn-primary w-full"
                  onClick={saveProfile}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <LogedInUserCard
          user={{ firstName, lastName, age, gender, about, photoUrl }}
        />
      </div>
      {show && <Toast text={message} />}
    </>
  );
};

export default EditProfile;
