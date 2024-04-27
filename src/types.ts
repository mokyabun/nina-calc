export interface BalloonSaveData {
    timestamp: string
    balloonData: BalloonData[]
}

export interface BalloonSingleData {
    uid: string
    nickname: string
    balloonAmount: number
    index: number // smallest index is the latest
    message?: string
}

export interface BalloonData {
    uid: string
    nicknames: string[]
    balloonAmountSum: number
    balloonAverage: number
    balloonCount: number
    minIndex: number
    messageData?: string[]
}

export type sortType = 'asc' | 'desc' | 'latest' | 'oldest' | 'random'

/*
!!! Legacy stuffs !!!
 */

export interface LegBalloonData {
    timestamp: string
    countData: BalloonCountData
    userData: Users
}

export interface AfHelperData {
    timestamp: string
    countData: BalloonCountData
    userData: Users
    msgData: UserBalloonMsgData
}

export interface MixedData {
    timestamp: string
    countData: BalloonCountData
    userData: Users
    msgData: UserBalloonMsgData
}

export interface BalloonCountData {
    [key: string]: number
}

export interface Users {
    [key: string]: string[]
}

export interface UserBalloonMsgData {
    [key: string]: string[]
}
