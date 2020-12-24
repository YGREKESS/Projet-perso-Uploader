import express from "express"
import routes from './router'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from "cors"
import path from 'path'


const app = express();
const PORT = 5001;

// Connexion mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://youssef:060594Seg@cluster0.sqcnn.mongodb.net/Upload_project?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log("DB OK"));

// bodyparser
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public/img'))

app.use("/api/", routes);
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});

app.listen(PORT, () => {
    console.log(`Votre serveur est sur le port ${PORT}`)
})