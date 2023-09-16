import ytdl from "ytdl-core";
import fs from "fs"

export const download = (videoId) => new Promise((resolve, reject) =>  {
  const videoURL = "https://www.youtube.com/shorts/" + videoId
  console.log("realizando o download do video:", videoId)


  ytdl(videoURL, {quality: "lowestaudio", filter: "audioonly"})
  .on
  ("info",
  (info) => {
    const seconds = info.formats[0].approxDurationMs / 1000
    console.log(seconds)

    if(seconds > 60) {
      throw new error("A duração desse video é maior que 60 segundos")
    }
   }
  ).on("end", () =>{
    console.log("Download do video finalizado")
    resolve()
  })
  .on("error", (error)=> {console.log("Não foi possivel fazer o dowload do video. Detalhes do erro:", error
  )
  reject(error)
}).pipe(fs.createWriteStream("./tmp/audio.mp4"))
})
