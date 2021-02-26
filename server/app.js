import express from 'express';
import mongoose from 'mongoose';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { MONGO_URI } from './config/index.js';
import auth from './routes/api/auth.js';
import users from './routes/api/users.js';
import posts from './routes/api/posts.js';

const app = express();

app.use(hpp());
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(morgan('dev'));
app.use(express.json());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected!'))
  .catch((err) => console.log('MongoDEB Connect Failed', err));

// Routes
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/posts', posts);

export default app;
