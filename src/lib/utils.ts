import { GM } from '$'
import dayjs, { Dayjs } from 'dayjs'
import { BALLOON_KEYS } from './constants'
import type { BalloonDataSum, sortType } from '../types'

export namespace Utils {
    export async function getTimeValue(key: string, defaultValue: Dayjs | null = null) {
        const value = await GM.getValue<string | null>(key, null)

        if (!value) {
            return defaultValue
        }

        return dayjs(value)
    }

    export async function getAllBalloons() {
        const keys = await GM.getValue<string[]>(BALLOON_KEYS, [])

        const balloons = await Promise.all(
            keys.map(async (key) => {
                return await GM.getValue<BalloonDataSum | null>(key, null)
            }),
        )

        return balloons
    }

    export async function deleteAllBalloons() {
        const keys = await GM.getValue<string[]>(BALLOON_KEYS, [])

        await Promise.all(
            keys.map(async (key) => {
                await GM.deleteValue(key)
            }),
        )

        await GM.deleteValue(BALLOON_KEYS)
    }

    export function sortData(data: { [key: string]: BalloonDataSum }, type: sortType) {
        switch (type) {
            case 'asc':
                return Object.values(data).sort((a, b) => {
                    return a.nicknames[0].localeCompare(b.nicknames[0])
                })
            case 'desc':
                return Object.values(data).sort((a, b) => {
                    return b.nicknames[0].localeCompare(a.nicknames[0])
                })
        }
    }
}
