import { fieldCheck, hashtagCheck } from '../utils/checkers';
import {
    labelNaming,
    outputID,
    outputUser,
    outputDesc,
    outputTag
} from './color'
import delay from './delay';



export async function extractUsername(page, hashtagJSON, h, i){
    try{
        await delay(500);
        console.log(labelNaming(`NR:`) + outputID(` #${i}`));
        const user = await page.$x('//div[@aria-label="Timeline: Search timeline"]/div/div['+i+']/div/div/div/div/div[2]/div[1]/div[1]/div/div[1]/a/div/div[1]/span');
        const username = await fieldCheck(page, user);
        const userArray = hashtagCheck(page, user, hashtagJSON, h);
        console.log(labelNaming('Username:') + ' ' + outputUser(username));
        return [username, userArray] as const;
    } catch(err){
        console.log(err);
        return [null, null] as const; 
    }
}

export async function extractDescription(page, hashtagJSON, h, i){
    try{
        console.log(labelNaming(`NR:`) + outputID(` #${i}`));
        const desc = await page.$x('//div[@aria-label="Timeline: Search timeline"]/div/div['+i+']/div/div/div/div/div[2]/div[2]');
        const description = await fieldCheck(page, desc);
        const descriptionArray = hashtagCheck(page, desc, hashtagJSON, h);
        console.log(labelNaming('Description:') + ' ' + outputDesc(description));
        return [description, descriptionArray] as const;
    }catch(err){
        console.log(err);
        return [null, null] as const; 
    }
}
    

export async function extractTag(page, hashtagJSON, h, i){
    try{
        console.log(labelNaming(`NR:`) + outputID(` #${i}`));
        const [tag] = await page.$x('//div[@aria-label="Timeline: Search timeline"]/div/div['+i+']/div/div/div/div/div[2]/div[1]/div[1]/div/div[2]/div/a/div/div/span');
        const tagText = await tag.getProperty('textContent');
        const tagName: any = await tagText.jsonValue();
        const tagRegex = new RegExp('('+hashtagJSON.hashtags[h].text+')', 'gi');
        const tagArray = tagRegex.exec(tagName);
        console.log(labelNaming('Tag:') + ' ' + outputTag(tagName));
        return [tagName, tagArray] as const;
    } catch(err){
        console.log(err);
        return [null, null] as const; 
    }
}

export async function extractIcon(page){
    try{
        const ico = await page.$x('//div[@aria-label="Timeline: Search timeline"]/div/div[1]/div/div/div/div/div[1]/div/div/div[2]/div/div[2]/div/a/div[3]/div/div[2]/div');
        const icon = await fieldCheck(page, ico);
        return icon;
    }catch (err){
        console.log(err);
        return null; 
    }
}