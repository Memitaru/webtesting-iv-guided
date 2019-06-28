const db = require('../data/dbConfig.js');

const Hobbits = require('./hobbitsModel.js');

describe('the hobbits model', () => {
    describe('insert()', () => {
        afterEach(async () => {
            await db('hobbits').truncate();
        })

        it('should insert hobbits into the db', async () => {
            // using our model method
            await Hobbits.insert({name: 'Sam'})
            await Hobbits.insert({name: 'Frodo'})

            // confirm with knex
            const hobbits = await db('hobbits')

            expect(hobbits).toHaveLength(2)
            expect(hobbits[0].name).toBe('Sam')
        })

        it('should return the new hobbit on insert', async () => {
            const hobbit = await Hobbits.insert({name: 'Sam'})

            expect(hobbit).toEqual({id: 1, name: 'Sam'})
        })
    })

    describe('findById()', () => {
        afterEach(async () => {
            await db('hobbits').truncate();
        })
        // it('should find a hobbit by id', async () => {
        //     await Hobbits.insert({name: 'Sam'})
        //     await Hobbits.insert({name: 'Frodo'})

        //     const hobbit = await db('hobbits').where({id}).first()

        //     const result = await Hobbits.getById(1)

            
        // })

        it('finds a hobbit by id', async () => {
            // set up

            await db('hobbits').insert([
                { name: 'Sam'},
                { name: 'Frodo'}
            ])

            const hobbit = await Hobbits.findById(2)

            expect(hobbit.name).toBe('Frodo')
        })

        it('returns null on invalid id', async () => {
            const hobbit = await Hobbits.findById(2)

            expect(hobbit).toBeUndefined();
        })
    })
})