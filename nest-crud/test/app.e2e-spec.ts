import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import * as pactum from 'pactum';

import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import { AuthDTO } from '../src/auth/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  // Compile the app before running the test
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // Simulate the app
    // (see: src/main.ts)
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
    await app.listen(3333);

    // Clean Test DB
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
  });

  /**
   * const dto: AuthDTO = {
          email: 'test@gmail.com',
          password: 'testpassword',
        };

        return pactum
          .spec()
          .post('http://localhost:3333/auth/signup')
          .withBody(dto)
          .expectStatus(200)
          .inspect();
   */

  describe('Auth', () => {
    describe('signup', () => {
      it('should signup', async () => {
        const dto: AuthDTO = {
          email: 'test@gmail.com',
          password: 'testpassword',
        };

        return await pactum
          .spec()
          .post('http://localhost:3333/auth/sign-up')
          .withBody(dto)
          .expectStatus(201)
          .inspect();
      });
    });
    describe('login', () => {
      it.todo('should login');
    });
  });

  describe('Users', () => {
    describe('getMe', () => {
      it.todo('should return Me');
    });
  });

  describe('Jobs', () => {
    describe('create', () => {
      it.todo('should create jobs');
    });
    describe('findAll', () => {
      it.todo('should find all jobs');
    });
    describe('findOne', () => {
      it.todo('should find a job by id');
    });
  });

  // Close app after testing everything
  afterAll(() => {
    app.close();
  });

  it.todo('should pass');
});
