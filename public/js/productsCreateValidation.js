window.onload = function(){

    const form = document.querySelector('.product-form')

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        //Valido el nombre del producto
        const name = document.querySelector('#name')
        const name_error = document.querySelector('#name-error')
        if (name.value == '') {
            name_error.innerHTML = 'Debe ingresar el nombre del producto'
            name.classList.add('invalid')
            name.classList.remove('valid')
        } else {
            name_error.innerHTML = ''
            name.classList.remove('invalid')
            name.classList.add('valid')
        }

        //Valido la descripción del producto
        const description = document.querySelector('#description')
        const description_error = document.querySelector('#description-error')
        if (description.value == '') {
            description_error.innerHTML = 'Debe ingresar la descripción del producto'
            description.classList.add('invalid')
            description.classList.remove('valid')
        } else {
            description_error.innerHTML = ''
            description.classList.remove('invalid')
            description.classList.add('valid')
        }

        //Valido que ingrese una imagen
        const image = document.querySelector('#image')
        const image_error = document.querySelector('#image-error')
        if (image.value == '') {
            image_error.innerHTML = 'Debe ingresar la imagen del producto'
            image.classList.add('invalid')
            image.classList.remove('valid')
        } else {
            image_error.innerHTML = ''
            image.classList.remove('invalid')
            image.classList.add('valid')
        }

        //Valido que ingrese el precio
        const price = document.querySelector('#price')
        const price_error = document.querySelector('#price-error')
        if (price.value == '') {
            price_error.innerHTML = 'Debe ingresar el precio'
            price.classList.add('invalid')
            price.classList.remove('valid')
        } else {
            price_error.innerHTML = ''
            price.classList.remove('invalid')
            price.classList.add('valid')
        }

        //Valido la categoría del producto
        const category = document.querySelector('#category')
        const category_error = document.querySelector('#category-error')
        if (category.value == '') {
            category_error.innerHTML = 'Debe ingresar la categoría del producto'
            category.classList.add('invalid')
            category.classList.remove('valid')
        } else {
            category_error.innerHTML = ''
            category.classList.remove('invalid')
            category.classList.add('valid')
        }

        //Valido que haya ingresado el stock
        const stock = document.querySelector('#stock')
        const stock_length = stock.value
        const stock_error = document.querySelector('#stock-error')
        if (stock.value == '') {
            stock_error.innerHTML = 'Debe indicar el stock del producto'
            stock.classList.add('invalid')
            stock.classList.remove('valid')
        } else {
            stock_error.innerHTML = ''
            stock.classList.remove('invalid')
            stock.classList.add('valid')
        }

        //Valido coincidencia de password y password2
        const password2 = document.querySelector('#password2')
        const password2_error = document.querySelector('#password2-error')
        if(password2.value == ''){
            password2_error.innerHTML = 'Debe reingresar la contraseña'
            password2.classList.add('invalid')
            password2.classList.remove('valid')
        }else if(password.value !== password2.value) {
            password2_error.innerHTML = 'Las contraseñas no coinciden'
            password2.classList.add('invalid')
            password2.classList.remove('valid')
        }else {
            password2_error.innerHTML = ''
            password2.classList.remove('invalid')
            password2.classList.add('valid')
            send_form()
        }
        
    })
    
    function send_form() {
        document.getElementById('register-form').submit()
    }
}