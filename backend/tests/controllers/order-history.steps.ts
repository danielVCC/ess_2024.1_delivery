import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import TestRepository from '../../src/repositories/test.repository';

const feature = loadFeature('tests/features/order-history.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
  // mocking the repository
  let mockTestRepository: TestRepository;
  let response: supertest.Response;
  let user: any;

  beforeEach(() => {
    mockTestRepository = di.getRepository<TestRepository>(TestRepository);
  });

  test('Usuario com pedidos', ({ given, when, then, and }) => {
    given(/^o usuário de id "(.*)" está registrado no sistema$/, async (userId) => {

      const res = await request.get(`/users/${userId}`);
      user = res.body
      if(user.error) {
        user = {
          "id": parseInt(userId),
          "name": "João Silva",
          "email": "joao.silva@example.com",
          "orders": []  
        }
        response = await request.post('/user/register').send(user);
        expect(response.status).toBe(201);
      };
      expect(user.id).toEqual(parseInt(userId));

      // const user = await mockUserRepository.getUser(userId);
      // if (!user) {
      //   await mockUserRepository.createUser({ id: userId, name: 'User 1' });
      // }
    });

    and(/^o usuário possui um pedido de id "(.*)"$/, async (orderId) => {
      console.log(user.orders)
      if(user.orders.find((order: any) => order.order_id == orderId)) {
        response = await request.put(`/user/${user.id}/details`).send({ "orders":  [
          {
            "order_id": parseInt(orderId),
            "data": "2024-06-01",
            "itens": [
                {
                "produto_id": 1001,
                "name": "Produto A",
                "quantity": 2,
                "price": 19.99
                }
            ],
            "total": 39.98
          }
        ]});
        expect(response.status).toBe(201);      
      };
    });

    when('é feita uma requisição para obter os pedidos do usuário', async () => {
        response = await request.get(`/users/${user.id}/orders`);
        expect(response.status).toBe(200);
    });

    then(/^a resposta deve conter o pedido com id "(.*)"$/, (orderId) => {
      const order = response.body.orders.find((order: any) => order.order_id == orderId);
      expect(order).toBeDefined();
    });
  });

  /////////////////////////////////////////////////////////////////

  test('Usuario sem pedidos', ({ given, when, then, and }) => {
    given(/^o usuário de id "(.*)" está registrado no sistema$/, async (userId) => {

      const res = await request.get(`/users/${userId}`);
      user = res.body
      if(user.error) {
        user = {
          "id": parseInt(userId),
          "name": "Pedro Freitas",
          "email": "pedro.freitas@example.com",
          "orders": []  
        }
        response = await request.post('/user/register').send(user);
      };
      expect(user.id).toEqual(parseInt(userId));
    });

    and('o usuário não possui pedidos', async () => {
      if(user.orders.length > 0) {
        response = await request.put(`/user/${user.id}/details`).send({ "orders":  []});
        expect(response.status).toBe(200)
      };
    });

    when('é feita uma requisição para obter os pedidos do usuário', async () => {
        response = await request.get(`/users/${user.id}/orders`);
    });

    then(/^a mensagem "(.*)" deve ser retornada$/, (message) => {
      expect(response.body.message).toBe(message);
    });
  });
});