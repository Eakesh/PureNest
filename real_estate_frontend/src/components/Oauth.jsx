import React from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { app } from "../firebase.config";
import fetcher from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  SignInStart,
  signInFailure,
  signInSuccess,
  signUpComplete,
  signUpFailure,
  signUpStart,
} from "../redux/user/userSlice";

export default function Oauth({ isSignin }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClickHandler = async () => {
    try {
      dispatch(signInFailure(""));
      dispatch(signUpFailure(""));
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      if (isSignin) {
        dispatch(SignInStart());
        const res = await fetcher(
          "/api/auth/googlesignin",
          "POST",
          { credentials: "include" },
          {
            email: result.user.email,
          }
        );
        const data = await res.json();
        if (res.status === 200) {
          dispatch(signInSuccess(data.user));
          navigate("/");
        } else if (res.status === 404) {
          dispatch(signInFailure(data.message));
        } else if (res.status === 500) {
          dispatch(signInFailure(data.message));
        }
      } else {
        dispatch(signUpStart());
        const res = await fetcher("/api/auth/googlesignup", "POST", null, {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        });
        const data = await res.json();
        console.log(data);
        if (res.status === 200) {
          dispatch(signUpComplete());
          navigate("/signin");
        } else if (res.status === 403) {
          dispatch(signUpFailure("User already exists"));
        } else if (res.status === 500) {
          dispatch(
            signUpFailure("Sorry error occured can you please try again")
          );
        }
      }
    } catch (e) {
      console.log(e, "google auth error");
    }
  };
  return (
    <button
      onClick={onClickHandler}
      type="button"
      className="flex items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-2  rounded-xl text-gray-700 font-semibold text-lg border-2 border-gray-100 "
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z"
          fill="#EA4335"
        />
        <path
          d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z"
          fill="#34A853"
        />
        <path
          d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z"
          fill="#4A90E2"
        />
        <path
          d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z"
          fill="#FBBC05"
        />
      </svg>
      Sign {isSignin ? "in" : "up"} with Google
    </button>
  );
}
