import * as puppeteer from 'puppeteer'
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import delay from '../utils/delay'
import { autoScroll } from '../utils/autoscroll'
import { extractUsername, 
        extractDescription, 
        extractTag, 
        extractIcon } from '../utils/extractors';

dotenv.config({ path: '../.env' });

interface Users {
  id : number;
  username : string;
  description : string;
  tag : string;
}

(async () => {
  const browser = await puppeteer.launch({ 
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    userDataDir: "../user_data"
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1280, height: 800,
    deviceScaleFactor: 1
  })
    hashtagCrawler(page);
})();


async function hashtagCrawler(page: puppeteer.Page){
  // let hashtagJSON;
  // console.log("hashtagJSON1");
  // client.connect((err: Error) => {
  //   if (err) throw err;
  //   const dbo = client.db(db)
  //   console.log("hashtagJSON2");
  //   dbo.collection("hashtag").findOne({}, function(err: Error, result: string) {
  //     if (err) throw err;
  //     hashtagJSON = JSON.parse(result);
  //     console.log(result);
  //     // result.hashtags.map(function(element){
  //     //   console.log(element.text);
  //     // });
  //     client.close();
  //   });
  // });

  // * This example is only used for local files. It will be moved to the Database
  const jsonString = fs.readFileSync('../../json/hashtag.json','utf-8');
  const hashtagJSON = JSON.parse(jsonString);
  const hashtagLength = Object.keys(hashtagJSON.hashtags).length;

  // for(let h=0; h<hashtagLength; h++){
  for(let h=0; h<1; h++){
    await page.goto('https://twitter.com/hashtag/'+hashtagJSON.hashtags[h].text+'?f=user',{
      waitUntil: 'networkidle2'
    });

    await delay(2500);

    const currentTimeline = await page.$$('div[aria-label="Timeline: Search timeline"] > div > div');
  
    // TODO: Evaluation and Regex needs to be moved into a Function.
    // for(let i=1; i<=currentTimeline.length; i++){
    for(let i=1; i<=1; i++){
      const [username, userArray] = await extractUsername(page, hashtagJSON, h, i);
      const [tagName, tagArray] = await extractTag(page, hashtagJSON, h, i);
      const [description, descriptionArray] = await extractDescription(page, hashtagJSON, h, i);
      const icon = await extractIcon(page);

      let hashtag: string;
      if(userArray != null || descriptionArray != null || tagArray != null){
        hashtag = hashtagJSON.hashtags[h].text;
      }else{
        hashtag = 'no';
      }

      const Users = [{
        "id":i,
        "username": username,
        "description" : description,
        "icon": icon,
        "tag" : tagName,
        "hashtag": hashtag
      }];

      console.log(Users)
    }
    autoScroll(page);
  }
}