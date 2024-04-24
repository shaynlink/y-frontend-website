
import mockup from '../../mockup.json';
import mockuppost from '../../mockuppost.json';

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

export async function loginFn(email: string, password: string) {
  // axios.post('/auth/login', { body: { email, password }}) 
  return await fakeAxios('users', (user) => user.email === email && user.password === password);
}
export async function SignInFn(email: string, password: string, name: string) {

  return await fakeAxios('users', (user) => user.email === email && user.password === password && user.name === name);
}

export async function checkUserExists(value: string, type: string) {
  // axios.get(`/users?${type}=${value}`)
  return await fakeAxios('users', (user) => user[type] === value);
}
export async function getUserData(userId: string) {
  // axios.get(`/users/${userId}`)
  return await fakeAxios('users', (user) => user.id === userId);
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