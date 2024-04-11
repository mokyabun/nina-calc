export function mixData(balloonData: BalloonData, helperData: HelperData) {
    if (balloonData.timestamp !== helperData.timestamp) {
        const yes = confirm('서로 다른 날짜의 데이터입니다. 두 데이터를 합치시겠습니까?')

        if (!yes) {
            return
        }
    }

    return {
        countData: balloonData.countData,
        userData: balloonData.userData,
        msgData: helperData.msgData
    } as MixedData
}