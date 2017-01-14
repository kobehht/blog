$(function () {
    var formValue = {};
    // 当表单键入内容时验证输入内容
    $('.form_horizontal input').on('keyup change blur', function () {
        var $parent = $(this).parent();
        var $next = $(this).next();

        // 输入符合要求的显示
        function isCorrect() {
            $next.css('display', 'none');
            $parent.addClass('has-success');
            $parent.removeClass('has-error');
        }

        // 输入不符合要求的显示
        function isIncorrect() {
            $next.css('display', 'block');
            $parent.addClass('has-error');
            $parent.removeClass('has-success');
        }

        if ($(this).is('[name="username"]')) {
            if (this.value.length >= 3 && this.value.length <= 10) {
                // console.log($(this).next());
                isCorrect();
                formValue.name = this.value;
            } else {
                isIncorrect();
            }
        }
        if ($(this).is('[name="password"]')) {
            if (this.value.length >= 6) {
                isCorrect();
                formValue.password = this.value;
            } else {
                isIncorrect();
            }
        }
        if ($(this).is('[name="repassword"]')) {
            // console.log($('input[name="password"]')[0].value);
            if (this.value == $('input[name="password"]')[0].value) {
                isCorrect();
                formValue.repassword = this.value;
            } else {
                isIncorrect();
            }
        }
        if ($(this).is('[name="email"]')) {
            // console.log(this.value);
            if (/^(\w)+(\.\w+)*@(\w)+(\.\w)+/.test(this.value)) {
                isCorrect();
                formValue.email = this.value;
            } else {
                isIncorrect();
            }
        }
    });

    $('#register_button').click(function () {
        console.log(formValue);
        $.post('/signup', formValue, function (data) {
            console.log(data);
            window.location = data.redirect;
        });
    });
});
