import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";
require('dotenv').config();
// dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
}
const parentDir = require('path').resolve(process.cwd(), '../');
const PORT: number = parseInt(process.env.PORT as string, 10);
const HOST = process.env.LOCALHOST;

// console.log(parentDir)
// Create a new express application instance
const app = express();
// Call midlewares
app.use(cors());
app.use(helmet(
    { frameguard: false }
));
app.use(bodyParser.json());
app.use(express.static(parentDir + '/supportpacks-front/dist/mel-cop/'));

//routes
app.use("/api", routes);
// console.log(HOST, PORT)
// app.get('/melsp', (req, res) => {
//     res.sendFile(parentDir + "/supportpacks-front/dist/melsp/index.html")
// });
// app.get('/dmsp', (req, res) => {
//     res.sendFile(parentDir + "/supportpacks-front/dist/dmsp/index.html")
// });
// app.get('/', (req, res) => {
//     res.sendFile(parentDir + "/supportpacks-front/dist/mel-cop/index.html")
// });
// 404 catch 
app.all('*', (req: any, res: any) => {
    console.log(`[TRACE] Server 404 request: ${req.originalUrl}`);
    res.status(200).sendFile(parentDir + "/supportpacks-front/dist/mel-cop/index.html");
});

app.use((err: any, req: any, res: { setHeader: (arg0: string, arg1: string) => void; }, next: any) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site')
    console.log(err)
});

app.listen(PORT, `${HOST}`, () => {
    console.log(`Current parent directory: ${parentDir} `);
    console.log(`Server started on port ${PORT} and host ${HOST}!`);
});