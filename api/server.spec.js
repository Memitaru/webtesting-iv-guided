const request = require('supertest');

const server = require('./server.js');

const db = require('../data/dbConfig')

describe('server.js', () => {
    it('should set the test env', () => {
        expect(process.env.DB_ENV).toBe('testing')
    })

    describe('GET /', () => {
        it('should return 200', () => {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.status).toBe(200);
                })
        })

        it('should return 200 using async/await', async () => {
            const res = await request(server).get('/')
            expect(res.status).toBe(200);
        })

        it('should return JSON', async () => {
            const res = await request(server).get('/')
            expect(res.type).toBe('application/json');
        })

        it('should return api: up', async () => {
            const res = await request(server).get('/')
            expect(res.body).toEqual({api: 'up'})
        })
    })

    describe('GET /hobbits', () => {

        afterEach(async () => {
            await db('hobbits').truncate()
        })
        it('should hit endpoint', async () => {
            const res = await request(server).get('/hobbits')
            expect(res.status).toBe(200);
            expect(res.body).toEqual([]);
        })

        it('should return all hobits in db', async () => {
            const hobbits = [
                {id: 1, name: 'Sam'},
                {id: 2, name: 'Frodo'}
            ]

            await db('hobbits').insert(hobbits)

            const res = await request(server).get('/hobbits')
            expect(res.status).toBe(200)
            expect(res.body).toEqual(hobbits)
        })
    })
})