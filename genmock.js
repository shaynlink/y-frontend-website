import { faker } from '@faker-js/faker';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const MAX_RECORDS = 100;

function bootstrap() {
  const data = {
    users: []
  };

  for (let i = 0; i < MAX_RECORDS; i++) {
    data.users.push({
      id: faker.string.uuid(),
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    });
  }

  fs.writeFileSync(path.resolve(path.join(process.cwd(), 'mockup.json')), JSON.stringify(data, null, 2));
}

bootstrap();
