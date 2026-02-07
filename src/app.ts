import express, {
  type Application,
  type Request,
  type Response,
} from 'express';
const app: Application = express();
import cors from 'cors';
import globalErrHandler from './app/middleware/golballErrorHandler.js';
import notFoundRoute from './app/middleware/notFoundRoute.js';
import rounter from './routes/index.js';


app.use(express.json());
app.use(cors());

app.use('/api/v1', rounter);

app.get('/', (req: Request, res: Response) => {
  res.send('zangi server is running');
});

//global error handler
app.use(globalErrHandler);

// not found route
app.use(notFoundRoute);

export default app;
