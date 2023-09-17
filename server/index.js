import cors from 'cors'
import express from 'express'

import { download } from './download.js'
import { transcribe } from './transcribe.js'
import { summarize } from './summarize.js'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/summary/:id', async (request, response) => {
    await download(request.params.id)
    
    const result = await transcribe()
    
    return response.json({ 
        result
    })
    
})

app.post('/summary', async (request, response) => {
    const { text } = request.body
    
    const result = await summarize(text)
    
    return response.json({ 
        result
    })
})

const port = 3000;

app.listen(port, () =>
  console.log('Server is running on localhost:', port)
);