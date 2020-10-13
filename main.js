$(document).ready(function () {
    //#region Navbar
    var navbar = $('.navbar');
    var nav_toggle = $('.nav-toggle');
    var account = $('.account');
    var account_details = $('.account-details');

    nav_toggle.click(function (e) {
        e.preventDefault();

        navbar.toggleClass("open");
    });

    account.click(function (e) {
        e.preventDefault();

        account_details.toggleClass("open");
    });

    $(window).scroll(function () {
        if (scrollY == 0) {
            navbar.removeClass("scrolled");
        } else {
            navbar.addClass("scrolled");
        }
    });

    if (scrollY != 0) {
        navbar.addClass("scrolled");
    }

    //#endregion

    
});
