function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function formatSeconds(timeStamp) {
    let time = timeStamp;
    if (time < 60) {
        time = parseFloat(timeStamp).toFixed(0);
        return time + ' ' + 's';
    }
    else {
        time = parseFloat(timeStamp / 60).toFixed(2);
        const mn = time.split('.')[0];
        const s = (time.split('.')[1] / 10) * 60
        return mn + 'mn ' + s + 's'
    }
}

export { formatBytes, formatSeconds}