import * as puppeteer from 'puppeteer'
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config({ path: '../.env' });

 interface Users {
  id : number;
  username : string;
  description : string;
  tag : string;
}


export const twitterCrawler = async () => {
  const browser = await puppeteer.launch({ 
    headless: false,
    userDataDir: "../user_data"
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1280, height: 800,
    deviceScaleFactor: 1
  })
//   await page.goto('https://twitter.com/login',{
//     waitUntil: 'networkidle2'
//   });
//   const header = await page.$('header')
  // console.log(header);
  
//   if(header == null){
//     authentication(page);
//   }else{
    hashtagCrawler(page);
//   }


  // await autoScroll(page);

  // authentication(page, url);

  // wait till page load
  // await page.waitForNavigation()

  // await delay(4000);

  // await page.close();
  // await browser.close();
};

twitterCrawler();


function delay(time: number) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

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


async function authentication(page: puppeteer.Page){
  const user_name: any = process.env.TWITTER_USERNAME;
  const password: any = process.env.TWITTER_PASSWORD;

  await delay(2000);
  console.log('Page Loaded');

  console.log('Field Input: Username');
  await page.type('#layers input', user_name);
  await page.click('#layers div:nth-child(2) > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div:nth-child(6)');
  // For Firefox
  // await page.type('#layers > div:nth-child(2) > div > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div:nth-child(3) > div > label > div > div:nth-child(2) > div:nth-child(1) > input', password);

  await delay(2000);


  // For Chrome
  console.log('Field Input: Password');
  await page.type('#layers > div > div > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div:nth-child(3) > div > label > div > div:nth-child(2) > div:nth-child(1)', password);
  await page.click('#layers div:nth-child(2) > div > div > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div > div > div > div > div');

  // hashtag_crawler(page);
}
// TODO: Uncomment
async function fieldChecker(page:any , field:any){
  const text = await page.evaluate(elem => (<HTMLElement>elem).innerHTML, field[0]) as string;
  const removeClass = text.replace(/class="[a-zA-Z0-9:;\.\s\(\)\-\,]*"/g,"");
  const removeStyle = removeClass.replace(/style="[a-zA-Z0-9:;\.\s\(\)\-\,]*"/g,"");
  const removeSpan = removeStyle.replace(/<\/?span[^>]*>/g,"");
  return removeSpan;
}

async function hashtagChecker(page, field, hashtagJSON, count){
  const text = await page.evaluate(elem => (<HTMLElement>elem).innerHTML, field[0]) as string;
  const regex = new RegExp('('+hashtagJSON.hashtags[count].text+')', 'gi');
  const array = regex.exec(text);

  return array;
}

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

  const jsonString = fs.readFileSync('../../json/hashtag.json','utf-8',);
  const hashtagJSON = JSON.parse(jsonString);
  const hashtagLength = Object.keys(hashtagJSON.hashtags).length;

  console.log("hashtagJSON3");

  
  // const hashtagLength = Object.keys(hashtagJSON.hashtags).length;
  
  // console.log('Hashtag length: '+Object.keys(hashtagJSON.hashtags).length);

  for(let h=0; h<hashtagLength; h++){
    await page.goto('https://twitter.com/hashtag/'+hashtagJSON.hashtags[h].text+'?f=user',{
      waitUntil: 'networkidle2'
    });

    await delay(2500);
    
    const currentTimeline = await page.$$('div[aria-label="Timeline: Search timeline"] > div > div');
    // console.log(currentTimeline.length);
  
    // TODO: Evaluation and Regex needs to be moved into a Function.
    for(let i=1; i<=currentTimeline.length; i++){
      // TWITTER: Username Field
      const user = await page.$x('//div[@aria-label="Timeline: Search timeline"]/div/div['+i+']/div/div/div/div/div[2]/div[1]/div[1]/div/div[1]/a/div/div[1]/span');
      // const userText = await page.evaluate(elem => (<HTMLElement>elem).innerHTML, user[0]) as string;
      // const userRemoveClass = userText.replace(/class="[a-zA-Z0-9:;\.\s\(\)\-\,]*"/g,"");
      // const userRemoveStyle = userRemoveClass.replace(/style="[a-zA-Z0-9:;\.\s\(\)\-\,]*"/g,"");
      // const userRemoveSpan = userRemoveStyle.replace(/<\/?span[^>]*>/g,"");
      // const userRegex = new RegExp('('+hashtagJSON.hashtags[h].text+')', 'gi');
      // const userArray = userRegex.exec(userText);


      let username = fieldChecker(page, user);
    //   username.then(function(result) {
    //     username = result 
    //   })
      const userArray = hashtagChecker(page, user, hashtagJSON, h);
      

      // TWITTER: Tag Field
      const [tag] = await page.$x('//div[@aria-label="Timeline: Search timeline"]/div/div['+i+']/div/div/div/div/div[2]/div[1]/div[1]/div/div[2]/div/a/div/div/span');
      const tagText = await tag.getProperty('textContent');
      const tagName: any = await tagText.jsonValue();
      const tagRegex = new RegExp('('+hashtagJSON.hashtags[h].text+')', 'gi');
      const tagArray = tagRegex.exec(tagName);

      // TWITTER: Description Field
      const desc = await page.$x('//div[@aria-label="Timeline: Search timeline"]/div/div['+i+']/div/div/div/div/div[2]/div[2]');
      // const descriptionText = await page.evaluate(elem => (<HTMLElement>elem).innerHTML, description[0]) as string;

      // const descRemoveClass = descriptionText.replace(/class="[a-zA-Z0-9:;\.\s\(\)\-\,]*"/g,"");
      // const descRemoveStyle = descRemoveClass.replace(/style="[a-zA-Z0-9:;\.\s\(\)\-\,]*"/g,"");
      // const descRemoveSpan = descRemoveStyle.replace(/<\/?span[^>]*>/g,"");
      
      // const descriptionRegex = new RegExp('('+hashtagJSON.hashtags[h].text+')', 'gi'); 
      // const descriptionArray = descriptionRegex.exec(descriptionText);

      const description = fieldChecker(page, desc);
      description.then(function(result) {
        console.log(result) // "Some User token"
      })
      const descriptionArray = hashtagChecker(page, desc, hashtagJSON, h);

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
        "profileImage": '',
        "tag" : tagName,
        "hashtag": hashtag
      }];

      console.log(Users)
    }

    

    

  }
}


