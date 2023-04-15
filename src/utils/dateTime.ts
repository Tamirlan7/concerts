export function getFormattedDate(date: string) {
    return date.substring(0, 10)
    // форматирует дату вот так: 2021-10-01T02:30:00Z -> 01-10-2021
}


export function getFormattedTime(date: string) {
        return date.substring(11, 16)
        // форматирует время вот так: 2021-10-01T02:30:00Z -> 02:30
} 
