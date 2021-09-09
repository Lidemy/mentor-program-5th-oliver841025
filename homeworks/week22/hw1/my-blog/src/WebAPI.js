import { getAuthToken } from "./utils";

const BASE_URL = `https://student-json-api.lidemy.me`;

export const getPosts = async () => {
  const response = await fetch(`${BASE_URL}/posts?_sort=createdAt&_order=desc`);
  const data = await response.json();
  return data;
};

export const getFivePosts = async (page) => {
  const response = await fetch(
    `${BASE_URL}/posts?_sort=createdAt&_order=desc&_page=${page}&_limit=5`
  );
  const data = await response.json();
  return data;
};

export const getTotalPostsCounts = async () => {
  const response = await fetch(
    `${BASE_URL}/posts?_sort=createdAt&_order=desc&_page=1&_limit=5`
  );
  const data = response.headers.get("x-total-count");
  return data;
};

export const getPost = async (id) => {
  const response = await fetch(`${BASE_URL}/posts/${id}`);
  const data = await response.json();
  return data;
};

export const register = async (username, password, nickname) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nickname,
      username,
      password,
    }),
  });
  const data = await response.json();
  return data;
};

export const login = async (username, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const data = await response.json();
  return data;
};

export const getMe = async () => {
  const token = getAuthToken();
  const response = await fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const newPost = async (title, body) => {
  const token = getAuthToken();
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      body,
    }),
  });
  const data = await response.json();
  return data;
};
