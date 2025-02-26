import express from 'express';
import dotenv from "dotenv"
import router from './routes/bannerRoutes.js';
// import cors from cors;

dotenv.config();
// app.use(cors())

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For form data
app.use('/uploads', express.static('uploads'));

 app.get('/', (req,res) => {
    res.send('hello node')
 })
const port = process.env.PORT || 6000
app.use('/v1',router)
app.listen(port, () => {
    console.log(`the server is running on port ${port}`);
    
})