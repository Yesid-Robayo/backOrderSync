
import express, { Request, Response } from 'express';
import { initRoutes } from './routes';

/**
 * Express application instance.
 */
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

initRoutes(app); 

app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'UP' });

});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
