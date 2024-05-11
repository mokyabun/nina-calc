import type { Sub } from '../types'
import { Utils } from './utils'
import { LAST_SAVE_TIME, SUB, SUB_KEYS } from './constants'
import dayjs from 'dayjs'
import { GM } from '$'

function emitSubDataChanged(data: Sub) {
    const event = new CustomEvent<Sub>('subDataChanged', {
        detail: data,
    })

    document.dispatchEvent(event)
}

export async function addSub(sub: Sub) {
    const key = SUB + sub.uid
    const keys = await GM.getValue<string[]>(SUB_KEYS, [])

    // Check if key already exists
    if (keys.includes(sub.uid)) {
        console.log('data already exists')
        return
    }

    // Check if data is too old
    const startTime = await Utils.getTimeValue(LAST_SAVE_TIME)
    if (!startTime) {
        alert('방송 시작 시간을 가져오는데 오류가 발생했습니다.')
        return
    }
    const subTime = dayjs(sub.timestamp)
    if (subTime.isBefore(startTime)) {
        console.log('data is too old')
        return
    }

    // Save sub
    await GM.setValue(key, sub)

    // Add sub uid to SUB_KEYS
    keys.push(sub.uid)
    await GM.setValue(SUB_KEYS, keys)

    console.log(`sub ${sub.uid}, ${sub.timestamp} added`)

    emitSubDataChanged(sub)
}
