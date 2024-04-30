import axios, { AxiosRequestConfig } from 'axios';
import type { UserMe, BaseUser } from 'y-types/users'
import mockup from '../../mockup.json';
import mockuppost from '../../mockuppost.json';

/**
 * Endpoint URLs
 */
const ENDPOINTS = {
  authentification: 'https://y-authentification-service-2fqcvdzp6q-ew.a.run.app',
  users: 'https://y-users-service-2fqcvdzp6q-uc.a.run.app'
}

async function fakeAxios(key: string, predicate: any) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve((mockup as Record<string, any[]>)[key].find(predicate));
    }, 2000);
  });
}
async function fakeAxiosPost(key: string, predicate: any) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve((mockuppost as Record<string, any[]>)[key].filter(predicate));
    }, 2000);
  });
}

/**
 * Each request will return a response with the following shape
 */
interface Response<T> {
  error: null | {
    message: string;
    name?: string;
    extra: Record<string, unknown>;
  };
  result: T;
}

/**
 * Make unauthenticated request to the APIs.
 * @template T, D
 * @param {AxiosRequestConfig<D>} config - The request configuration.
 * @returns {Promise<AxiosResponse<Response<T>, any>>}
 */
export async function makeRequest<T, D>(config: AxiosRequestConfig<D>) {
  return axios.request<Response<T>>(config);
}

/**
 * Make authenticated request to the APIs.
 * Need to have a token in the local storage.
 * @template T, D
 * @param {AxiosRequestConfig<D>} config - The request configuration.
 * @returns {Promise<AxiosResponse<Response<T>, any>>}
 */
export async function makeAuthentifiedRequest<T, D>(
  config: AxiosRequestConfig<D>,
) {
  const localToken = window.localStorage.getItem('token');

  return axios.request<Response<T>>({
    ...config,
    headers: {
      Authorization: `Bearer ${localToken}`,
      ...config?.headers ?? {},
    }
  });
}

/**
 * Request to login, return a token if the credentials are correct.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<AxiosResponse<Response<{token: string}>, any>>}
 */
export async function login(email: string, password: string) {
  return makeRequest<{
    token: string;
  }, {
    email: string;
    password: string;
  }>({
    method: 'POST',
    url: `${ENDPOINTS.authentification}/login`,
    data: {
      email,
      password
    }
  })
}

/**
 * Request to /me for getting the current user.
 * Based on token stored in the local storage.
 * @returns {Promise<AxiosResponse<Response<UserMe>, any>>}
 */
export async function getMe() {
  return makeAuthentifiedRequest<UserMe, Record<string, never>>({
    method: 'GET',
    url: `${ENDPOINTS.users}/me`,
  })
}

/**
 * Request to /users/{userId} for getting a user by its id.
 * @param {String} userId - The id of the user.
 * @returns {Promise<AxiosResponse<Response<BaseUser>, any>>}
 */
export async function getUser(userId: string) {
  return makeAuthentifiedRequest<BaseUser, Record<string, never>>({
    method: 'GET',
    url: `${ENDPOINTS.users}/${userId}`,
  })
}

export async function SignInFn(email: string, password: string, name: string) {

  return await fakeAxios('users', (user) => user.email === email && user.password === password && user.name === name);
}

export async function checkUserExists(value: string, type: string) {
  // axios.get(`/users?${type}=${value}`)
  return await fakeAxios('users', (user) => user[type] === value);
}

export async function getPosts() {
  // axios.get('/posts')
  return await fakeAxiosPost('post', () => true) || [];
}
export async function getFollowingPosts() {
  // axios.get('/posts/following')
  return await fakeAxiosPost('post', () => true) || [];
}
export async function getCustomFeedPosts(userIds: string[]) {
  // axios.get(`/posts?userIds=${userIds.join(',')}`)
  return await fakeAxiosPost('post', (post) => userIds.includes(post.userId)) || [];
}

export async function getPost(id: string ) {
  // axios.get(`/posts/${id}`)
  return await fakeAxiosPost('post', (post) => post.id === id);
}