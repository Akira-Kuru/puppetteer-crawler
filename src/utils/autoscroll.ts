export async function autoScroll(page){
    const prevHeight = await page.evaluate('document.body.scrollHeight');
    await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
    await page.waitForNavigation(`document.body.scrollHeight > ${prevHeight}`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
}