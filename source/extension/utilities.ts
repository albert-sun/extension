// https://stackoverflow.com/questions/24558442/is-there-something-like-glob-but-for-urls-in-javascript
export function urlGlob(pattern: string, input: string) {
    var re = new RegExp(pattern.replace(/([.?+^$[\]\\(){}|\/-])/g, "\\$1").replace(/\*/g, '.*'));
    return re.test(input);
}

// Decodes the queue code to the number of milliseconds
export function decodeQueue(queueCode: string) {
    const splitCode = queueCode.split("-");
    const parsedCode = splitCode.map(chunk => parseInt(chunk, 16));
    // if(parsedCode[1] * parsedCode[2] * parsedCode[3] === parsedCode[4])
    const waitDuration = 100 * 10 * parseInt(splitCode[2] + splitCode[3], 16) / parsedCode[1];
    
    return waitDuration;
}

// Calculates the number of minutes and seconds for queue
export function minutesSeconds(totalMilliSeconds: number): [number, number] {
    const totalSeconds = totalMilliSeconds / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return [minutes, seconds]
}