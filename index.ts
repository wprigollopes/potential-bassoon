import express from 'express';
import config from 'config';
import mongoose from 'mongoose';

import router from './routes';

const app = express();
app.use(express.json());
app.use(router);

const port = config.get('server.port');

mongoose
  .connect(config.get('mongoose.connection'))
  .then(() => {
    console.log('Connected to mongoDB');
    
  })
  .catch((err: String) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
