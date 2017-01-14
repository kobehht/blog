$(function () {
    var formValue = {};
    $('.form-horizontal input').on('blur', function () {
        if ($(this).is('[name="username"]')) {
            if (this.value) {
                formValue.name = this.value;
            }
        }
        if ($(this).is('[name="password"]')) {
            if (this.value) {
                formValue.password = this.value;
            }
        }
    });

    $('#login_button').click(function () {
        console.log(formValue);
        $.post('/signin', formValue, function (data) {
            console.log(data);
            window.location = data.redirect;
        });
    });
});
