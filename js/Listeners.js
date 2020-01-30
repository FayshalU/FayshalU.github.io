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
        return elements;
    }

    resetCursor = (prompt) => {
        console.log(prompt.parentNode);
        const newPrompt = prompt.parentNode.cloneNode(true);
        console.log(newPrompt);
        prompt.setAttribute('contenteditable', false);
        this.term.appendChild(newPrompt)
        newPrompt.querySelector('.command-input').innerHTML = ''
        newPrompt.querySelector('.command-input').focus()
    }
}