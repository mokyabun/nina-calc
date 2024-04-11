export function userSorter(data: User) {
    // Sort by first nickname alphabetically
    const sortedUserData: User = {}

    Object.entries(data).sort(([, a], [, b]) => a[0].localeCompare(b[0])).forEach(([id, nickname]) => {
        sortedUserData[id] = nickname
    })

    return sortedUserData
}
