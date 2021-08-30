import mongoose from 'mongoose';
import { Readable } from 'stream';

import Contact from 'database/schemas/Contact';
import Tag from 'database/schemas/Tag';

import ImportContactsService from './ImportContactsService';

describe('Import', () => {
    beforeAll(async () => {
        if(!process.env.MONGO_URL) {
            throw new Error('MongoDB server not initialized');
        };

        await mongoose.connect(process.env.MONGO_URL);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    })

    beforeEach(async () => {
        await Contact.deleteMany({});
        await Tag.deleteMany({});
    });

    it('should be able to import new contacts', async () => {
        // Arquivo CSV
        // Importar CSV
        // Repassar uma tag
        // Espero que tenha os contatos de dentro do CSV salvos no db com a tag

        const contactsFilesStream = Readable.from([
            'diego@rocketseat.com.br',
            'robson@rocketseat.com.br',
            'cleiton@rocketseat.com.br',
        ]);

        const importContacts = new ImportContactsService();

        await importContacts.run(contactsFilesStream, ['Students', 'Class A']);

        const createdTags = await Tag.find({});

        expect(createdTags).toEqual([
            expect.objectContaining({ title: 'Students' }),
            expect.objectContaining({ title: 'Class A' }),
        ]);

        const createdTagsIds = createdTags.map( tag => tag._id );

        const createdContacts = await Contact.find({});

        expect(createdContacts).toEqual([
            expect.objectContaining({
                email: 'diego@rocketseat.com.br',
                tags: createdTagsIds,
            }),
            expect.objectContaining({
                email: 'robson@rocketseat.com.br',
                tags: createdTagsIds,
            }),
            expect.objectContaining({
                email: 'cleiton@rocketseat.com.br',
                tags: createdTagsIds,
            }),
        ]);
    });
});