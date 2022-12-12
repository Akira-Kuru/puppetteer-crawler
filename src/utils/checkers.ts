export async function fieldCheck(page:any , field:any){
  const text = await page.evaluate(elem => (<HTMLElement>elem).innerHTML, field[0]) as string;
  const removeClass = text.replace(/class="[a-zA-Z0-9:;\.\s\(\)\-\,]*"/g,"");
  const removeStyle = removeClass.replace(/style="[a-zA-Z0-9:;\.\s\(\)\-\,]*"/g,"");
  const removeSpan = removeStyle.replace(/<\/?span[^>]*>/g,"");
  return removeSpan;
}

export async function hashtagCheck(page, field, hashtagJSON, count){
  const text = await page.evaluate(elem => (<HTMLElement>elem).innerHTML, field[0]) as string;
  const regex = new RegExp('('+hashtagJSON.hashtags[count].text+')', 'gi');
  const array = regex.exec(text);
  return array;
}