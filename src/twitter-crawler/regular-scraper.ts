import * as puppeteer from 'puppeteer'
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import delay from '../utils/delay'
import { fieldCheck, hashtagCheck } from '../utils/checkers';

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

// async function autoScroll(page){
//   await page.evaluate(async () => {
//       await new Promise((resolve, reject) => {
//           var totalHeight = 0;
//           var distance = 100;
//           var timer = setInterval(() => {
//               var scrollHeight = document.body.scrollHeight;
//               window.scrollBy(0, distance);
//               totalHeight += distance;

//               if(totalHeight >= scrollHeight - window.innerHeight){
//                   clearInterval(timer);
//                   resolve();
//               }
//           }, 100);
//       });
//   });
// }

// TODO: Uncomment





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
  const jsonString = fs.readFileSync('../../json/hashtag.json','utf-8',);
  const hashtagJSON = JSON.parse(jsonString);
  const hashtagLength = Object.keys(hashtagJSON.hashtags).length;

  for(let h=0; h<hashtagLength; h++){
    await page.goto('https://twitter.com/hashtag/'+hashtagJSON.hashtags[h].text+'?f=user',{
      waitUntil: 'networkidle2'
    });

    await delay(2500);

    const currentTimeline = await page.$$('div[aria-label="Timeline: Search timeline"] > div > div');
  
    // TODO: Evaluation and Regex needs to be moved into a Function.
    // for(let i=1; i<=currentTimeline.length; i++){
    for(let i=1; i<=1; i++){
      // TWITTER: Username Field
      const user = await page.$x('//div[@aria-label="Timeline: Search timeline"]/div/div['+i+']/div/div/div/div/div[2]/div[1]/div[1]/div/div[1]/a/div/div[1]/span');
      const username = await fieldCheck(page, user);
      const userArray = hashtagCheck(page, user, hashtagJSON, h);
      
      // TWITTER: Tag Field
      const [tag] = await page.$x('//div[@aria-label="Timeline: Search timeline"]/div/div['+i+']/div/div/div/div/div[2]/div[1]/div[1]/div/div[2]/div/a/div/div/span');
      const tagText = await tag.getProperty('textContent');
      const tagName: any = await tagText.jsonValue();
      const tagRegex = new RegExp('('+hashtagJSON.hashtags[h].text+')', 'gi');
      const tagArray = tagRegex.exec(tagName);

      // TWITTER: Description Field
      const desc = await page.$x('//div[@aria-label="Timeline: Search timeline"]/div/div['+i+']/div/div/div/div/div[2]/div[2]');
      const description = await fieldCheck(page, desc);
      const descriptionArray = hashtagCheck(page, desc, hashtagJSON, h);

      // TWITTER: Icon Field
      const ico = await page.$x('//div[@aria-label="Timeline: Search timeline"]/div/div[1]/div/div/div/div/div[1]/div/div/div[2]/div/div[2]/div/a/div[3]/div/div[2]/div');
      const icon = await fieldCheck(page, ico);

      let hashtag = '';
      if(userArray != null || descriptionArray != null || tagArray != null){
        hashtag = hashtagJSON.hashtags[h].text;
      }else{
        hashtag = 'no';
      }


      const Users = [{
        'id':i,
        "username": username,
        "description" : description,
        "icon": icon,
        "tag" : tagName,
        "hashtag": hashtag
      }];
      console.log(Users)
    }
  }
}