import ytdl from "ytdl-core";
import fs from "fs";

export const download = (videoId) => {
    const videoURL = "https://www.youtube.com/watch?v=" + videoId

    console.log("Download started...")

    ytdl(videoURL, { quality: 'lowestaudio', filter: 'audioonly' })
    .on(
        "info", 
        (info) => {
            //const seconds = info.fermats[0].approxDurationMs / 1000

        }
    )
    .on("end", () => {
        console.log("Download complete!")
    })
    .on("error", (error) => {
        console.log("Download failed!", error)
    })
    .pipe(
        fs.createWriteStream("./tmp/" + videoId + ".mp4")
    )

}