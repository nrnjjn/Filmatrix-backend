import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

const app=express()
app.use(cors())
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/filmatrix')
  .then(() => console.log('Connected!'));

import seekersRouter from './routes/seekers.js'
import filmcompanyRouter from './routes/filmcompany.js'
import hiringteamRouter from './routes/hiringteam.js'
import locationownerRouter from './routes/locationowner.js'
import adminRouter from './routes/admin.js'

app.use('/uploads', express.static('uploads'));

app.use('/seekers',seekersRouter)
app.use('/filmcompany',filmcompanyRouter)
app.use('/hiringteam',hiringteamRouter)
app.use('/locationowner',locationownerRouter)
app.use('/admin',adminRouter)


app.listen(4000)
