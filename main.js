$(document).ready(function () {
    const loginContainer = $('#login-container');

    function setAlert(message) {
        $('#msg-text').html(message);
        $('.alert').fadeIn(500);

        setTimeout(() => {
            $('.alert').fadeOut(500);
        }, 3000);
    }

    $('.btn-close').click(function () {
        $(this.parentElement.parentElement.parentElement).fadeOut(600);
    });

    $('input').keydown(function () {
        $('.error').html('');
    });

    $('.show-password').click(function () {
        let input = $(this.parentElement).find('input');

        if ($(input).attr('type') == 'text') {
            $(input).attr('type', 'password');
            $(this.parentElement).find('i').attr('class', 'fa fa-eye show-password');
        } else {
            $(input).attr('type', 'text');
            $(this.parentElement).find('i').attr('class', 'fa fa-eye-slash show-password');
        }
    });

    $('.change-password .field').hover(function () {
        $(this).find('i').fadeIn(100);
    }, function () {
        $(this).find('i').fadeOut(100);
    });

    //#region Navbar
    const navbar = $('.navbar');
    const nav_toggle = $('.nav-toggle');
    const account = $('.account-icon');
    const account_details = $('.account-details');
    const shopping_cart = $('.shopping-cart');

    $('.nav-link').click(function () {
        hidePanels();
    });

    function hidePanels() {
        navbar.removeClass('open');
        shopping_cart.fadeOut(600);
        account_details.fadeOut(600);
        $('.sign-in').fadeOut(600);
        $('.single-product').fadeOut(600);
        $('.cart-page').fadeOut(600);
        $('.checkout').fadeOut(600);
        $('.profile-page').fadeOut(600);
    }

    nav_toggle.click(function (e) {
        e.preventDefault();

        navbar.toggleClass("open");
    });

    account.click(function (e) {
        e.preventDefault();

        shopping_cart.fadeOut(600);

        account_details.fadeToggle(600);
    });

    $('#icon-cart').click(function (e) {
        e.preventDefault();

        account_details.fadeOut(600);

        shopping_cart.fadeToggle(600);
    });

    $(window).scroll(function () {
        if (scrollY == 0 && $('.sign-in').css('display') == 'none') {
            navbar.removeClass("scrolled");
        } else if ($('.profile-page').css('display') == 'none' && $('.checkout').css('display') == 'none') {
            navbar.addClass("scrolled");
        }
    });

    if (scrollY != 0 && $('.sign-in').css('display') == 'none' && $('.profile-page').css('display') == 'none' && $('.checkout').css('display') == 'none') {
        navbar.addClass("scrolled");
    } else if ($('.sign-in').css('display') == 'flex') {
        navbar.addClass("scrolled");
    }

    $('.login-button').click(function (e) {
        e.preventDefault();
        let elementClass = $(this).attr('class').split(' ')[1];

        navbar.removeClass('open');

        if ($('.sign-in').css('display') == 'none') {
            $('.sign-in').fadeIn(600);
        }

        if (elementClass == 'login') {
            $(loginContainer).removeClass('right-panel-active');
        } else if (elementClass == 'register') {
            $(loginContainer).addClass('right-panel-active');
        }

        $('.navbar').addClass('scrolled');
    });

    $('.close-btn').click(function () {
        $(this.parentElement.parentElement).fadeOut(600);
    });

    //#endregion

    //#region Account

    let prevImage;

    $('.view-profile').click(function (e) {
        e.preventDefault();
        
        $('.account-details').fadeOut(600);
        $('.profile-page').fadeIn(600);

        $('.profile-page').removeClass('edit');

        $('.edit-profile-page .profile-image').attr('src', prevImage);
        $("#edit-profile-img").val('');
    });

    $('.edit-profile').click(function (e) {
        e.preventDefault();

        clearProfileFields();
        if($("#edit-profile-img").val() != ''){
            $('.edit-profile-page .profile-image').attr('src', prevImage);
            $("#edit-profile-img").val('');
        }
        prevImage = $('.edit-profile-page .profile-image').attr('src');

        $('.account-details').fadeOut(600);
        $('.profile-page').fadeIn(600);

        $('.profile-page').addClass('edit');
    });

    $('.change-pass-btn').click(function (e) {
        e.preventDefault();

        $.post("backend/user-data.php",
            function (response) {
                if (response != 'false') {
                    let data = JSON.parse(response);

                    $('#current-pass').val(data[0].userPassword);
                }
            }
        );

        $('.account-details').fadeOut(600);
        $('.change-password').fadeIn(600);
    });

    $('.log-out').click(function (e) {
        e.preventDefault();

        $('.account-details').fadeOut(600);
        $('.logout-confirm').fadeIn(600);
    });

    //#endregion

    //#region Login

    $('#signUp').click(function (e) {
        e.preventDefault();

        loginContainer.addClass('right-panel-active');
    });

    $('#signIn').click(function (e) {
        e.preventDefault();

        loginContainer.removeClass('right-panel-active');
    });

    $('#login-submit').click(function (e) {
        e.preventDefault();

        if ($('#login-email').val() != '' && $('#login-password').val() != '') {
            login();
        }
    });

    $('#register-submit').click(function (e) {
        e.preventDefault();

        register();
    });

    //#endregion

    //#region Products

    const single_product = $('.single-product');

    $('.product-item').click(function () {
        let product_image = $($(this).find('img')[0]).attr('src');
        let product_name = $(this).find('h2')[0].innerText;
        let product_price = $(this).find('h4')[0].innerText.split(' ')[1];
        let product_description = $(this).find('p')[0].innerText;

        $($(single_product).find('img')[0]).attr('src', product_image);
        $($(single_product).find('.product-title')[0]).find('h2')[0].innerText = product_name;
        $($(single_product).find('.price')[0]).find('span')[0].innerText = product_price;
        $($(single_product).find('.description')[0]).find('p')[0].innerText = product_description;

        $(single_product).fadeToggle(600);
    });

    //#endregion

    //#region Carrito de compras
    $('#add-cart').click(function () {
        let exist = false;

        let name = $(this.parentElement).find('h2').text();
        let image = $(this.parentElement.parentElement).find('img').attr('src');
        let price = $(this.parentElement).find('.price').find('span').text();

        let cart_items = [];
        cart_items = $('.shopping-cart-items').find('li');

        for (let i = 0; i < cart_items.length; i++) {
            const element = cart_items[i];

            try {
                let already_name = $(element).find('.item-name').text();

                if (name == already_name) {
                    exist = true;
                }
            } catch (error) {

            }
        }

        if (exist == false) {
            $(this).addClass('clicked');

            setTimeout(() => {
                let miNodo = document.createElement('li');

                miNodo.innerHTML = `<img src="${image}">
                <div class="description">
                    <span class="item-name">${name}</span>
                    <span class="item-price">L. <span>${price}</span></span>
                </div>`;

                let miBoton = document.createElement('i');
                miBoton.classList.add('fa', 'fa-times');
                miBoton.addEventListener('click', deleteItemCart);

                miNodo.appendChild(miBoton);

                if ($('.shopping-cart-items').find('li').hasClass('null')) {
                    $('.shopping-cart-items').html('');
                }

                document.querySelector('.shopping-cart-items').appendChild(miNodo);

                $('.cart').addClass('full');

                countItems();
                calcTotal();
            }, 1200);

            setTimeout(() => {
                $(this).removeClass('clicked');
            }, 2500);
        } else {
            setAlert('¡Este producto ya existe en el carrito!')
        }
    });

    $('.cart').find('.button').click(function (e) {
        e.preventDefault();
        $('.cart-page').find('.products-table').find('table').html('');

        if ($('.shopping-cart-items').find('li').hasClass('null')) {
            setAlert('¡Aun no ha agregado nada al carrito!');
        } else {
            updateCartPage();
            updateReviewPage();
            $('.shopping-cart').fadeOut(600);
            $('.cart-page').fadeIn(600);
        }

    });

    $('.cart-page').find('.submit-btn').find('button').click(function () {
        if ($('.shopping-cart-items').find('li').hasClass('null') == false) {
            if ($('.navbar').hasClass('logged')) {
                $('.checkout').fadeIn(600);
            } else {
                $(loginContainer).removeClass('right-panel-active');
                $('.sign-in').fadeIn(600);
                $('.navbar').addClass('scrolled');
            }
        } else {
            setAlert('¡Aun no ha agregado nada al carrito!');
        }
    });

    $('.cart-page .close-button').click(function () {
        $('.cart-page').fadeOut(600);
    });

    function updateCartPage() {
        let cartItems = [];
        cartItems = $('.shopping-cart-items').find('li');
        $('.products-table').find('table').html('');

        if ($('.shopping-cart-items').find('li').hasClass('null') == false) {
            for (let i = 0; i < cartItems.length; i++) {
                const element = cartItems[i];

                let image = $(element).find('img').attr('src');
                let name = $(element).find('.item-name').text();
                let price = $(element).find('.item-price').find('span').text();

                let miNodo = document.createElement('tr');

                miNodo.innerHTML = `<td>
            <div class="product-info">
                <img src="${image}" alt="${name}">
                <div class="details">
                    <p>${name}</p>                    
                 </div>
            </div>
            </td>
            <td>L. ${price}</td>`;

                let miBoton = document.createElement('a');
                miBoton.addEventListener('click', deleteItemCartPage);
                miBoton.setAttribute('href', '#')
                miBoton.innerHTML = 'Remover';

                $(miNodo).find('.details').append(miBoton);

                $('.products-table').find('table').append(miNodo);
            }
        }

        cartItems = $('.shopping-cart-items').find('li');

        if (cartItems.length == 0) {
            $('.products-table').find('table').html('');
        }

    }

    function updateReviewPage() {
        let cartItems = [];
        cartItems = $('.shopping-cart-items').find('li');

        $('.review-order').html('');

        if ($('.shopping-cart-items').find('li').hasClass('null') == false) {
            for (let i = 0; i < cartItems.length; i++) {
                const element = cartItems[i];

                let image = $(element).find('img').attr('src');
                let name = $(element).find('.item-name').text();
                let price = $(element).find('.item-price').find('span').text();

                let miNodo = document.createElement('li');

                miNodo.innerHTML = `<img src="${image}">
                <div class="description">
                    <span class="item-name">${name}</span>
                    <span class="item-price">L. <span>${price}</span></span>
                </div>`;

                document.querySelector('.review-order').appendChild(miNodo);
            }
        }

        cartItems = $('.shopping-cart-items').find('li');

        if (cartItems.length == 0) {
            $('.review-order').html('');
        }

    }

    function deleteItemCartPage() {
        let itemName = $(this.parentElement).find('p').text();

        let cart_items = [];
        cart_items = $('.shopping-cart-items').find('li');

        for (let i = 0; i < cart_items.length; i++) {
            const element = cart_items[i];

            try {
                let already_name = $(element).find('.item-name').text();

                if (itemName == already_name) {
                    $(element).remove();
                }
            } catch (error) {

            }
        }

        cart_items = $('.shopping-cart-items').find('li');

        if (cart_items.length == 0) {
            $('.shopping-cart-items').html(`<li class="null">
                <h4>Aun no ha agregado nada!</h4>
            </li>`);

            $('.cart').removeClass('full');
        }

        countItems();
        calcTotal();
        updateCartPage();
        updateReviewPage();
    }

    function deleteItemCart() {
        $(this.parentElement).remove();

        let cart_items = [];
        cart_items = $('.shopping-cart-items').find('li');

        if (cart_items.length == 0) {
            $('.shopping-cart-items').html(`<li class="null">
                <h4>Aun no ha agregado nada!</h4>
            </li>`);

            $('.cart').removeClass('full');
        }

        countItems();
        calcTotal();
        updateCartPage();
        updateReviewPage();
    }

    function countItems() {
        let cart_items = [];
        cart_items = $('.shopping-cart-items').find('li');

        $('.badge').html(cart_items.length);
    }

    function calcTotal() {
        let total = 0;

        let cart_items = [];
        cart_items = $('.shopping-cart-items').find('.item-price').find('span');

        for (let i = 0; i < cart_items.length; i++) {
            const price = cart_items[i];

            total += parseFloat($(price).text());
        }

        $('.cart').find('.total-price').find('span').text(total.toFixed(2));
        $('.cart-page').find('.totalPay').text('L. ' + total.toFixed(2));
    }

    //#endregion

    //#region Checkout Form
    const slidePage = $('.slide-page');
    const nextBtnFirst = $('.firstNext');
    const prevBtnSec = $('.prev-1');
    const nextBtnSec = $('.next-1');
    const prevBtnThird = $('.prev-2');
    const nextBtnThird = $('.next-2');
    const prevBtnFourth = $('.prev-3');
    const nextBtnFourth = $('.next-3');
    const prevBtnFive = $('.prev-4');
    const nextBtnFive = $('.next-4');
    const submitBtn = $('.submit');
    const closeBtn = $('.checkout .close');
    const progressText = $('.step p');
    const progressCheck = $('.step .check');
    const bullet = $('.step .bullet');
    let current = 1;

    $(nextBtnFirst).click(function (e) {
        e.preventDefault();

        $(slidePage).css('margin-left', '-20%');
        NextProgressActiveChange();
    });

    $(nextBtnSec).click(function (e) {
        e.preventDefault();

        $(slidePage).css('margin-left', '-40%');
        NextProgressActiveChange();
    });

    $(nextBtnThird).click(function (e) {
        e.preventDefault();

        $(slidePage).css('margin-left', '-60%');
        NextProgressActiveChange();
    });

    $(nextBtnFourth).click(function (e) {
        e.preventDefault();

        $(slidePage).css('margin-left', '-80%');
        NextProgressActiveChange();
    });

    $(nextBtnFive).click(function (e) {
        e.preventDefault();

        $(slidePage).css('margin-left', '-100%');
        NextProgressActiveChange();
    });

    $(submitBtn).click(function (e) {
        e.preventDefault();

        //Peticion ajax para enviar el pedido

        NextProgressActiveChange();
    });

    function NextProgressActiveChange() {
        $(bullet[current - 1]).addClass('active');
        $(progressCheck[current - 1]).addClass('active');
        $(progressText[current - 1]).addClass('active');

        current += 1;
    }

    $(prevBtnSec).click(function (e) {
        e.preventDefault();
        $(slidePage).css('margin-left', '0%');

        PrevProgressActiveChange();
    });

    $(prevBtnThird).click(function (e) {
        e.preventDefault();
        $(slidePage).css('margin-left', '-20%');

        PrevProgressActiveChange();
    });

    $(prevBtnFourth).click(function (e) {
        e.preventDefault();
        $(slidePage).css('margin-left', '-40%');

        PrevProgressActiveChange();
    });

    $(prevBtnFive).click(function (e) {
        e.preventDefault();
        $(slidePage).css('margin-left', '-60%');

        PrevProgressActiveChange();
    });

    function PrevProgressActiveChange() {
        $(bullet[current - 2]).removeClass('active');
        $(progressCheck[current - 2]).removeClass('active');
        $(progressText[current - 2]).removeClass('active');

        current -= 1;
    }

    $(closeBtn).click(function (e) {
        e.preventDefault();

        $('.checkout').fadeOut(600);
        $(slidePage).css('margin-left', '0%');
        $(bullet).removeClass('active');
        $(progressCheck).removeClass('active');
        $(progressText).removeClass('active');

        current = 1;
    });
    //#endregion

    //#region Profile Page

    $('.profile-page .close-button').click(function () {
        $('.profile-page').fadeOut(600);
    });

    $('.edit-profile-page .save-btn').click(function (e) {
        e.preventDefault();
     
        changeImage();
        editProfile();       
    });

    $("#edit-profile-img").change(function () {               
        filePreview(this);        
    });

    function filePreview(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('.edit-profile-page .profile-image').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    function clearProfileFields() {
        $('#edit-profile-name').val('');
        $('#edit-profile-last-name').val('');
        $('#edit-profile-age').val('');
        $('#edit-profile-email').val('');
        $('#edit-profile-phone').val('');
        $('#edit-profile-direction').val('');

    }

    function clearProfileInfo() {
        $('.profile-image').attr('src', 'img/default-user.png');
        $('.profile-info .user-id').html('');
        $('.profile-info .user-name').html('');
        $('.profile-info .user-email').html('');
        $('.profile-info .user-age').html('');
        $('.profile-info .user-phone').html('');
        $('.profile-info .user-direction').html('');
    }

    //#endregion

    //#region Change Password

    $('.change-password .close-button').click(function () {
        $('.change-password').fadeOut(600);
    });

    $('.change-password .change').click(function (e) {
        e.preventDefault();

        let currentPass = $('#current-pass').val();
        let newPass = $('#new-pass').val();
        let confirmNewPass = $('#confirm-new-pass').val();

        if (newPass == confirmNewPass) {
            if (newPass == '' || confirmNewPass == '') {
                $('.change-password .error').html('¡Asegurese de rellenar todos los campos!');
            } else {
                if (newPass == currentPass) {
                    $('.change-password .error').html('¡La contraseña nueva es igual a la contraseña actual!');
                } else {
                    changePassword(newPass);
                }
            }
        } else {
            $('.change-password .error').html('¡Las contrasenas no coinciden!');
        }

    });

    //#endregion

    //#region Logout

    $('.logout-confirm .no').click(function (e) {
        e.preventDefault();

        $('.account-details').fadeOut(600);
        $('.logout-confirm').fadeOut(600);
    });

    $('.logout-confirm .yes').click(function (e) {
        e.preventDefault();

        logout();
        hidePanels();
    });

    //#endregion

    //#region Backend Ajax

    function login() {
        const userData = {
            email: $('#login-email').val(),
            password: $('#login-password').val()
        }

        $.post("backend/login.php", userData,
            function (response) {
                if (response == 'true') {
                    loadUserData();
                    $('.sign-in').fadeOut();
                    $('.navbar').addClass('logged');
                } else {
                    $('.sign-in-container .error').text('¡Usuario o Contraseña Incorrectos!');
                }
            }
        );
    }

    function register() {
        const registerUserData = {
            userName: $('#register-user-name').val(),
            userEmail: $('#register-user-email').val(),
            userPhone: $('#register-user-phone').val(),
            userPassword: $('#register-user-password').val()
        }

        $.post("backend/register.php", registerUserData,
            function (response) {
                if (response == 'exist') {
                    $('.sign-up-container .error').html('¡Ya existe una cuenta con el mismo correo electronico!')
                } else if (response == 'successful') {
                    loadPage();
                    $('.sign-in').fadeOut(600);
                } else {
                    setAlert(response);
                }
            }
        );
    }

    function loadUserData() {
        $.post("backend/user-data.php",
            function (response) {
                if (response != 'false') {
                    let data = JSON.parse(response);

                    $('.account .username').html(data[0].userName);

                    $('.profile-info .profile-head h4').html(data[0].userName);
                    $('.profile-info .user-id').html(data[0].userId);
                    $('.profile-info .user-name').html(data[0].userName);

                    if (data[0].userAge != null && data[0].userAge != '0') {
                        $('.profile-info .user-age').html(`${data[0].userAge} años`);
                    }

                    $('.profile-info .user-email').html(data[0].userEmail);
                    $('.profile-info .user-phone').html(data[0].userPhone);
                    $('.profile-info .user-direction').html(data[0].userDirection);

                    if(data[0].typeImage != ''){
                        $('.profile-image').attr('src', `data:${data[0].typeImage};base64,${data[0].userImage}`);
                    }
                }
            }
        );
    }

    function loadPage() {
        $.post("backend/load-page.php",
            function (response) {
                if (response == 'true') {
                    loadUserData();

                    $('.navbar').addClass('logged');
                } else {
                    $('.navbar').removeClass('logged');
                }
            }
        );
    }

    function changePassword(newPassword) {
        let newPass = {
            password: newPassword
        }

        $.post("backend/change-password.php", newPass,
            function (response) {
                if (response == 'true') {
                    $('#current-pass').val('');
                    $('#new-pass').val('');
                    $('#confirm-new-pass').val('');

                    setAlert('Contraseña cambiada correctamente');
                    $('.change-password').fadeOut();
                } else {
                    $('.change-password .error').html('¡Ha ocurrido un error! ' + response);
                }
            }
        );
    }

    function logout() {
        $.post("backend/logout.php",
            function (response) {
                if (response == 'logout') {
                    clearProfileFields();
                    clearProfileInfo();

                    $('.navbar').removeClass('logged');
                    $('.logout-confirm').fadeOut(600);
                } else {
                    setAlert(response);
                }
            }
        );
    }

    function editProfile() {                 
        let name = function () {
            if ($('#edit-profile-name').val() != '' && $('#edit-profile-last-name').val() != '') {
                return $('#edit-profile-name').val() + ' ' + $('#edit-profile-last-name').val();
            } else {
                return $('.profile-info .user-name').html();
            }
        }

        let age = function () {
            if ($('#edit-profile-age').val() != '') {
                return $('#edit-profile-age').val();
            } else {
                return $('.profile-info .user-age').html();
            }
        }

        let email = function () {
            if ($('#edit-profile-email').val() == $('.profile-info .user-email').html()) {
                return $('.profile-info .user-email').html() + '*same';
            } else if ($('#edit-profile-email').val() != '') {
                return $('#edit-profile-email').val();
            } else {
                return $('.profile-info .user-email').html() + '*same';
            }
        }

        let phone = function () {
            if ($('#edit-profile-phone').val() != '') {
                return $('#edit-profile-phone').val();
            } else {
                return $('.profile-info .user-phone').html();
            }
        }

        let direction = function () {
            if ($('#edit-profile-direction').val() != '') {
                return $('#edit-profile-direction').val();
            } else {
                return $('.profile-info .user-direction').html();
            }
        }
       
        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "backend/edit-profile.php",
            data: {
                userName: name(),
                userAge: age(),
                userEmail: email(),
                userPhone: phone(),
                userDirection: direction()
            },
            success: function (response) {
                if (response == 'exist') {
                    setAlert('¡Ya existe una cuenta con el mismo correo electronico!');
                } else if (response == 'successful') {
                    loadPage();

                    clearProfileFields();
                    $('.profile-page').removeClass('edit');                    
                } else {
                    setAlert(response);
                }
            }
        });        
    }

    function changeImage() {
        var formData = new FormData();
        var files = $('#edit-profile-img')[0].files[0];
        formData.append('file', files);

        $.ajax({
            url: 'backend/change-image.php',
            type: 'post',
            enctype: 'multipart/form-data',
            data: formData,
            contentType: false,
            processData: false,
            success: function(response) {
                if (response == 'true') {
                    loadPage();
                    $("#edit-profile-img").val('');
                }
            }
        });
    }

    clearProfileInfo();
    loadPage();    

    //#endregion
});