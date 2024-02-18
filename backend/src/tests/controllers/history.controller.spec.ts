import supertest from 'supertest';
import HistoryEntity from '../../src/entities/history.entity';
import app from '../../src/app';
import { di } from '../../src/di';
import HistoryRepository from '../../src/repositories/history.repository';
import HistoryService from '../../src/services/history.service';

describe('HistoryController', () => {
  let request = supertest(app);
  let mockHistoryRepository: HistoryRepository;
  let historyService: HistoryService;

  let mockHistoryEntity: HistoryEntity = new HistoryEntity({
    id: '',
    song_id: '2',
    user_id: '3',
  });

  beforeEach(() => {
    mockHistoryRepository = di.getRepository(HistoryRepository);
    historyService = di.getService(HistoryService);
  });
  
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return a history by id', async () => {
    const createdHistoryEntity = await historyService.createHistory(
      mockHistoryEntity
    );

    const response = await request.get(`/api/history/${createdHistoryEntity.id}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(createdHistoryEntity);
  });

  it('should throw an error when history is not found', async () => {
    const response = await request.get(`/api/history/02`);

    expect(response.status).toBe(404);
    expect(response.body.msgCode).toEqual('history_not_found');
  });

  it('should create a history', async () => {
    const response = await request.post('/api/history').send(mockHistoryEntity);

    expect(response.status).toBe(200);

    expect(response.body.data).toEqual(
      expect.objectContaining({
        song_id: mockHistoryEntity.song_id,
        user_id: mockHistoryEntity.user_id,
      })
    );
  });

  it('should delete a history', async () => {
    const createdHistoryEntity = await mockHistoryRepository.createHistory(
      mockHistoryEntity
    );

    const response = await request.delete(`/api/history/${createdHistoryEntity.id}`);

    const deletedHistoryEntity = await mockHistoryRepository.getHistory(
      createdHistoryEntity.id
    );
    expect(response.status).toBe(200);
    expect(deletedHistoryEntity).toBeNull();
  });
});
