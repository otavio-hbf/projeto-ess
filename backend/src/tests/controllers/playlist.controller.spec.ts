import supertest from 'supertest';
import app from '../../src/app';
import PlaylistEntity from '../../src/entities/playlist.entity';

const request = supertest(app);

describe('PlaylistController', () => {
  const mockedUserId: string = "Pedro";
  const mockedPlaylistName = {name: "My songs"};
  const mockedPlaylistId: string = "ce6f5c66-1967-4b21-9929-51ca7d652151";
  const mockedPlaylistId2: string = "alwnqwdnej18ej129";
  const mockedSongId: string = "1";
  const mockedFollower = "Thiago";
  const mockedContributorId: string = "contributor123";

  const mockedPlaylistEntity: PlaylistEntity = new PlaylistEntity({
    id: mockedPlaylistId,
    name: "Afternoon Sessions",
    songs: [],
    createdBy: mockedUserId,
    private: true,
    followers: [],
    contributors: [],
  });

  const mockedPlaylistEntity2: PlaylistEntity = new PlaylistEntity({
    id: mockedPlaylistId2,
    name: "Songs to listen to with a fever",
    songs: [],
    createdBy: mockedUserId,
    private: false,
    followers: [],
    contributors: [],
  });

  it('should return playlists', async () => {
    const response = await request.get('/api/playlists').send();
    const result = response.body.data;

    expect(response.status).toBe(200);
  });

  it('should return a playlist by id', async () => {
    const response = await request.get('/api/playlists/' + mockedPlaylistId).send();
    const result = response.body.data;

    expect(response.status).toBe(200);
    expect(result).toEqual(mockedPlaylistEntity);
});

it('should throw an error when playlist is not found by id', async () => {
    const response = await request.get('/api/playlists/1111').send();
    const result = response.body.msgCode;
    
    expect(response.status).toBe(404);
    expect(result).toEqual('playlist_not_found');
});

it('should create a playlist', async () => {
    const createPlaylistData = {createdBy: mockedUserId, name: mockedPlaylistName.name};
    const response = await request.post('/api/playlists').send(createPlaylistData);
    const result = response.body.data;
    
    
    expect(response.status).toBe(200);
    expect(result).toEqual(
        expect.objectContaining({
          name: mockedPlaylistName.name,
        })
    );
  });

  it('should update a playlist', async () => {
    const updatePlaylistData = {
        id: mockedPlaylistEntity.id, 
        name: "Updated Playlist", 
        songs: mockedPlaylistEntity.songs,
        createdBy: mockedPlaylistEntity.createdBy,
        private: mockedPlaylistEntity.private,
        followers: mockedPlaylistEntity.followers,
        userId: mockedUserId
    };
    const response = await request.put('/api/playlists/' + mockedPlaylistId).send(updatePlaylistData);
    const result = response.body.data;

    expect(response.status).toBe(200);
    expect(result).toEqual(
      expect.objectContaining({
        name: 'Updated Playlist',
      })
    );
  });
  
  it('should add a song to a playlist', async () => {
      const addSongtoPlaylistData = {userId: mockedUserId};
      const response = await request.put('/api/playlists/' + mockedPlaylistId + '/' + mockedSongId).send(addSongtoPlaylistData);
      const result = response.body.data;

      expect(response.status).toBe(200);
      expect(result.songs).toContain(mockedSongId);
    });
    
    it('should remove a song from a playlist', async () => {
        const addSongtoPlaylistData = {userId: mockedUserId};
        const response = await request.delete('/api/playlists/' + mockedPlaylistId + '/' + mockedSongId).send(addSongtoPlaylistData);
        const result = response.body.data;
        
        expect(response.status).toBe(200);
        expect(result.songs).not.toContain(mockedSongId);
    });
    
    it('should delete a playlist', async () => {
      const deletePlaylistData = {userId: mockedUserId};
      const response = await request.delete('/api/playlists/' + mockedPlaylistId).send(deletePlaylistData);
    
      expect(response.status).toBe(200);
    });

    it('should follow a playlist', async () => {
      const response = await request.put('/api/playlists/follow/' + "1").send({ userId: "2" });
      
      expect(response.status).toBe(200);
    });

    it('should throw an error when the user is already following that playlist', async () => {
      const response = await request.put('/api/playlists/follow/' + "1").send({ userId: "2" });
      
      expect(response.status).toBe(500);
    });

    it('should throw an error when following a private playlist', async () => {
      const response = await request.put('/api/playlists/follow/' + "4").send({ userId: "1" });
      
      expect(response.status).toBe(500);
    });

    it('should throw an error when following a playlist you own', async () => {
      const response = await request.put('/api/playlists/follow/' + "1").send({ userId: "1" });
      
      expect(response.status).toBe(500);
    });
  
    it('should unfollow a playlist', async () => {
      const response = await request.put('/api/playlists/unfollow/' + "1").send({ userId: "2" });
      
      expect(response.status).toBe(200);
    });

    it('should throw this error when trying to unfollow a playlist you are not following', async () => {
      const response = await request.put('/api/playlists/unfollow/' + "1").send({ userId: "2" });
      
      expect(response.status).toBe(500);
    });
  
    it('should add a contributor to a playlist', async () => {
      const response = await request.put('/api/playlists/addContributor/' + "1/" + "2").send({ userId: "1" });
      
      expect(response.status).toBe(200);
    });

    it('should throw an error when adding a user that is already a contributor', async () => {
      const response = await request.put('/api/playlists/addContributor/' + "1/" + "2").send({ userId: "1" });
      
      expect(response.status).toBe(500);
    });

    it('should throw an error when the owner tries to add itself as a contributor', async () => {
      const response = await request.put('/api/playlists/addContributor/' + "1/" + "1").send({ userId: "1" });
      
      expect(response.status).toBe(500);
    });

    it('should throw an error when an user other than the owner tries adding a contributor', async () => {
      const response = await request.put('/api/playlists/addContributor/' + "1/" + "3").send({ userId: "2" });
      
      expect(response.status).toBe(500);
    });
  
    it('should remove a contributor from a playlist', async () => {
      const response = await request.put('/api/playlists/removeContributor/' + "1/" + "2").send({ userId: "1" });
      expect(response.status).toBe(200);
    });

    it('should throw an error when trying to remove a user that is not a contributor', async () => {
      const response = await request.put('/api/playlists/removeContributor/' + "1/" + "2").send({ userId: "1" });
      expect(response.status).toBe(500);
    });

    it('should throw an error when owner is trying to remove itself as a contributor', async () => {
      const response = await request.put('/api/playlists/removeContributor/' + "1/" + "1").send({ userId: "1" });
      expect(response.status).toBe(500);
    });
});
