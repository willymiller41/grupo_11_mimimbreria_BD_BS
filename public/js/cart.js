if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
}

function ready() {
    // localStorage.removeItem('cart')
    let products_table = document.querySelector('.products-table')
    let message_empty_cart = document.querySelector('.message-empty-cart')
    let products_in_cart = (JSON.parse(localStorage.getItem('cart')))
    if(JSON.parse(localStorage.getItem('cart')) == null){
        //No muestro la tabla, mensaje con el carrito vacío y link al listado de productos
        products_table.innerHTML = ''
        message_empty_cart.innerHTML= 'Su carrito está vacío - <a href="/products/list"><button type="submit" class="btn btn-primary">Agregue productos</button></a>'
    }else{
        console.log('Entré a carrito')
        cartDisplay(products_in_cart)
    }
}

function increaseQuantity(id){
    console.log('estoy aumentando la cantidad')
    let products_in_cart = (JSON.parse(localStorage.getItem('cart')))
    let find_product = products_in_cart.find(product => product.id == id)
    find_product.quantity += 1
    find_product.subTotal = find_product.price * find_product.quantity
    localStorage.setItem('cart', JSON.stringify(products_in_cart))
    // window.location.href = '/carts/cart'
    //location.reload()
    cartDisplay(products_in_cart)
}

function decreaseQuantity(id){
    console.log('estoy disminuyendo la cantidad')
    let products_in_cart = (JSON.parse(localStorage.getItem('cart')))
    let find_product = products_in_cart.find(product => product.id == id)
    if(find_product.quantity > 1){
        find_product.quantity -= 1
        find_product.subTotal = find_product.price * find_product.quantity
        localStorage.setItem('cart', JSON.stringify(products_in_cart))
        // window.location.href = '/carts/cart'
        //location.reload()
        cartDisplay(products_in_cart)
    }
}

function deleteItem(id){
    let products_in_cart = (JSON.parse(localStorage.getItem('cart')))
    let find_product = products_in_cart.filter(product => product.id != id)
    if(find_product.length > 0){
        localStorage.setItem('cart', JSON.stringify(find_product))
    }else{
        localStorage.removeItem('cart')
    }
    window.location.href = '/carts/cart'
    //location.reload()
    //cartDisplay(products_in_cart)
}

function cartDisplay(products) {
    let products_list = document.querySelector('.products-list')
    products_list.innerHTML = ''
    let price_total = document.querySelector('.price-total')
    let total = 0
    if(products.length == 0){
        message_empty_cart.innerHTML= 'Su carrito está vacío - <a href="/products/list"><button type="submit" class="btn btn-primary">Agregue productos</button></a>'
    }else{
        products.forEach(element => {
            products_list.innerHTML += 
            `<tr>
                <td> 
                    <img src='/img/products/${element.imagen}' alt="" class="img-thumbnail">
                </td>
                <td>
                    ${element.product}
                </td>
                <td>
                    ${element.price}
                </td>
                <td>
                    ${element.quantity}
                </td>
                <td>                                
                    <a href="#">
                        <button class="btn btn-success" onClick=increaseQuantity(${element.id})><i class="fas fa-plus-square"></i></button>
                    </a>
                </td>
                <td>
                    <a href="#">
                        <button class="btn btn-danger" onClick=decreaseQuantity(${element.id})><i class="fas fa-minus-square"></i></button>
                    </a>
                </td>
                <td>
                    ${element.subTotal}
                </td>
                <td>
                    <a href="#">
                        <button class="btn btn-danger" onClick=deleteItem(${element.id})><i class="fas fa-trash"></i></button>
                    </a>
                </td>
            </tr>`
            total += parseInt(element.subTotal) 
        });
        price_total.innerHTML = ''
        price_total.innerHTML += parseInt(total) 
    }
}