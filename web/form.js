import {server} from './server.js'

const form = document.querySelector('#form')
const input = document.querySelector('#url')
const content = document.querySelector('#content')

form.addEventListener('submit', async (event) => {
    event.preventDefault()
    content.classList.add('placeholder')

    const videoURL = input.value

    if (!videoURL.includes("youtube.com/watch?v=")) {
        return (content.textContent = 'Invalid URL. Try a Youtube URL, not a short video.')
    }

    const [_, params] = videoURL.split('?v=') // getting the second part of the URL

    const [videoID] = params.split('&') // getting the first part of the URL

    content.textContent = 'Loading...'

    const transcription = await server.get("/summary/" + videoID)

    content.textContent = "Summarizing..."

    const summary = await server.post("/summary", {
        text: transcription.data.result
    })

    content.textContent = summary.data.result

    content.classList.remove('placeholder') // Remove the placeholder css class
    /*
    if (videoURL) {
        const videoId = videoURL.split('v=')[1] // Position of Video Id
        const ampersandPosition = videoId.indexOf('&')
        if (ampersandPosition != -1) {
            videoId = videoId.substring(0, ampersandPosition)
        }

        window.location.href = `/download?videoId=${videoId}`
    }
    */
})