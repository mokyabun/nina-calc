import type {BalloonSaveData, sortType} from "../types";

export function sortData(data: BalloonSaveData, type: sortType) {
    switch (type) {
        case "asc":
            return data.balloonData.sort((a, b) => a.nicknames[0].localeCompare(b.nicknames[0]))
        case "desc":
            return data.balloonData.sort((a, b) => b.nicknames[0].localeCompare(a.nicknames[0]))
        case "latest":
            return
        case "oldest":
            return data.balloonData.reverse()
        case "random":
            return data.balloonData.sort(() => 0.5 - Math.random())
    }
}