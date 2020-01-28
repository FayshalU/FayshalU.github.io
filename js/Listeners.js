class Listeners {
    constructor (commands) {
        this.commands = commands;
        $('.command-input').focus();
        this.eventListeners();
    };

    eventListeners() {
        let term = $('#terminal');
        $(term).click(() => {
            $('.command-input').last().focus();
        });

        $(term).keyup((event) => {
            alert( event.keyCode );
            $(".command-input").innerHTML += event.keyCode;
        });

        // $("#terminal").on('keyup', function(e) {
        //     alert( e.keyCode );
        //     $(".command-input").innerHTML += e.keyCode;
        // });
    }
}