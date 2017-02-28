$(function () {
    var formValue = {};
    $('#post_title').on('blur', function () {
        if (this.value) {
            formValue.title = this.value;
        }
    });
    $('#post_content').on('blur', function () {
        if (this.value) {
            formValue.content = this.value;
        }
    });

    $('#create_button').on('click', function () {
        $.post('/user/create', formValue, function (data) {
            window.location = data.redirect;
        });
    });
});
