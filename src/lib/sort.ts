import type {sortType, User} from "../types";

export function userSorter(data: User, type: sortType) {
    // Sort by first nickname alphabetically
    const sortedUserData: User = {}

    switch (type) {
        case "asc":
            Object.entries(data).sort(([, a], [, b]) => a[0].localeCompare(b[0])).forEach(([id, nickname]) => {
                sortedUserData[id] = nickname
            })
            break;
        case "desc":
            Object.entries(data).sort(([, a], [, b]) => b[0].localeCompare(a[0])).forEach(([id, nickname]) => {
                sortedUserData[id] = nickname
            })
            break;
        case "latest":
            return data
        case "oldest":
            Object.entries(data).reverse().forEach(([id, nickname]) => {
                sortedUserData[id] = nickname
            })
            break;
        case "random":
            const keys = Object.keys(data)
            const shuffledKeys = keys.sort(() => 0.5 - Math.random())
            shuffledKeys.forEach(key => {
                sortedUserData[key] = data[key]
            })
            break;
    }

    return sortedUserData
}
