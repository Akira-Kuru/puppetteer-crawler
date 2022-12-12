import { fieldCheck, hashtagCheck } from '../utils/checkers';

export async function extractUsername(page, hashtagJSON, h, i){
    const user = await page.$x('//div[@aria-label="Timeline: Search timeline"]/div/div['+i+']/div/div/div/div/div[2]/div[1]/div[1]/div/div[1]/a/div/div[1]/span');
    const username = await fieldCheck(page, user);
    const userArray = hashtagCheck(page, user, hashtagJSON, h);
    return [username, userArray] as const;
}

export async function extractDescription(page, hashtagJSON, h, i){
    const desc = await page.$x('//div[@aria-label="Timeline: Search timeline"]/div/div['+i+']/div/div/div/div/div[2]/div[2]');
    const description = await fieldCheck(page, desc);
    const descriptionArray = hashtagCheck(page, desc, hashtagJSON, h);
    return [description, descriptionArray] as const;
}

export async function extractTag(page, hashtagJSON, h, i){
    const [tag] = await page.$x('//div[@aria-label="Timeline: Search timeline"]/div/div['+i+']/div/div/div/div/div[2]/div[1]/div[1]/div/div[2]/div/a/div/div/span');
    const tagText = await tag.getProperty('textContent');
    const tagName: any = await tagText.jsonValue();
    const tagRegex = new RegExp('('+hashtagJSON.hashtags[h].text+')', 'gi');
    const tagArray = tagRegex.exec(tagName);
    return [tagName, tagArray] as const;
}

export async function extractIcon(page){
    const ico = await page.$x('//div[@aria-label="Timeline: Search timeline"]/div/div[1]/div/div/div/div/div[1]/div/div/div[2]/div/div[2]/div/a/div[3]/div/div[2]/div');
    const icon = await fieldCheck(page, ico);
    return icon;
}