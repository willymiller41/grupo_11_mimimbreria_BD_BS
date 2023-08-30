window.onload = function(){

    const form = document.querySelector('.register-form')

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        //Valido el nombre
        const name = document.querySelector('#name')
        const name_error = document.querySelector('#name-error')
        if (name.value == '') {
            name_error.innerHTML = 'Debe ingresar su nombre'
            name.classList.add('invalid')
            name.classList.remove('valid')
        } else {
            name_error.innerHTML = ''
            name.classList.remove('invalid')
            name.classList.add('valid')
        }

        //Valido el apellido
        const surname = document.querySelector('#surname')
        const surname_error = document.querySelector('#surname-error')
        if (surname.value == '') {
            surname_error.innerHTML = 'Debe ingresar su apellido'
            surname.classList.add('invalid')
            surname.classList.remove('valid')
        } else {
            surname_error.innerHTML = ''
            surname.classList.remove('invalid')
            surname.classList.add('valid')
        }

        //Valido el email
        const email = document.querySelector('#email')
        const email_error = document.querySelector('#email-error')
        let emailValido = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        if (emailValido.test(email.value)) {
            email_error.innerHTML = ''
            email.classList.remove('invalid')
            email.classList.add('valid')
        } else {
            email_error.innerHTML = "Debe ingresar un email válido";
            email.classList.add('invalid')
            email.classList.remove('valid')
        }

        //Valido la dirección
        const address = document.querySelector('#address')
        const address_error = document.querySelector('#address-error')
        if (address.value == '') {
            address_error.innerHTML = 'Debe ingresar su domicilio'
            address.classList.add('invalid')
            address.classList.remove('valid')
        } else {
            address_error.innerHTML = ''
            address.classList.remove('invalid')
            address.classList.add('valid')
        }

        //Valido el código postal
        const code = document.querySelector('#code')
        const code_error = document.querySelector('#code-error')
        if (code.value == '') {
            code_error.innerHTML = 'Debe ingresar su código postal'
            code.classList.add('invalid')
            code.classList.remove('valid')
        } else {
            code_error.innerHTML = ''
            code.classList.remove('invalid')
            code.classList.add('valid')
        }

        //Valido la password
        const password = document.querySelector('#password')
        const password_length = password.value
        const password_error = document.querySelector('#password-error')
        if (password.value == '' || password_length.length < 8) {
            password_error.innerHTML = 'Su contraseña debe ser de al menos 8 caracteres'
            password.classList.add('invalid')
            password.classList.remove('valid')
        } else {
            password_error.innerHTML = ''
            password.classList.remove('invalid')
            password.classList.add('valid')
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