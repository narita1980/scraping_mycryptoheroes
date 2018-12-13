const puppeteer = require('puppeteer')

async function sleep(delay) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

!(async() => {
  try {
    const browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    })
    const page = await browser.newPage()
    await page.goto('https://www.mycryptoheroes.net/market/trade/extensions')

    // 擬似的にスクロールさせてすべてのヒーローを表示させる
    await page._client.send(
      'Input.synthesizeScrollGesture',
      {
        x: 400,
        y: 400,
        xDistance: 0,
        yDistance: -10000,
      }
    );

    const rows = await page.$$("div.tradeExtensionsPage > div > a")
    for (const row of rows) {
      let param = await row.$('div > span:nth-child(1)')
      process.stdout.write(await (await param.getProperty('textContent')).jsonValue())
      process.stdout.write('\t')

      param = await row.$('div > span:nth-child(2)')
      process.stdout.write(await (await param.getProperty('textContent')).jsonValue())
      process.stdout.write('\t')

//      param = await row.$('img')
//      process.stdout.write(await (await param.getProperty('textContent')).jsonValue())
//      process.stdout.write('\t')

      param = await row.$('h3')
      process.stdout.write(await (await param.getProperty('textContent')).jsonValue())
      process.stdout.write('\t')

      param = await row.$('p > span:nth-child(1)')
      process.stdout.write(await (await param.getProperty('textContent')).jsonValue())
      process.stdout.write('\t')

      param = await row.$('p > span:nth-child(2)')
      process.stdout.write(await (await param.getProperty('textContent')).jsonValue())
      process.stdout.write('\t')

      process.stdout.write('\n')
    }
  
    browser.close()
  } catch(e) {
    console.error(e)
  }
})()
