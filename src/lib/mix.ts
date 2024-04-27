import type {BalloonSaveData} from "../types";

export function mixData(afData: BalloonSaveData, afhpData: BalloonSaveData): BalloonSaveData {
    for (const af of afData.balloonData) {
        af.messageData = afhpData.balloonData.find(afhpDataBalloon => af.uid === afhpDataBalloon.uid)?.messageData
    }

    return afData
}