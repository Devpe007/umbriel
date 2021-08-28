import mongoose from 'mongoose';

import Contact from 'database/schemas/Contact';

describe('Import', () => {
    beforeAll(async () => {
        if(!process.env.MONGO_URL) {
            throw new Error('MongoDB server not initialized');
        };

        await mongoose.connect(process.env.MONGO_URL);
    });
});