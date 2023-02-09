if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    let removeCartItemButtons = document.getElementsByClassName('btn-danger')
    console.log(removeCartItemButtons)
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    let quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    //creating variable to add items to card with event
    let addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
    //event to make the purchase button remove everything from cart
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert("Thank you for your purchase")
    //deleting all items in cart
    let cartItems = document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    //brings total to 0
    updateCartTotal()
}



function removeCartItem() {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    //total price is not removed at this point but rows with selected items have been
    updateCartTotal()
}

//this function updates the quantity changed, checks that value is never not a number or less than 0, and defaults the quantity value to 1
function quantityChanged(event){
    let input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartTotal()
}

//function to add items to cart once button is clicked
function addToCartClicked(event) {
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    console.log(title, price, imageSrc)
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

//function to create a row to cart item
function addItemToCart(title, price, imageSrc){
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let cartItemNames = cartItems.getElementsByClassName('cart-item-title')
        for(let i = 0; i < cartItemNames.length; i++){
            if(cartItemNames[i].innerText == title){
                alert('This item is already added to the cart')
                return
            }
        }
    let cartRowContents = `
        <div class="cart-item cart-column">
             <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
             <span class="cart-item-title">${title}</span>
        </div>
             <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
              <input class="cart-quantity-input" type="number" value="1">
              <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

//adding a function to update total price after an item has been removed
function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0]
    //index of 0 in the array of cart items selects only the first item in the cart(array)
    let cartRows = cartItemContainer.getElementsByClassName('cart-row')
    //only gets the elements on that pbject with this class name
    let total = 0
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName('cart-price')[0]
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        let price = parseFloat(priceElement.innerText.replace('$', ''))
        let quantity = quantityElement.value
        console.log(price * quantity)
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    //^^this will round our total to 2 decimal places
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}