
//[00:00.000] 作词 : 许嵩
export function parseLyric(lyricString) {
    const lineString = lyricString.split('\n')
    const lyricsList = []
    for (let line of lineString) {
        if (line) {
            let result = parseExp.exec(line)
            if (!result) {
                continue
            }
            const minutes = result[1]
            const seconds = result[2]
            const millis = result[3].length === 3 ? result[3] * 1 :  result[3] * 10
            const t = minutes * 60 * 1000 + seconds * 1000 + millis
            let l = line.replace(parseExp, "").trim()
            if (l === "") {
                l = "~♬~♬~♬~"
            }
            const lineLrc = {t, l}
            lyricsList.push(lineLrc)
        }
    }
    return lyricsList
}
// ["[00:00.000]", "00", "00", "000", index: 0, input: "[00:00.000] 作词 : 许嵩", groups: undefined]
const parseExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/