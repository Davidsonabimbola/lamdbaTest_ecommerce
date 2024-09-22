const { test, expect } = require('@playwright/test');

test('TC_001 sign up functionality', async ({ page }) => {
  test.setTimeout(120000)
    await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=common/home')
    const navbarSection =  page.locator('[data-id="217834"]')
   const navBar = navbarSection.locator('[id="widget-navbar-217834"]')
   const navList = navBar.locator('[class="navbar-nav horizontal"]')
   const targetSection =  navList.locator('[class="nav-item dropdown dropdown-hoverable"]').nth(1)
   await targetSection.hover()
   
   await page.getByRole('link', { name: 'Login' }).click()
   const newCustomer_Section = page.locator('[class="card-body p-4"]')
   await expect (newCustomer_Section).toBeTruthy()
   await newCustomer_Section.getByRole('link',{name:'Continue'}).click()
   await page.locator('[id="input-firstname"]').fill('Fathia')
   await page.locator('[id="input-lastname"]').fill('Muse')
   await page.locator('[id="input-email"]').fill('nosfathiao_049@yahoo.com')
   await page.locator('[id="input-telephone"]').fill('+2348108088780')
   await page.locator('[id="input-password"]').fill('Vanmuster.007')
   await page.locator('[id="input-confirm"]').fill('Vanmuster.007')
   await page.getByText('I have read and agree to the').check()
   await page.locator('[class="btn btn-primary"]').click()
   const successPage = await page.locator('[id="common-success"]')
   await expect(successPage).toBeTruthy()
   const successSection = await page.locator('[id="common-success"]')
   const successHeader = await successSection.locator('[class="page-title my-3"]').textContent()
   const successMessage = await successSection.locator('p').nth(1).textContent()
   console.log(await successHeader)
   console.log(await successMessage)

   await page.getByRole('link',{name:'Continue'}).click() // second continue button
  });




  test('TC_002 login functionality',{tag:'@smoke'},async({page})=>{
    test.setTimeout(200000)
    var userEmail = 'nosmuselavo_049@yahoo.com'
    var userPassword = 'Vanmuster.007'
    var mode_ofShopping = 'Shop by Category'
    var productCategory = 'Phone, Tablets & Ipod'
    var productName = 'HTC Touch HD'
    var actionButton = 'Add to Cart'
    var billing_firstName = 'Stalker'
    var billing_lastName = 'Muster'
    var billing_address = 'Johnson Awe street, House 23'
    var billingCity = 'Philadelphia'
    var billing_postalCode = '51025'
    var billingCountry = 'United States'
    var billingState = 'Pennsylvania'
    var customerComment = 'Do not ring the bell. Just drop the order at the door, I will pick it up'
    await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=common/home')
    const navbarSection =  page.locator('[data-id="217834"]')
   const navBar = navbarSection.locator('[id="widget-navbar-217834"]')
   const navList = navBar.locator('[class="navbar-nav horizontal"]')
   const targetSection =  navList.locator('[class="nav-item dropdown dropdown-hoverable"]').nth(1)
   await targetSection.hover()
   
   await page.getByRole('link', { name: 'Login' }).click()
   const cardContent = await page.locator('[class="card-body p-4"]').locator('h2').getByText('Returning Customer')
   const cardContainer = await page.locator('[class="col-lg-6"]').filter({has:cardContent})
   await cardContainer.locator('[id="input-email"]').fill(userEmail)
   await cardContainer.locator('[id="input-password"]').fill(userPassword)
   await cardContainer.locator('[class="btn btn-primary"]').click()
   await expect(page.locator('[id="content"]')).toBeTruthy()

    //shop for order
   await page.getByRole('button', { name:mode_ofShopping }).click()

   const list_ofItems = await page.locator('[class="nav-item"]')
   const product_Info = await page.locator('[class="info"]')
   const itemPick =product_Info.locator('[class="title"]').filter({hasText:productCategory})
   const itemLocate = await list_ofItems.filter({has:itemPick})
   await itemLocate.locator('a').click()

   //await expect(await page.locator('[id="product-category"]')).toBeTruthy()

   const productCaption = page.locator('[class="caption"]')
   const productCaption_linkDetails = productCaption.getByRole('link',{name:productName})

   const productCard = await page.locator('[class="product-layout product-grid no-desc col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6"]')
   const chosen_productCard = await productCard.filter({has:productCaption_linkDetails})
    const productInfo = await chosen_productCard.locator('[class="caption"]')
   const productTitle = await productInfo.locator('h4').locator('a') // product title
   console.log(await productTitle.textContent())
    expect(await productTitle.textContent()).toContain(productName)
   const productPrice = productInfo.locator('[class="price"]').locator('[class="price-new"]') //product price
   console.log(await productPrice.textContent())
   await chosen_productCard.click()


    //expect(await page.locator('[id="product-product"]')).toBeVisible()
    const productAvailability = page.locator('[class="badge badge-success"]').textContent()
    console.log(await productAvailability)
    expect(await productAvailability).toContain('In Stock')
    await page.getByRole('button', {name: actionButton}).click()

    await page.getByRole('link',{name:'View Cart'}).click()
    await expect(page.locator('[id="content"]')).toBeVisible()

    //cart icon
    const cartSection = page.locator('[id="entry_217830"]')
    const cartIcon = cartSection.locator('[class="badge badge-pill badge-info cart-item-total"]')
    console.log(await cartIcon.textContent())

    //await expect(chosen_productCard.count()).toEqual(await cartIcon.textContent())
   

    //checkout
    await page.getByRole('link', { name: 'Checkout' }).click()
    //await expect(await page.locator('[id="maza-checkout"]')).toBeVisible() //assertion 

    // I want to use a new address radio button

    await page.locator('#payment-address').getByText('I want to use a new address').click()

    //Billing address

    await page.locator('[id="input-payment-firstname"]').fill(billing_firstName)
    await page.locator('[id="input-payment-lastname"]').fill(billing_lastName)
    await page.locator('[id="input-payment-address-1"]').pressSequentially(billing_address)
    await page.locator('[id="input-payment-city"]').fill(billingCity)
    await page.locator('[id="input-payment-postcode"]').fill(billing_postalCode)

    await page.selectOption('#input-payment-country', { label:billingCountry });
    await page.selectOption('[id="input-payment-zone"]', { label:billingState });


    await page.locator('[id="input-comment"]').fill(customerComment)

     const terms_andCondition = await page.locator('a')
     const link_to_terms =terms_andCondition.locator('b').filter({hasText:'Terms & Conditions'})

    await page.locator('[class="custom-control-label"]').filter({has:link_to_terms}).click()

    // continue
    await page.locator('[id="button-save"]').click()


   // await expect(await page.locator('[class="table table-bordered table-hover mb-0"]')).toBeVisible()
    await page.getByRole('button', {name:'Confirm Order'}).click()

//final page message
    const final_orderPage = await page.locator('[id="content"]')
    const order_paragraphMessage = final_orderPage.locator('[class="page-title my-3"]')
    await order_paragraphMessage.isVisible()
    await order_paragraphMessage.textContent()
    console.log(await order_paragraphMessage.textContent())

    await expect(final_orderPage.locator('p').nth(1)).toContainText('Your order has been successfully processed!')
    await page.locator('[class="buttons mb-4"]').getByRole('link', {name:'Continue'}).click()



    

  })


