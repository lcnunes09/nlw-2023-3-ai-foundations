import ytdl from "ytdl-core";
import fs from "fs";

export const download = (videoId) => 
    new Promise ((resolve, reject) => {
        const videoURL = "https://www.youtube.com/watch?v=" + videoId
        const videoInfo = videoId

        console.log("Download started...")

        console.log("videoURL ", videoURL)
        console.log("videoInfo ", videoInfo)

        ytdl(videoURL, { quality: 'lowestaudio', filter: 'audioonly' })
        .on(
            "info", 
            (info) => {
                //const seconds = info.fermats[0].approxDurationMs / 1000

            }
        )
        .on("end", () => {
            console.log("Download complete!")
            resolve()
        })
        .on("error", (error) => {
            console.log("Download failed!", error)
            reject(error)
        })
        .pipe(

            fs.createWriteStream("./tmp/audio.mp4")
        )
    })