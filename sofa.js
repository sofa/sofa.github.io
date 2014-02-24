(function() {

    var form       = $('#nl-form');
    var field      = form.find('input');
    var warning    = $('#nl-warning');
    var w_state    = 'hidden';
    var msgCtnr    = $('#message-container');
    var msg        = $('#message');
    var msgContent = $('#msg-content');
    var msgBtn     = msg.find('button');

    msgBtn.on('click', function () {
        msgCtnr.removeClass('active');
    });

    var addMessage = function (type, str) {
        msg[0].className = 'alert alert-' + type;
        msgContent.html(str);
        msgCtnr.addClass('active');
    };

    var request = function (email) {
        $.ajax({
            type: 'post',
            url: 'http://couchcommerce.us5.list-manage.com/subscribe/post-json?u=02aba441fd2a29ce779d08303&id=11d4ef38e7&EMAIL=' + email +'&c=?',
            dataType: 'jsonp'
        }).done(function (r) {
                if (r.result === 'success') {
                    addMessage('success', r.msg)
                } else {
                    addMessage('danger', r.msg)
                }
            }).fail(function (r) {
                addMessage('danger', 'Something went wrong. Please try again later or get in touch with support@couchcommerce.com.');
            });
    };

    var isValidEmail = function (str) {
        var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        return !!str.match(pattern);
    };

    var checkMailField = function () {
        field.on('keyup', function () {
            if (isValidEmail(this.value)) {
                hideWarning();
            }
        });
    };

    var showWarning = function () {
        warning.removeClass('hidden');
        w_state = 'visible';
        checkMailField();
    };

    var hideWarning = function () {
        warning.addClass('hidden');
        w_state = 'hidden';
        field.off('keyup');
    };

    form.on('submit', function (e) {
        e.preventDefault();

        var value = field.val();

        if (value && value !== '') {

            if (isValidEmail(value)) {
                hideWarning();
                request(value);
            } else {
                showWarning();
            }

        }
    });

})();
