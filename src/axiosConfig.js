import axios from "axios";

const baseURL =
  "https://0uumsbtgfd.execute-api.eu-central-1.amazonaws.com/Development/v0";

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json"
  }
});

export const refreshToken = () => {
  const refToken = localStorage.getItem("refresh_token");

  return instance({
    url: "/auth/refresh",
    method: "POST",
    data: {
      refresh_token: refToken
    }
  });
};

export const signIn = ({ email, password }) =>
  instance({
    url: "/auth/signin",
    method: "POST",
    data: {
      email,
      password
    }
  });

export const signUp = ({ email, password, fullName }) =>
  instance({
    url: "/auth/signup",
    method: "POST",
    data: {
      email,
      password,
      fullName
    }
  });

export const getCommunityMember = id =>
  instance({
    url: `/community/${id}`,
    method: "GET"
  });

export const getCommunity = () =>
  instance({
    url: "/community",
    method: "GET"
  });

export const getDocuments = () =>
  instance({
    url: "/documents",
    method: "GET"
  });

export const getKeywords = () =>
  instance({
    url: "/keywords",
    method: "GET"
  });

export const search = searchQuery =>
  instance({
    url: "/search",
    method: "GET",
    params: {
      request: searchQuery
    }
  });

export const getStats = day =>
  instance({
    url: "/stats",
    method: "GET",
    params: {
      period: day
    }
  });

export const deleteUserObject = id =>
  instance({
    url: `/users/object/${id}`,
    method: "DELETE"
  });

export const getUserObject = id =>
  instance({
    url: `/users/object/${id}`,
    method: "GET"
  });

export const updateUser = (id, { fullName, email }) =>
  instance({
    url: `/users/object/${id}/update`,
    method: "POST",
    data: {
      fullName,
      email
    }
  });

const instanceInterseptorsResponse = instance.interceptors.response.use(
  response => response.data,
  error => {
    const refToken = localStorage.getItem("refresh_token");
    const { response = {} } = error;
    console.log('error', error.response)
    

    return Promise.reject(error);
  }
);

instance.interceptors.request.use(
  config => {
    // const token = localStorage.getItem("access_token");
    const token = null
    if (token) {
      return {
        ...config,
        headers: { ...config.headers, Authorization: `Bearer ${token}` }
      };
    }

    return config;
  },
  error => Promise.reject(error)
);
