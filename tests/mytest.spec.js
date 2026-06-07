//import{test,expect} from "@playwright/test";

//syntax
/*
test("title",()=>{
//step1
//step2
//step3

})
*/

//fixture - global variable eg page, browser 
//page is a subset of browser fixture has to wrap into {}
//
import { test, expect } from '@playwright/test';

test("Verify page title", async ({ page }) => {

  await page.goto("https://testautomationpractice.blogspot.com");

  const title = await page.title();
  console.log("Title:", title);

  await expect(page).toHaveTitle("Automation Testing Practice");

});