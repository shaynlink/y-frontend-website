import axios, { AxiosRequestConfig } from 'axios';
import type { UserMe, BaseUser } from 'y-types/users'

/**
 * Endpoint URLs
 */
const ENDPOINTS = {
  authentification: 'https://y-authentification-service-2fqcvdzp6q-ew.a.run.app',
  users:            'http://localhost:3000' ?? 'https://y-users-service-2fqcvdzp6q-uc.a.run.app',
  posts:            'https://y-posts-service-2fqcvdzp6q-ew.a.run.app'
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
  return axios
    .request<Response<T>>(config)
    .catch(async (error): Promise<any> => {
      if (error.response.status === 429) {
        console.log('Too many requests');
        await new Promise((res) => setTimeout(res, 8000));
        return makeAuthentifiedRequest(config);
      }
      throw error;
    });
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
  })
    .catch(async (error): Promise<any> => {
      if (error.response.status === 429) {
        console.log('Too many requests');
        await new Promise((res) => setTimeout(res, 8000));
        return makeAuthentifiedRequest(config);
      }
      throw error;
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

export async function getFeeds() {
  return makeAuthentifiedRequest<undefined, {_id: string; name: string; fromIds: string}[]>({
    method: 'GET',
    url: `${ENDPOINTS.posts}/feed`
  })
}

export async function getPosts(feedType: string, page: number, limit: number) {
  return makeAuthentifiedRequest({
    method: 'GET',
    url: `${ENDPOINTS.posts}/feed`,
    params: {
      id: feedType,
      page,
      limit
    }
  })
}

export async function createPost(text: string, files: File[]) {
  const formData = new FormData();
  formData.append('content', text);
  files.forEach((file) => {
    formData.append('images', file);
  })

  return makeAuthentifiedRequest({
    method: 'POST',
    url: `${ENDPOINTS.posts}/`,
    data: formData
  })
}

export async function getFollowers(page: number, limit: number) {
  return makeAuthentifiedRequest({
    method: 'GET',
    url: `${ENDPOINTS.users}/me/following`,
    params: {
      page,
      limit
    }
  })
}

export async function updateProfile(data: { username: string | undefined; email: string | undefined}) {
  return makeAuthentifiedRequest({
    method: 'POST',
    url: `${ENDPOINTS.users}/me`,
    data
  })
}

export async function updatePicture(picture: File) {
  const formData = new FormData();
  formData.append('file', picture);

  return makeAuthentifiedRequest({
    method: 'POST',
    url: `${ENDPOINTS.users}/me/picture`,
    data: formData
  })
}

export async function signUp(username: string, email: string, password: string) {
  return makeRequest({
    method: 'POST',
    url: `${ENDPOINTS.authentification}/register`,
    data: {
      username,
      email,
      password
    }
  })
}

export async function createList(name: string, userIds: string[]) {
  return makeAuthentifiedRequest({
    method: 'POST',
    url: `${ENDPOINTS.users}/feed`,
    data: {
      userIds,
      name
    }
  })  
}
