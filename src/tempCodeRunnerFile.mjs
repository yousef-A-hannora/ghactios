// import { PrismaClient } from '@prisma/client'
// import dotenv from "dotenv" 
// dotenv.config()
// const prisma = new PrismaClient()

// //Create a new user
// async function createUser(name,email,pass,role){
//   const user = await prisma.user.create({
//     data:{
//       name:name,
//       email:email,
//       password:pass,
//       role:role
//     },
//   });
//   console.log(user)
// }

// //Upgrade a user to be a vendore to
// async function upgradeUserToVendor(user,storeName,description) {
//   //select the user that going to be updated using name
//   const myuser = await prisma.user.findFirst(
//     {
//       where:{name:user}
//     }
//   )

//   //updating the user role form USER to VENDOR
//   await prisma.user.update({where:{id:myuser.id},data:{role:"VENDOR"}}) //prisma.upgrade return a promis not a user data

//   const userId =  myuser.id

//   //Adding the vendor information to the vendor table
//   const vendor = await prisma.vendor.create({
//     data:{
//       userId:userId,
//       storeName:storeName,
//       description:description,
//     },
//   })


//   console.log(vendor)
// }

// //Create a vendor from beganning 
// async function createUserVendor(name,email,pass,role,storeName,description){
//   //create a user and a vendor inside of it using vendorInfo(in the schema)
//   const user = await prisma.user.create({
//     data:{
//       name:name,
//       email:email,
//       password:pass,
//       role:role,
//       VendorInfo:{
//         create:{
//         storeName:storeName,
//         description:description
//       }
//     }
//     },
//   });
//   console.log(user)
// }

// //adding a new category to the gategotirs list
// async function CreateCategory(category) {
//   const cat = await prisma.category.create({
//     data:{
//       name:category
//     }
//   })
//   console.log("new category added")
//   console.log(cat)
// }

// //connect a product to a category (product can have many categories)
// async function addCategoryToProduct(productId,categoryId) {
//   const productCategory = await prisma.productCategory.create({
//     data:{
//       productId:productId,
//       categoryId:categoryId
//     }
//   })
//   console.log(`new product added with category: ${productCategory}`) 
// }

// //creating a new product and add evey thing to it
// async function createProduct(vendorId,name,description,price,stock,categories) {
//   const productstock = stock || 1
//   const categoriesIds = [...categories]

//   //creating the product itself
//   const product = await prisma.product.create({
//     data:{
//       name:name,
//       description:description,
//       price:price,
//       stock:productstock,
//       vendorId:vendorId
//     }
//   })

//   //start connecting the product to the spacified categories
//   categoriesIds.forEach(catId => {
//     addCategoryToProduct(product.id,catId)
//   });
// }

// //place order
// async function CreateOrder(userId,totalprice) {
//   const newOrder = await prisma.order.create({
//     data:{
//       userId:userId,
//       totalPrice:totalprice
//     }
//   })
//   console.log("new Order added")
//   console.log(newOrder)
// }

// //add item to cart
// async function addItemToCart(orderId,productId,quantity) {
//   const Quantity=quantity || 1
//   const newItem = await prisma.orderItem.create({
//     data:{
//       orderId:orderId,
//       productId:productId,
//       quantity:Quantity,
//       price:23.5
//     }
//   })
//   console.log("new item added")
//   console.log(newItem)
// }

// async function PlaceOrder(orderId) {
//   await prisma.order.update({
//     where:{id:orderId},
//     data:{status:"SHIPPED"}
//   })
//   console.log(`order no ${orderId} in it's way`)
// }
// async function CancelOrder(orderId) {
//   await prisma.order.update({
//     where:{id:orderId},
//     data:{status:"CANCELLED"}
//   })
//   console.log(`order no ${orderId} is canceled :( `)
// }


// async function getAllUsers() {
//   const allUsers = await prisma.user.findMany({
//     where:{ 
//       AND:[
//         {name:"Yousef3"},
//         {role:"VENDOR"}
//       ]
//     }
//   });
//   console.log(allUsers);
// }

// // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// //++++++++++++++++++++++ Creating items ++++++++++++++++++++++++++++++++
// // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// // createUser("Yousef3","hanotech@email.com","pass123","USER")
// // upgradeUserToVendor("Yousef3","hannoTech3","a cool store")
// // createUserVendor("Hamo","hamo@email.com","hamo123","VENDOR","hamostore","a store for hamo")
// // CreateCategory("cars")
// // CreateCategory("clothes")
// // CreateCategory("home")
// // CreateCategory("luxury")
// // createProduct(2,"all in one device","can do anything and everything",999.33,5,[1,3,4,5])
// // CreateOrder(2,300.9)
// // addItemToCart(2,2)

// // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// //++++++++++++++++++++++ updating items ++++++++++++++++++++++++++++++++
// // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// // placeOrder(2)


// // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// //++++++++++++++++++++++ Reading items ++++++++++++++++++++++++++++++++
// // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// getAllUsers()








import puppeteer from "puppeteer-core";

const URL = "https://www.booking.com/";
const BROWSER_WS = "wss://brd-customer-hl_aba51472-zone-scraping_browser3:pass123456789@brd.superproxy.io:9222";

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function toBookingTimestamp(date) {
  return date.toISOString().split('T')[0];
}

const search_text = "New York";
const now = new Date();
const check_in = toBookingTimestamp(addDays(now, 1));
const check_out = toBookingTimestamp(addDays(now, 2));

// This sample code searches Booking for acommodation in selected location
// and dates, then returns names, prices and rating for available options.

run(URL);

async function run(url) {
  console.log("Connecting to browser...");
  const browser = await puppeteer.connect({
    browserWSEndpoint: BROWSER_WS,
  });
  console.log("Connected! Navigate to site...");
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  console.log("Navigated! Waiting for popup...");
  await close_popup(page);
  await interact(page);
  console.log("Parsing data...");
  const data = await parse(page);
  console.log(`Data parsed: ${JSON.stringify(data, null, 2)}`);
  await browser.close();
}

async function close_popup(page) {
  try {
    const close_btn = await page.waitForSelector('[aria-label="Dismiss sign-in info."]', { timeout: 25000, visible: true });
    console.log("Popup appeared! Closing...");
    await close_btn.click();
    console.log("Popup closed!");
  } catch (e) {
    console.log("Popup didn't appear.");
  }
}

async function interact(page) {
  console.log("Waiting for search form...");
  const search_input = await page.waitForSelector('[data-testid="destination-container"] input', { timeout: 60000 });
  console.log("Search form appeared! Filling it...");
  await search_input.type(search_text);
  await page.click('[data-testid="searchbox-dates-container"] button');
  await page.waitForSelector('[data-testid="searchbox-datepicker-calendar"]');
  await page.click(`[data-date="${check_in}"]`);
  await page.click(`[data-date="${check_out}"]`);
  console.log("Form filled! Submitting and waiting for result...");
  await Promise.all([
    page.click('button[type="submit"]'),
    page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
  ]);
};

async function parse(page) {
  return await page.$$eval('[data-testid="property-card"]', els => els.map(el => {
    const name = el.querySelector('[data-testid="title"]')?.innerText;
    const price = el.querySelector('[data-testid="price-and-discounted-price"]')?.innerText;
    const review_score = el.querySelector('[data-testid="review-score"]')?.innerText ?? '';
    const [score_str, , , reviews_str = ''] = review_score.split('\n');
    const score = parseFloat(score_str) || score_str;
    const reviews = parseInt(reviews_str.replace(/\D/g, '')) || reviews_str;
    return { name, price, score, reviews };
  }));
}