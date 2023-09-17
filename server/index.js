import cors from 'cors'
import express from 'express'

import { convert } from './convert.js'
import { download } from './download.js'
import { transcribe } from './transcribe.js'
import { summarize } from './summarize.js'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/summary/:id', async (request, response) => {
    try {
        await download(request.params.id)

        const audioConverted = await convert()
        
        const result = await transcribe(audioConverted)
        
        return response.json({ 
            result
        })
    } catch(error) {
        console.log(error)
        return response.status(500).json({ 
            error: error.message
        })
    }
})

app.post('/summary', async (request, response) => {
     try {
        const { text } = request.body
        
        const result = await summarize(text)
        
        return response.json({ 
            result
        })
    } catch(error) {
        console.log(error)
        return response.status(500).json({ 
            error: error.message
        })
    }
})

const port = 3000;

app.listen(port, () =>
  console.log('Server is running on localhost:', port)
);