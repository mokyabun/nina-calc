export interface BalloonSaveData {
    timestamp: string
    balloonData: BalloonData[]
    subData?: SubSingleData[]
}

export interface SubSingleData {
    uid: string
    nickname: string
    month: number
}

export interface BalloonSingleData {
    uid: string
    nickname: string
    balloonAmount: number
    message?: string
}

export interface BalloonData {
    uid: string
    nicknames: string[]
    balloonAmountSum: number
    balloonCount: number
    messageData?: string[]
}

export type sortType = 'asc' | 'desc' | 'latest' | 'oldest' | 'random'