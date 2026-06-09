const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set viewport to mobile
  await page.setViewportSize({ width: 400, height: 800 });
  
  console.log('Navigating to page...');
  await page.goto('http://localhost:3001/servicios');
  
  // Wait for the carousel track to be visible
  await page.waitForSelector('.services-carousel-track');
  
  console.log('Initial slide HTML of track:');
  let trackHTML = await page.locator('.services-carousel-track').innerHTML();
  console.log(trackHTML.substring(0, 500) + '...\n');
  
  // Scroll down to the services section so that trigger actions can execute if they depend on scroll
  await page.evaluate(() => window.scrollBy(0, 800));
  await page.waitForTimeout(500);
  
  // Slide to index 1 (Custodios)
  console.log('Clicking Next to go to Slide 1 (Custodios)...');
  await page.click('.carousel-arrow-btn >> text=chevron-right'); // wait, the icon is fontawesome, so let's select button by class
  // Let's click the next button. In our page, the second arrow button is the next button.
  const nextButtons = await page.$$('.carousel-arrow-btn');
  if (nextButtons.length >= 2) {
    await nextButtons[1].click();
  } else {
    console.log('Could not find next button by index!');
  }
  await page.waitForTimeout(600);
  
  // Slide to index 2 (Intramuros)
  console.log('Clicking Next to go to Slide 2 (Intramuros)...');
  if (nextButtons.length >= 2) {
    await nextButtons[1].click();
  }
  await page.waitForTimeout(1000); // wait extra time for animation
  
  // Get outerHTML and inline styles of the three child divs of the track
  const childrenInfo = await page.evaluate(() => {
    const track = document.querySelector('.services-carousel-track');
    if (!track) return [];
    return Array.from(track.children).map((child, idx) => {
      const card = child.querySelector('.service-card');
      return {
        index: idx,
        tagName: child.tagName,
        className: child.className,
        style: child.getAttribute('style'),
        opacity: window.getComputedStyle(child).opacity,
        display: window.getComputedStyle(child).display,
        transform: window.getComputedStyle(child).transform,
        width: child.getBoundingClientRect().width,
        height: child.getBoundingClientRect().height,
        hasCard: !!card,
        cardHTML: card ? card.outerHTML.substring(0, 150) + '...' : 'none'
      };
    });
  });
  
  console.log('Carousel Track Children State:');
  console.log(JSON.stringify(childrenInfo, null, 2));
  
  await browser.close();
})();
