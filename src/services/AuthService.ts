
import mockup from '../../mockup.json';

async function fakeAxios(key: string, predicate: any) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve((mockup as Record<string, any[]>)[key].find(predicate));
    }, 2000);
  });
}

export async function loginFn(email: string, password: string) {
  // axios.post('/auth/login', { body: { email, password }}) 
  return await fakeAxios('users', (user) => user.email === email && user.password === password);
}