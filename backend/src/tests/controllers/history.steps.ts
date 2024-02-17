// import { loadFeature, defineFeature } from 'jest-cucumber';
// import supertest from 'supertest';
// import app from '../../src/app';
// import { di } from '../../src/di';
// import HistoryRepository from '../../src/repositories/history.repository';

// const feature = loadFeature('historys/features/historys.feature');
// const request = supertest(app);

// defineFeature(feature, (history) => {
//   // mocking the repository
//   let mockHistoryRepository: HistoryRepository;
//   let response: supertest.Response;

//   beforeEach(() => {
//     mockHistoryRepository = di.getRepository<HistoryRepository>(HistoryRepository);
//   });

//   test('Create a history', ({ given, when, then, and }) => {
//     given(/^o HistoryRepository não tem um history com nome "(.*)"$/, async (historyId, historyName) => {
//       // Check if the history does not exist in the repository and delete it if it exists
//       const existingHistory = await mockHistoryRepository.getHistory(historyId);
//       if (existingHistory) {
//         await mockHistoryRepository.deleteHistory(historyId);
//       }
//     });

//     when(
//       /^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com o nome "(.*)"$/,
//       async (url, historyName) => {
//         response = await request.post(url).send({
//           name: historyName,
//         });
//       }
//     );

//     then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
//       expect(response.status).toBe(parseInt(statusCode, 10));
//     });

//     and(/^o JSON da resposta deve conter o nome "(.*)"$/, (historyName) => {
//         expect(response.body.data).toEqual(
//           expect.objectContaining({
//             name: historyName,
//           })
//         );
//       }
//     );
//   });
// });
