window.onload = function(){

    const form = document.querySelector('.login-form')

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

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
            send_form()
        }

    })
    function send_form() {
        document.getElementById('login-form').submit()
    }
}