// import supertest from 'supertest';
// import HistoryEntity from '../../src/entities/history.entity';
// import app from '../../src/app';
// import { di } from '../../src/di';
// import HistoryRepository from '../../src/repositories/history.repository';

// describe('HistoryController', () => {
//   let request = supertest(app);
//   let mockHistoryRepository: HistoryRepository;

//   let mockHistoryEntity: HistoryEntity = new HistoryEntity({
//     id: '123',
//     name: 'history',
//   });

//   beforeEach(() => {
//     mockHistoryRepository = di.getRepository<HistoryRepository>(HistoryRepository);
//   });

//   it('should return a history by id', async () => {
//     const createdHistoryEntity = await mockHistoryRepository.createHistory(
//       mockHistoryEntity
//     );

//     const response = await request.get(`/api/historys/${createdHistoryEntity.id}`);

//     expect(response.status).toBe(200);
//     expect(response.body.data).toEqual(createdHistoryEntity);
//   });

//   it('should throw an error when history is not found', async () => {
//     const response = await request.get(`/api/historys/02`);

//     expect(response.status).toBe(404);
//     expect(response.body.msgCode).toEqual('history_not_found');
//   });

//   it('should create a history', async () => {
//     const response = await request.post('/api/historys').send(mockHistoryEntity);

//     expect(response.status).toBe(200);

//     expect(response.body.data).toEqual(
//       expect.objectContaining({
//         name: mockHistoryEntity.name,
//       })
//     );
//   });

//   it('should update a history', async () => {
//     const createdHistoryEntity = await mockHistoryRepository.createHistory(
//       mockHistoryEntity
//     );

//     const response = await request
//       .put(`/api/historys/${createdHistoryEntity.id}`)
//       .send({
//         name: 'history2',
//       });

//     expect(response.status).toBe(200);
//     expect(response.body.data).toEqual(
//       expect.objectContaining({
//         name: 'history2',
//       })
//     );
//   });

//   it('should delete a history', async () => {
//     const createdHistoryEntity = await mockHistoryRepository.createHistory(
//       mockHistoryEntity
//     );

//     const response = await request.delete(`/api/historys/${createdHistoryEntity.id}`);

//     const deletedHistoryEntity = await mockHistoryRepository.getHistory(
//       createdHistoryEntity.id
//     );
//     expect(response.status).toBe(200);
//     expect(deletedHistoryEntity).toBeNull();
//   });
// });
