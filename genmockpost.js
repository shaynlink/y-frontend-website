import { faker } from '@faker-js/faker';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const MAX_RECORDS = 100;

function bootstrap() {
  const data = {
    post: []
  };

  for (let i = 0; i < MAX_RECORDS; i++) {
    data.post.push({
      id: faker.string.uuid(),
      userId: faker.string.uuid(),
      content: faker.lorem.paragraph(),
      timestamp: faker.date.past()
    });
  }

  fs.writeFileSync(path.resolve(path.join(process.cwd(), 'mockuppost.json')), JSON.stringify(data, null, 2));
}

bootstrap();
