import dayjs from 'dayjs'

// Milliseconds unix
const time = dayjs().valueOf()

const data = []

for (let i = 0; i < 500; i++) {
    data.push({
        broad: 'afreeca',
        main: true,
        type: 'SENDBALLOON',
        value: Math.floor(Math.random() * 10000),
        join: 0,
        msg: 'aaa',
        // Random id
        id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        // Random name
        name: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        tts: 'kor_custom07',
        // time + random
        time: time + Math.floor(Math.random() * 1000),
        idx: i,
        subpage: '0',
    })
}

for (let i = 0; i < 10; i++) {
    data.push({
        broad: 'afreeca',
        main: true,
        type: 'FOLLOW_ITEM',
        value: Math.floor(Math.random() * 50),
        join: 0,
        msg: '',
        id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        name: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        time: time + Math.floor(Math.random() * 1000),
        idx: 500 + i,
        subpage: '0',
    })
}

export const testData = {
    type: 'alertload',
    sub: 'load',
    socketid: '-IvUPLav8Pt4D4rKdAJw',
    idx: 'VZqWl66e',
    pageid: 'setup',
    subpage: 'alertlist',
    data: data,
    debug: 'socket',
}
