export type sortType = 'asc' | 'desc'

export interface Sub {
    uid: string
    nickname: string
    month: number
    timestamp: number
}

export interface Balloon {
    idx: number
    uid: string
    nickname: string
    amount: number
    timestamp: number
    message: string
}

export interface BalloonDataSum {
    uid: string
    nicknames: string[]
    amountSum: number
    count: number
    message: string[]
    timestamps: { [key: number]: null }
}

export const cmdType = {
    SENDBALLOON: 'star',
    SENDBALLOONSUB: 'star',
    ADBALLOON: 'star',
    VODBALLOON: 'star',
    VIDEOBALLOON: 'star',
    SENDFANLETTER: 'star',
    SENDFANLETTERSUB: 'star',
    CHOCOLATE: 'star',
    CHOCOLATESUB: 'star',
    FOLLOW_ITEM: 'afsubscription',
    FOLLOW_ITEM_EFFECT: 'afsubscription',
    up: 'afup',
    SENDPUNGBALLOON: 'afpung',
    SENDPUNGBALLOONSUB: 'afpung',
}
