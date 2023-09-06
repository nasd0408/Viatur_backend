import express from 'express';
import "reflect-metadata";
import cors from 'cors';
import bodyParser from "body-parser";
import { AppDataSource } from './config/db.config';
import routes from './routes/main.routes';

const app = express();

// Establish database connection
AppDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err)
  })
  
/// Middleware sets in applications
app.use(cors());
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/images", express.static("images"));

// Routes
app.use('/api/v1', routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

export default app
