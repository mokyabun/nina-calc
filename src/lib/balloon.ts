import type { Balloon, BalloonDataSum, Sub } from '../types'
import { GM } from '$'
import { BALLOON, BALLOON_KEYS, LAST_SAVE_TIME } from './constants'
import dayjs from 'dayjs'
import { Utils } from './utils'

const indexMap = new Map<number, string>()

function emitBalloonDataChanged(data: BalloonDataSum) {
    const event = new CustomEvent<BalloonDataSum>('balloonDataChanged', {
        detail: data,
    })

    document.dispatchEvent(event)
}

export async function addBalloonMsg(msg: string, index: number) {
    console.log('addBalloonMsg', msg, index)

    // Validation
    if (msg === '' || msg === undefined || index === undefined) {
        console.error('validation failed')
        return
    }

    // Check if key already exists
    const key = indexMap.get(index)
    if (!key) {
        console.error('key not found')
        return
    }

    const balloonSum = await GM.getValue<BalloonDataSum | null>(key, null)

    if (!balloonSum) {
        alert('방송 시작 시간을 가져오는데 오류가 발생했습니다.')
        return
    }

    balloonSum.message.push(msg)

    await GM.setValue(key, balloonSum)

    indexMap.delete(index)

    console.log(`message added: ${msg}`)

    emitBalloonDataChanged(balloonSum)
}

export async function addBalloon(balloon: Balloon) {
    const startTime = await Utils.getTimeValue(LAST_SAVE_TIME)
    if (!startTime) {
        alert('방송 시작 시간을 가져오는데 오류가 발생했습니다.')
        return
    }

    const balloonTime = dayjs(balloon.timestamp)

    const key = BALLOON + balloon.uid

    const balloonSum = await GM.getValue<BalloonDataSum>(key, {
        uid: balloon.uid,
        nicknames: [],
        amountSum: 0,
        count: 0,
        message: [],
        timestamps: {},
    })

    // Check if key already exists
    if (balloon.timestamp in balloonSum.timestamps) {
        console.log('data already exists')
        return
    }

    if (balloonTime.isBefore(startTime)) {
        console.log('data is too old')
        return
    }

    // Add nickname if not already in array
    if (!balloonSum.nicknames.includes(balloon.nickname)) {
        balloonSum.nicknames.push(balloon.nickname)
    }

    // Add amount
    balloonSum.amountSum += balloon.amount

    // Add message
    if (balloon.message) {
        balloonSum.message.push(balloon.message)
    } else {
        // Add key to index map
        indexMap.set(balloon.idx, key)
    }

    // Add key
    balloonSum.timestamps[balloon.timestamp] = null

    balloonSum.count += 1

    // Save balloon
    await GM.setValue(key, balloonSum)

    // Save key if not already in array
    const keys = await GM.getValue<string[]>(BALLOON_KEYS, [])
    if (!keys.includes(key)) {
        keys.push(key)
    }
    await GM.setValue(BALLOON_KEYS, keys)

    console.log(`balloon ${balloon.uid}, ${balloonTime.format('YYYY-MM-DD HH:mm:ss')} ${balloon.message} added`)

    emitBalloonDataChanged(balloonSum)
}
