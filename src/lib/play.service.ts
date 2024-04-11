import GM_fetch from "@trim21/gm-fetch";

export async function playService(broadcastId: string) {
    const res = await GM_fetch('https://play.afreecatv.com/' + broadcastId)
    const html = await res.text()
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')

    const element = doc.querySelector('#player_area > div.broadcast_information > div.text_information > ul > li:nth-child(1) > span')

    if (!element) {
        console.error('element not found')
        return
    }

    const time = element.textContent

    if (!time) {
        console.error('time not found')
        return
    }

    return time
}