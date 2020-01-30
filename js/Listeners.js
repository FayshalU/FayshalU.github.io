class Listeners {
    constructor (commands) {
        this.commands = commands;
        $('.command-input').focus();
        this.eventListeners();
        this.term = document.getElementById("terminal");
    };

    eventListeners = () => {
        const term = $('#terminal');
        $(term).click(() => {
            $('.command-input').last().focus();
        });

        $(term).keypress((event) => {
            // console.log(event.target.textContent);
            if (event.keyCode == 13) {
                // console.log(event.target.textContent);
                const inputArr = event.target.textContent.trim().split(' ');
                if (inputArr[0] in this.commands) {
                    this.renderContent(inputArr);
                }
                this.resetCursor(event.target);
                event.preventDefault();
            }
        });

        // $("#terminal").on('keyup', function(e) {
        //     alert( e.keyCode );
        //     $(".command-input").innerHTML += e.keyCode;
        // });
    }

    renderContent = (inputArr) => {
        const data = this.generateElement(this.commands[inputArr[0].trim()](inputArr[1]));
        this.term.innerHTML += data;
    }

    generateElement = (data) => {
        if (!data) {
            return '';
        }
        let elements = ''
        if (data.li) {
            elements += `<ul><li>${ data.li.join('</li><li>') }</li></ul>`;
        }
        if (data.file) {
            elements += `<p>${ data.file.join('.txt &nbsp&nbsp ') }.txt</p>`;
        }
        if (data.dir) {
            elements += `<p><span class='dir'>${ data.dir.join(' &nbsp&nbsp') }</span></p>`;
        }
        if (typeof data === 'string') {
            elements = data;
        }
        return elements;
    }

    resetCursor = (prompt) => {
        const newPrompt = $(prompt).parent().clone();
        $(prompt).attr('contenteditable', false);
        $('#terminal').append(newPrompt);
        newPrompt.find('.command-input').last().empty().focus();
    }
}