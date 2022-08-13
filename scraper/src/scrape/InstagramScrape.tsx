const puppeteer = require("puppeteer");

export async function instagramScrape() {
  try {
    let likeCount = 0;
    const URL = "https://www.instagram.com/accounts/login/?";
    //const TAG_URL = `https://www.instagram.com/explore/tags/${tag}`;
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 720 });
    await page.goto(URL);
    await page.waitFor(2000);
    await page.type('input[name="username"]', "username");
    await page.type('input[name="password"]', "password");

    await Promise.all([
      await page.click('button[type="submit"]'),
      page.waitForNavigation(),
    ]);

    const tags = ["鎌倉", "kamakura"];

    for (let i = 0; i < tags.length; i++) {
      await page.goto(`https://www.instagram.com/explore/tags/${tags[i]}`);
      //await page.goto(`https://www.instagram.com/explore/tags/${tags[i]}`), { waitUntil: "networkidle2" };
      await page.waitFor(1000);

      await page.waitForSelector(
        'article > div:nth-child(3) img[decoding="auto"]'
      );

      let posts = page.$$('article > div:nth-child(3) img[decoding="auto"]');

      for (let j = 0; j < 50; i++) {
        let post = posts[i];

        await post.click();

        await page.waitFor('[style="overflow: hidden;"]');
        await page.waitFor(1000);

        let likeButton = await page.$(
          'span[class^="glyphsSpriteHeart__outline"]'
        );

        if (likeButton) {
          await likeButton.click();
          likeCount = likeCount + 1;
          console.log("Post Liked");
        }
        await page.waitFor(1000);

        let closeModalButton = await page.$x(
          '//button[contains(text(), "Close")]'
        );

        await closeModalButton[0].click();

        await page.waitFor(2000);
      }

      await page.waitFor(1000);
    }
  } catch (error) {
    console.error(error);
  }
}

instagramScrape();
