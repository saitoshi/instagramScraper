const puppeteer = require("puppeteer");
const fs = require("fs");

async function scrape() {
  const userID = "#";
  const passWord = "#";
  const url = "https://www.instagram.com/accounts/login/";
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  this.page.setViewport({ width: 1500, height: 764 });
  await page.goto(url);

  await this.page.click(this.config.selectors.username_field);
  await this.page.keyboard.type(userID);
  await this.page.click(this.config.selectors.password_field);
  await this.page.keyboard.type(passWord);
  await this.page.click(this.config.selectors.login_button);
  await this.page.waitForNavigation();
  // Add a wait for some selector on the home page to load to ensure the next step works correctly
  await page.pdf({ path: "page.pdf", format: "A4" });
  await browser.close();
}

async function likePost(tag) {
  for (let i = 1; i < 4; i++) {
    for (let j = 1; j < 4; j++) {
      let br = false;
      await page
        .click(
          `${parentClass} > div > div > .Nnq7C:nth-child(${i}) > .v1Nh3:nth-child(${j}) > a`
        )
        .catch((e) => {
          console.log(e.message);
          br = true;
        });
      await page.waitFor(2250 + Math.floor(Math.random() * 250)); //wait for random amount of time
      if (br) continue; //if successfully selecting post continue

      let notLiked = await page.$(this.config.selectors.post_heart_grey);
    }
  }
}
