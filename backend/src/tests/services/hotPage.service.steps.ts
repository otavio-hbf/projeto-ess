import { defineFeature, loadFeature } from "jest-cucumber";
import SongEntity from "../../src/entities/song.entity";
import HotPageService from "../../src/services/hotPage.service";
import SongRepository from "../../src/repositories/song.repository";
import supertest from "supertest";

const feature = loadFeature("tests/features/hotPage-service.feature");

defineFeature(feature, (test) => {
    let songList: SongEntity[] = [];
    let hotSongs: SongEntity[] = [];
    let hotPageService: HotPageService;
    let mockSongRepository: SongRepository;

    let response: supertest.Response;

    beforeEach(() => {
        mockSongRepository = {
            getSongs: jest.fn()
        } as any

        hotPageService = new HotPageService(mockSongRepository)

    })

    afterEach(() => {
        jest.resetAllMocks();
    })

    test("Ordenar top músicas em ordem decrescente de vezes já tocadas", ({ given, when, then, and }) => {
        given(/^as músicas de id "(.*)", "(.*)", "(.*)", "(.*)", "(.*)" estão cadastradas$/,
            async (id1, id2, id3, id4, id5) => {
                const idArray = [id1, id2, id3, id4, id5];
                songList = idArray.map(id => new SongEntity({ 
                    id: id, 
                    title: `song ${id}`, 
                    duration: 180,
                    artist: `artist ${id}`,
                    genre: `genre ${id}`,
                    times_ever_played: 0 
                }));
            })
        and(/^suas respectivas quantidades de vezes já tocadas é "(\d+)", "(\d+)", "(\d+)", "(\d+)", "(\d+)"$/,
            async (time1, time2, time3, time4, time5) => {
                const timeArray = [time1, time2, time3, time4, time5];
                for (let i = 0; i < songList.length; i++) {
                        songList[i].times_ever_played = parseInt(timeArray[i]);
                }
            })
            when(/^o método getHotSongs é chamado$/,
                async () => {   
                    jest.spyOn(mockSongRepository, 'getSongs').mockResolvedValue(songList);
                    jest.spyOn(hotPageService, 'getHotSongs');

                    hotSongs = await hotPageService.getHotSongs()
            })
            then(/^os ids das músicas no ranking do primeiro ao quinto colocado são, respectivamente, "(.*)", "(.*)", "(.*)", "(.*)", "(.*)"$/,
                async (id1, id2, id3, id4, id5) => {

                    let expectedArray = [id1, id2, id3, id4, id5]
                    let returnedArray = hotSongs.map(song => song.id);

                    expect(expectedArray).toEqual(returnedArray);
                })
    })

    test("Filtrar top músicas por gênero", ({ given, when, then, and }) => {
        given(/^as músicas de id "(.*)", "(.*)", "(.*)", "(.*)", "(.*)" estão cadastradas com gênero "(.*)"$/,
            async (id1, id2, id3, id4, id5, genre) => {
                const idArray = [id1, id2, id3, id4, id5];
                songList = idArray.map(id => new SongEntity({ 
                    id: id, 
                    title: `song ${id}`, 
                    duration: 180,
                    artist: `artist ${id}`,
                    genre: genre,
                    times_ever_played: 0 
                }));
            })
        and(/^suas respectivas quantidades de vezes já tocadas é "(\d+)", "(\d+)", "(\d+)", "(\d+)", "(\d+)"$/,
            async (time1, time2, time3, time4, time5) => {
                const timeArray = [time1, time2, time3, time4, time5];
                for (let i = 0; i < songList.length; i++) {
                        songList[i].times_ever_played = parseInt(timeArray[i]);
                }
            })
        when(/^o método getHotSongs é chamado com o gênero "(.*)"$/,
            async (genre) => {   
                jest.spyOn(mockSongRepository, 'getSongs').mockResolvedValue(songList);
                jest.spyOn(hotPageService, 'getHotSongs');

                hotSongs = await hotPageService.getHotSongs(genre)
        })
        then(/^os ids das músicas no ranking do gênero MPB do primeiro ao quinto colocado são, respectivamente, "(.*)", "(.*)", "(.*)", "(.*)", "(.*)"$/,
            async (id1, id2, id3, id4, id5) => {

                let expectedArray = [id1, id2, id3, id4, id5]
                let returnedArray = hotSongs.map(song => song.id);

                expect(expectedArray).toEqual(returnedArray);
            })
        
    })
    test("Critério de desempate", ({ given, when, then, and }) => {
        given(/^as músicas de id "(.*)", "(.*)", "(.*)", "(.*)", "(.*)", "(.*)" estão cadastradas$/,
            async (id1, id2, id3, id4, id5, id6) => {
                const idArray = [id1, id2, id3, id4, id5, id6];
                songList = idArray.map(id => new SongEntity({ 
                    id: id, 
                    title: `song ${id}`, 
                    duration: 180,
                    artist: `artist ${id}`,
                    genre: `genre ${id}`,
                    times_ever_played: 0 
                }));
            })
        and(/^suas respectivas quantidades de vezes já tocadas é "(\d+)", "(\d+)", "(\d+)", "(\d+)", "(\d+)", "(\d+)"$/,
            async (time1, time2, time3, time4, time5, time6) => {
                const timeArray = [time1, time2, time3, time4, time5, time6];
                for (let i = 0; i < songList.length; i++) {
                        songList[i].times_ever_played = parseInt(timeArray[i]);
                }
            })
        when(/^o método getHotSongs é chamado$/,
            async () => {
                jest.spyOn(mockSongRepository, 'getSongs').mockResolvedValue(songList);
                jest.spyOn(hotPageService, 'getHotSongs');

                hotSongs = await hotPageService.getHotSongs()
            }
        )
        then(/^as músicas são dispostas na ordem "(.*)", "(.*)", "(.*)", "(.*)", "(.*)", utilizando como desempate a permanência da música cadastrada há mais tempo$/,
            async (id1, id2, id3, id4, id5) => {

                let expectedArray = [id1, id2, id3, id4, id5]
                let returnedArray = hotSongs.map(song => song.id);

                expect(expectedArray).toEqual(returnedArray);
            })
    })

})