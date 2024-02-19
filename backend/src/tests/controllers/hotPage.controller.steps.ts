import { defineFeature, loadFeature } from "jest-cucumber";
import supertest from "supertest";
import app from "../../src/app";
import SongEntity from "../../src/entities/song.entity";
import SongRepository from "../../src/repositories/song.repository";
import HotPageService from "../../src/services/hotPage.service";

const feature = loadFeature('tests/features/hotPage-route.feature');
const request = supertest(app);

/* title: string;
duration: number;
artist: string;
genre: string;
times_ever_played: number;
 */
defineFeature(feature, (test) => {

    let songList: SongEntity[] = [];
    // let songService: HotPageService;
    let hotPageService: HotPageService;
    let mockSongRepository: SongRepository;

    let response: supertest.Response;

    beforeEach(() => {
        // songService = {
        //     getHotSongs: jest.fn()
        // } as any;

        mockSongRepository = {
            getSongs: jest.fn()
        } as any

        hotPageService = new HotPageService(mockSongRepository)

        //songService = new SongService(mockSongRepository);
    })

    afterEach(() => {
        jest.resetAllMocks();
    })

    test("Mostrar as top músicas", ({ given, when, then, and }) => {
        given(/^já existem 6 músicas de ids "(.*)", "(.*)", "(.*)", "(.*)", "(.*)", "(.*)" cadastradas$/,
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
        when(/^uma requisição GET for enviada para a rota "(.*)"$/,
            async (url:string) => {
                response = await request.get(url).send()
            })
        then(/^o status da resposta é (\d+)$/,
            async (status) => {
                expect(response.status).toBe(parseInt(status));
            })
        and(/^o JSON da resposta deve conter os ids e nomes das (\d+) músicas mais tocadas$/,
            async (num:number) => {
                
                jest.spyOn(mockSongRepository, 'getSongs').mockResolvedValue(songList);
                jest.spyOn(hotPageService, 'getHotSongs');

                const hotSongs = await hotPageService.getHotSongs()

                expect(hotSongs).toEqual(
                    songList.sort((a, b) => b.times_ever_played - a.times_ever_played).slice(0, num)
                );
            })
    })

    test("Mostrar as top músicas por gênero", ({ given, when, then, and }) => {
        given(/^já existem 6 músicas de ids "(.*)", "(.*)", "(.*)", "(.*)", "(.*)", "(.*)" cadastradas com gênero "(.*)"$/,
            async (id1, id2, id3, id4, id5, id6, genre) => {
                const idArray = [id1, id2, id3, id4, id5, id6];
                songList = idArray.map(id => new SongEntity({ 
                    id: id, 
                    title: `song ${id}`, 
                    duration: 180,
                    artist: `artist ${id}`,
                    genre: genre,
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
        when(/^uma requisição GET for enviada para a rota "(.*)"$/,
            async (url:string) => {
                response = await request.get(url).send()
            })
        then(/^o status da resposta é (\d+)$/,
            async (status) => {
                expect(response.status).toBe(parseInt(status));
            })
        and(/^o JSON da resposta deve conter os ids e nomes das (\d+) músicas mais tocadas do gênero "(.*)"$/,
            async (num:number, genre:string) => {
                jest.spyOn(mockSongRepository, 'getSongs').mockResolvedValue(
                    songList.filter(song => song.genre === genre)
                );
                jest.spyOn(hotPageService, 'getHotSongs');

                const hotSongs = await hotPageService.getHotSongs(genre)

                expect(hotSongs).toEqual(
                    songList.filter(song => song.genre === genre)
                    .sort((a, b) => b.times_ever_played - a.times_ever_played).slice(0, num))
        })
    })
    test("Obter top 5 músicas quando há menos cadastradas", ({ given, when, then, and }) => {
        given(/^já existem (\d+) músicas de ids "(.*)", "(.*)", "(.*)", "(.*)" cadastradas$/,
            async (id1, id2, id3, id4) => {
                const idArray = [id1, id2, id3, id4];
                songList = idArray.map(id => new SongEntity({ 
                    id: id, 
                    title: `song ${id}`, 
                    duration: 180,
                    artist: `artist ${id}`,
                    genre: `genre ${id}`,
                    times_ever_played: 0 
                }));
            })
        and(/^suas respectivas quantidades de vezes já tocadas é "(\d+)", "(\d+)", "(\d+)", "(\d+)"$/,
            async (time1, time2, time3, time4) => {
                const timeArray = [time1, time2, time3, time4];
                for (let i = 0; i < songList.length; i++) {
                        songList[i].times_ever_played = parseInt(timeArray[i]);
                }
        })
        when(/^uma requisição GET for enviada para a rota "(.*)"$/,
            async (url:string) => {
                response = await request.get(url).send()
            })
        then(/^o status da resposta é "(.*)"$/,
        async (status) => {
            expect(response.status).toBe(parseInt(status));
        })
        and(/^o JSON da resposta inclui todas as (\d+) músicas ordenadas por vezes que já foram tocadas$/,
            async (num:number) => {
                jest.spyOn(mockSongRepository, 'getSongs').mockResolvedValue(
                    songList
                );
                jest.spyOn(hotPageService, 'getHotSongs');

                const hotSongs = await hotPageService.getHotSongs()

                expect(hotSongs).toEqual(
                    songList
                    .sort((a, b) => b.times_ever_played - a.times_ever_played).slice(0, num))
        })
    })

    test("Obter top 5 músicas de determinado gênero quando há menos cadastradas", ({ given, when, then, and }) => {
        given(/^já existem 4 músicas de ids "(.*)", "(.*)", "(.*)", "(.*)" cadastradas com gênero "(.*)"$/,
            async (id1, id2, id3, id4, genre) => {
                const idArray = [id1, id2, id3, id4];
                songList = idArray.map(id => new SongEntity({ 
                    id: id, 
                    title: `song ${id}`, 
                    duration: 180,
                    artist: `artist ${id}`,
                    genre: genre,
                    times_ever_played: 0 
                }));
            })
        and(/^suas respectivas quantidades de vezes já tocadas é "(\d+)", "(\d+)", "(\d+)", "(\d+)"$/,
            async (time1, time2, time3, time4) => {
                const timeArray = [time1, time2, time3, time4];
                for (let i = 0; i < songList.length; i++) {
                        songList[i].times_ever_played = parseInt(timeArray[i]);
                }
        })
        when(/^uma requisição GET for enviada para a rota "(.*)"$/,
            async (url:string) => {
                response = await request.get(url).send()
            })
        then(/^o status da resposta é "(.*)"$/,
        async (status) => {
            expect(response.status).toBe(parseInt(status));
        })
        and(/^o JSON da resposta inclui os ids e nomes apenas das (\d+) músicas do gênero "(.*)"$/,
            async (num:number, genre:string) => {
                jest.spyOn(mockSongRepository, 'getSongs').mockResolvedValue(
                    songList.filter(song => song.genre === genre)
                );
                jest.spyOn(hotPageService, 'getHotSongs');
                
                const hotSongs = await hotPageService.getHotSongs(genre)

                expect(hotSongs).toEqual(
                    songList.filter(song => song.genre === genre)
                    .sort((a, b) => b.times_ever_played - a.times_ever_played).slice(0, num))
        })
    })
    test("Inserir na URL um gênero não cadastrado na base de dados", ({ given, when, then, and }) => {
        given(/^não há músicas do gênero "(.*)"$/,
            async (genre) => {
                songList = [new SongEntity({
                    id: "1",
                    title: "song 1",
                    duration: 180,
                    artist: "artist 1",
                    genre: "genre 1",
                    times_ever_played: 0
                })];
            })
        when(/^uma requisição GET for enviada para a rota "(.*)"$/,
            async (url:string) => {
                response = await request.get(url).send()
            })
        then(/^o status da resposta é (\d+)$/,
        async (status) => {
            expect(response.status).toBe(parseInt(status));
        })
        and(/^a mensagem retornada é "(.*)"$/,
            async (msg:string) => {
                expect(response.body.msg).toBe(msg);
        })
    })
    
})