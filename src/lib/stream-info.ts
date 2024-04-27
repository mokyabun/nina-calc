import GM_fetch from "@trim21/gm-fetch";

export async function getStreamStartTime(broadcastId: string) {
    // Parse broadcast data
    const res = await GM_fetch('https://play.afreecatv.com/' + broadcastId)
    const html = await res.text()
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')

    // Get time text
    const timeText = doc.querySelector('#player_area > div.broadcast_information > div.text_information > ul > li:nth-child(1) > span')?.textContent

    if (!timeText) {
        console.error('time not found')
        return
    }

    return timeText
}
