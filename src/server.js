import 'dotenv/config'
import './db/dbConnect.js'
import { app } from './app.js'



const HOST = 'localhost'
const PORT = 5000



app.listen(PORT, () => {
  console.log(`Example app listening on port http://${HOST}:${PORT}`)
})