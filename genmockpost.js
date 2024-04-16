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
      user:{
        userId: faker.string.uuid(),
        name: faker.internet.userName(),
        avatar: faker.image.avatar()
      },
      content: faker.lorem.paragraph(),
      timestamp: faker.date.past(),
      likes: [faker.string.uuid()],
      comments: [faker.lorem.paragraph()],
      reposts: [faker.string.uuid()],
    });
  }

  fs.writeFileSync(path.resolve(path.join(process.cwd(), 'mockuppost.json')), JSON.stringify(data, null, 2));
}

bootstrap();
