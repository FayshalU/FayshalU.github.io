class Listeners {
    constructor (commands) {
        this.commands = commands;
        $('.command-input').focus();
        this.eventListeners();
    };

    eventListeners = () => {
        const term = $('#terminal');
        $(term).click(() => {
            $('.command-input').last().focus();
        });

        $(term).keypress((event) => {
            // console.log(event.target.textContent);
            if (event.keyCode == 13) {
                console.log(event.target.textContent);
                const inputArr = event.target.textContent.trim().split(' ');
                if (inputArr[0] in this.commands) {
                    this.renderContent(inputArr);
                }
                this.resetCursor(event.target);
            }
        });

        // $("#terminal").on('keyup', function(e) {
        //     alert( e.keyCode );
        //     $(".command-input").innerHTML += e.keyCode;
        // });
    }

    renderContent = (inputArr) => {
        console.log(this.commands);
        const data = this.generateElement(this.commands[inputArr[0]](inputArr[1]));
        console.log(data);
        document.getElementById("terminal").innerHTML += data;
    }

    generateElement = (data) => {
        if (!data) {
            return '';
        }
        else if (data.li) {
            return `<ul><li>${ data.li.join('</li><li>') }</li></ul>`;
        }
    }

    resetCursor = (prompt) => {
        const newPrompt = prompt.parentNode.cloneNode(true)
        prompt.setAttribute('contenteditable', false)
        if (this.prompt) {
            newPrompt.querySelector('.prompt').textContent = this.prompt
        }
        document.getElementById("terminal").appendChild(newPrompt)
        newPrompt.querySelector('.command-input').innerHTML = ''
        newPrompt.querySelector('.command-input').focus()
    }
}