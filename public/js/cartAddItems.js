if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
}

function ready() {
    // localStorage.removeItem('cart')
    if(JSON.parse(localStorage.getItem('cart')) == null){
        localStorage.setItem('cart', JSON.stringify([]))
    }
    let cart_btn = document.querySelector('.cart-btn')
    cart_btn.addEventListener('click', addItem)
}

function addItem() {
    let regex = /\/products\/detail\/(\d+)/
    let url = window.location.href
    let cart_products = (JSON.parse(localStorage.getItem('cart')))
    if(document.querySelector('.price-discount') !== null){
        set_price = document.querySelector('.price-discount').innerText
    }else{
        set_price = document.querySelector('.price').innerText
    }
    let item_to_add = {
        id: url.match(regex)[1],
        product: document.querySelector('.product').innerText,
        description: document.querySelector('.description').innerText,
        price: parseInt(set_price.replace('.','')),
        imagen: document.querySelector('.imagen').alt,
        user_id: parseInt(document.querySelector('.user-id').innerText)
    }

    if(cart_products.length == 0){
        item_to_add.quantity = 1,
        item_to_add.subTotal = parseInt(set_price.replace('.',''))
        cart_products.push(item_to_add)
    }else{
        let find_product = cart_products.find(product => product.id == item_to_add.id)
        if(find_product){
            find_product.quantity += 1
            find_product.subTotal += parseInt(set_price.replace('.',''))
        }else{
            item_to_add.quantity = 1,
            item_to_add.subTotal = parseInt(set_price.replace('.',''))
            cart_products.push(item_to_add)
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart_products))
    window.location.href = '/carts/cart'
}
