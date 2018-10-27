import * as fs from 'fs';

export const logger = (val:any) => {
  console.log(val);
}

export const readFileLineByLine = (pathToFile: string) => {
  const arr = fs.readFileSync(pathToFile).toString().split('\n');
  return arr.filter((entry) => entry !== '');
}

export const getProviderOfLink = (link: string) => {
  // check for youtube
  if (link.indexOf('youtube') > -1 || link.indexOf('youtu.be') > -1) {
    return 'Youtube';
  }
  // check for bandcamp
  if (link.indexOf('bandcamp') > -1) {
    return 'Bankcamp';
  }
  logger(`Unknown Provider found at ${link}`);
  return 'unknown';
}