import express from 'express'
import cors from "cors"

const PORT = 5000;

const app = express()

app.use(express.json())
app.use(cors());

app.post('/', (req, res) => {
    console.log(req.body)
    res.status(200).json("Server work")
})

app.listen(PORT, () => {
    console.log("SERVER STARTED ON PORT: " + PORT)
})

