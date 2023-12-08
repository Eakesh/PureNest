const API_Domain = "http://localhost:3000";

export const emailRegex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
export const passwordRegex =
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{4,}$";

export const fetcher = async (url, methodtype, options, reqparams) => {
  console.log(url);
  if (methodtype === "GET") {
    const res = await fetch(API_Domain + url, {
      ...options,
    });

    return new Promise((resolve, reject) => {
      return resolve(res);
    });
  } else {
    const res = await fetch(API_Domain + url, {
      method: methodtype,
      headers: {
        "Content-type": "application/json",
      },
      ...options,
      body: JSON.stringify(reqparams),
    });
    return res;
  }
};

export default fetcher;
