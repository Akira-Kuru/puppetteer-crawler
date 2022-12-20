import * as puppeteer from 'puppeteer'
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import delay from '../utils/delay'
// import { autoScroll } from '../utils/autoscroll'
import { 
    extractUsername, 
    extractDescription, 
    extractTag, 
    extractIcon 
} from '../utils/extractors';

dotenv.config({ path: '../.env' });

interface Users {
  id : number;
  // username : string;
  // description : string;
  // icon : string;
  tag : string;
  hashtag: string;
  // createdAt: Date;
  // updatedAt: Date;
}

(async () => {
  const browser = await puppeteer.launch({ 
    headless: false,
    // args: [
    //   '--no-sandbox', 
    //   '--disable-setuid-sandbox'
    // ],
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-infobars',
      '--window-size=1366,768',
      '--unlimited-storage',
      '--full-memory-crash-report',
      '--disable-dev-shm-usage',
      '--force-gpu-mem-available-mb',
      '--disable-gpu'
    ],
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
  // // result.hashtags.map(function(element){
  // //   console.log(element.text);
  // // });
  //     client.close();
  //   });
  // });

  // * This example is only used for local files. It will be moved to the Database
  const jsonString = fs.readFileSync('../../json/hashtag.json','utf-8');
  const hashtagJSON = JSON.parse(jsonString);
  const hashtagLength = Object.keys(hashtagJSON.hashtags).length;
  let data: string;

  for(let h=0; h<hashtagLength; h++){
  // for(let h=0; h<=1; h++){
    console.log(`CURRENT HASHTAG: ${hashtagJSON.hashtags[h].text}`);
    await page.goto('https://twitter.com/hashtag/'+hashtagJSON.hashtags[h].text+'?f=user',{
      waitUntil: 'networkidle2'
    });

    await delay(2500);
    const currentTimeline = await page.$$('div[aria-label="Timeline: Search timeline"] > div > div');

    if (!fs.existsSync('../../files/'+hashtagJSON.hashtags[h].text)){
      fs.mkdirSync('../../files/'+hashtagJSON.hashtags[h].text);
    }
    // await delay(2500);
    // TODO: Evaluation and Regex needs to be moved into a Function.
    for(let i=1; i<=currentTimeline.length; i++){
    // for(let i=1; i<=3; i++){
      const [tagName, tagArray] = await extractTag(page, hashtagJSON, h, i);
      let username;
      let userArray;
      let description;
      let descriptionArray;
      if(tagName !== null){
        [username, userArray] = await extractUsername(page, hashtagJSON, h, i);
        [description, descriptionArray] = await extractDescription(page, hashtagJSON, h, i);
      }else{
        username = null;
        description = null;
        userArray = null;
        descriptionArray = null;
      }
      
      // const icon = await extractIcon(page);
      // console.log('icon: '+icon);
      // await delay(500);


      let hashtag: string;
      // if(userArray !== null || descriptionArray !== null || tagArray !== null){
      // if(descriptionArray !== null || tagArray !== null){
        hashtag = hashtagJSON.hashtags[h].text;
      // }else{
      //   hashtag = 'no';
      // }

      const Users: Users = {
        'id':i,
        // "username": username,
        // "description" : description,
        // "icon": icon,
        "tag" : tagName,
        "hashtag": hashtag
        // createdAt: Date.now(),
        // updatedAt: Date.now()
      };
      data = JSON.stringify(Users);
      fs.writeFile(`../../files/${Users.hashtag}/${Users.id}-${Users.tag}.json`, data, err => {
        if (err) {
          throw err
        }
        console.log('JSON data is saved.')
      })
    }
    // autoScroll(page);
  }
  // fs.writeFileSync('./items.txt', items.join('\n') + '\n');
  // await page.waitForNavigation()
  // await page.close();
  // await browser.close();
}