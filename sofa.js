;(function() {

    var $form = $('#nl-form'),
        $email = $('#email'),
        $warning = $('#nl-warning'),
        $submit = $('#submit'),
        $messageContent = $('#msg-content'),
        $message = $('#message'),
        $messageContainer = $('#message-container'),
        $messageButton = $message.find('button');


    disableFormButton();

    $email.on('blur', function () {
      if (!emailIsValid($email[0].value)) {
        showWarning();
        disableFormButton();
      } else {
        enableFormButton();
      }
    });

    $form.on('submit', function (event) {
      event.preventDefault();
      if (emailIsValid($email[0].value)) {
        $.ajax({
            type: 'post',
            url: 'http://couchcommerce.us5.list-manage.com/subscribe/post-json?u=02aba441fd2a29ce779d08303&id=11d4ef38e7&EMAIL=' + $email[0].value +'&c=?',
            dataType: 'jsonp'
        }).done(function (response) {
            if (response.result === 'success') {
              addMessage('success', response.msg);
            } else {
              addMessage('danger', response.msg);
            }
        }).fail(function () {
            addMessage('danger', 'Something went wrong. Please try again later or get in touch with support@couchcommerce.com.');
        });
      } else {
        showWarning();
      }
    });

    $messageButton.on('click', function () {
        $messageContainer.removeClass('active');
    });

    function emailIsValid(str) {
      var pattern = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      return !!str.match(pattern);
    }

    function showWarning() {
      $warning.removeClass('hidden');
    }

    function disableFormButton() {
      $submit.addClass('disabled');
      $submit.attr('disabled', true);
    }

    function enableFormButton() {
      $submit.removeClass('disabled');
      $submit.prop('disabled', false);
    }

    var addMessage = function (type, str) {
        $message[0].className = 'alert alert-' + type;
        $messageContent.html(str);
        $messageContainer.addClass('active');
    };
})();
