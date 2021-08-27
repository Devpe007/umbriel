import mongoose from 'mongoose';

mongoose.connect(`mongodb+srv://AndDev07:${process.env.PASS}@umbriel.3eyal.mongodb.net/mvpUmbriel?retryWrites=true&w=majority`);