interface BalloonData {
    timestamp: string
    countData: BalloonCountData
    userData: User
}

interface HelperData {
    timestamp: string
    countData: BalloonCountData
    userData: User
    msgData: UserBalloonMsgData
}

interface MixedData {
    countData: BalloonCountData
    userData: User
    msgData: UserBalloonMsgData
}

interface BalloonCountData {
    [key: string]: number
}

interface User {
    [key: string]: string[]
}

interface UserBalloonMsgData {
    [key: string]: string[]
}
