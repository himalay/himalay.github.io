export default (json: string) => json.replace(/"[^"]+"|(\s)/gm, (matched, group1) => (!group1 ? matched : ''))
// Explanation of the regex above: https://stackoverflow.com/a/23667311
