import React, { useState, useRef, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.config";
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState({
    avatar: currentUser.avatar,
    username: currentUser.username.split("$#$").join(" "),
    email: currentUser.email,
    password: "",
  });
  const [isEditable, setIsEditable] = useState(false);
  const [file, setFile] = useState(undefined);
  const fileRef = useRef();
  const [filePer, setFilePer] = useState(0);
  const [fileError, setFileError] = useState(false);
  const InputClassname = "border-1 rounded-md px-4 py-2 w-full ";
  const ImageClassname =
    "max-w-xs overflow-hidden items-center rounded-full w-full h-full";
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const onchangeHandler = (event) => {
    setUser({
      ...user,
      [event.target.id]: event.target.value,
    });
  };
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log(progress + "uploading is done");
        setFilePer(Math.round(progress));
      },
      (error) => {
        setFileError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setUser({ ...user, avatar: downloadUrl });
        });
      }
    );
  };
  return (
    <div className="h-full flex justify-center items-center flex-col">
      <div className="flex text-4xl font-bold justify-center my-1 mt-5">
        Profile
      </div>
      <div className="md:w-3/4 p-8 bg-white lg:ml-4 shadow-lg ">
        <div className="w-full items-end flex justify-end my-1">
          <button
            aria-label="form edit button"
            className="right-0"
            onClick={() => {
              setIsEditable(true);
            }}
          >
            <FaEdit />
          </button>
        </div>
        <form className="flex justify-around flex-col md:flex-row items-center">
          <div className="flex flex-col justify-center items-center">
            <input
              disabled={!isEditable}
              ref={fileRef}
              onChange={(e) => {
                setFileError(false);
                setFile(e.target.files[0]);
              }}
              accept="image/*"
              type="file"
              hidden
            />
            <div className="mx-2 w-32 h-32 flex justify-center rounded-full my-3">
              <img
                onClick={() => {
                  fileRef.current.click();
                }}
                id="showImage"
                className={
                  isEditable
                    ? ImageClassname + " hover:grayscale-[60%]"
                    : ImageClassname
                }
                src={user.avatar}
                alt="User Profile"
              />
            </div>
            {isEditable &&
              (fileError ? (
                <div className="text-red-400">Error uploading Image</div>
              ) : filePer > 0 && filePer < 100 ? (
                <div className="text-green-400">Uploading {filePer}%</div>
              ) : (
                filePer === 100 && (
                  <div className="text-green-400">
                    Image uploaded successfully
                  </div>
                )
              ))}
          </div>
          <div className="rounded md:w-3/4 p-6">
            <div className="pb-6">
              <label
                for="name"
                className="font-semibold text-gray-700 block pb-1"
              >
                Name
              </label>
              <div className="flex">
                <input
                  id="username"
                  disabled={!isEditable}
                  className={
                    isEditable ? InputClassname + "bg-gray-300" : InputClassname
                  }
                  type="text"
                  onChange={onchangeHandler}
                  value={user.username}
                />
              </div>
            </div>
            <div className="pb-4">
              <label
                for="about"
                className="font-semibold text-gray-700 block pb-1"
              >
                Email
              </label>
              <input
                id="email"
                disabled={!isEditable}
                type="email"
                className={
                  isEditable ? InputClassname + "bg-gray-300" : InputClassname
                }
                onChange={onchangeHandler}
                value={user.email}
              />
            </div>
            <div className="pb-4">
              <label
                for="about"
                className="font-semibold text-gray-700 block pb-1"
              >
                Password
              </label>
              <input
                id="password"
                disabled={!isEditable}
                className={
                  isEditable ? InputClassname + "bg-gray-300" : InputClassname
                }
                type="text"
                onChange={onchangeHandler}
                value={user.password}
              />
            </div>
            <div className="pb-4 flex justify-between  flex-col md:flex-row">
              <button
                className="bg-green-300 p-2 rounded-lg w-full my-2  md:my-0 md:mx-2"
                type="submit"
                onClick={(event) => {
                  event.preventDefault();
                  setIsEditable(false);
                  setFileError("");
                  setFilePer(0);
                  console.log(user);
                }}
              >
                Update Account
              </button>
              <button
                className="bg-red-300 p-2 rounded-lg  w-full my-2 md:my-0 md:mx-2"
                type="button"
              >
                Logout
              </button>
              <button
                className="bg-red-300 p-2 rounded-lg w-full my-2 md:my-0 md:mx-2"
                type="button"
              >
                Delete Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
