export interface BalloonData {
    timestamp: string
    countData: BalloonCountData
    userData: User
}

export interface HelperData {
    timestamp: string
    countData: BalloonCountData
    userData: User
    msgData: UserBalloonMsgData
}

export interface MixedData {
    countData: BalloonCountData
    userData: User
    msgData: UserBalloonMsgData
}

export interface BalloonCountData {
    [key: string]: number
}

export interface User {
    [key: string]: string[]
}

export interface UserBalloonMsgData {
    [key: string]: string[]
}

export type sortType = 'asc' | 'desc' | 'latest' | 'oldest' | 'random'
