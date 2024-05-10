import { beforeEach, describe, it } from 'vitest'
import type { Balloon } from '../types'
import dayjs from 'dayjs'
import { addBalloon, addBalloonMsg } from './balloon'
import { BALLOON, LAST_SAVE_TIME } from './constants'
import { GM } from '$'

describe('balloon', async () => {
    beforeEach(async () => {
        await GM.setValue(LAST_SAVE_TIME, dayjs().unix())
    })

    it('check adding balloon', async () => {
        const time = dayjs().unix() + 1000

        // Add balloon
        const data: Balloon = {
            idx: 0,
            uid: 'test',
            nickname: 'test',
            amount: 10,
            timestamp: time,
            message: 'test',
        }

        await addBalloon(data)

        // Add balloon
        const data2: Balloon = {
            idx: 1,
            uid: 'test',
            nickname: 'test',
            amount: 10,
            timestamp: dayjs().add(1, 'day').unix(),
            message: 'test2',
        }

        await addBalloon({
            idx: 2,
            uid: 'test',
            nickname: 'test',
            amount: 10,
            timestamp: dayjs().add(1, 'day').unix(),
            message: '',
        })

        await addBalloonMsg('added message', 2)

        // Add same balloon
        await addBalloon(data)

        console.log(await GM.getValue(BALLOON + data.uid, null))
    })
})
