class Listeners {
    constructor (commands) {
        this.commands = commands;
        $('.command-input').focus();
        this.eventListeners();
        this.term = document.getElementById("terminal");
        this.lastDir = '';
        this.historyIndex = getHistory().length;
    };

    eventListeners = () => {
        const term = $('#terminal');
        $(term).click(() => {
            $('.command-input').last().focus();
        });

        $(term).keydown((event) => {
            if (event.keyCode == 13) {
                // Enter pressed
                const inputfield = event.target;
                const inputArr = inputfield.textContent.trim().split(' ');
                if (inputArr[0].trim() == 'clear' && !inputArr[1]) {
                    this.clearScreen();
                }
                else if (inputArr[0] in this.commands) {
                    this.renderContent(inputArr);
                    this.resetCursor(inputfield);
                }
                else if (inputArr[0] == '') {
                    this.resetCursor(inputfield);
                }
                else {
                    this.term.innerHTML += 'Invalid argument';
                    this.resetCursor(inputfield);
                }
                event.preventDefault();
                if (inputArr[0].trim() != '') {
                    setHistory(inputfield.textContent);
                    this.historyIndex = getHistory().length;
                }
            }
            else if (event.keyCode == 38) {
                // Up arrow pressed
                if (getHistory().length > 0 && this.historyIndex > 0) {
                    $('.command-input').last().html(getHistory()[this.historyIndex-1]);
                    this.historyIndex--;
                }
            }
            else if (event.keyCode == 40) {
                // Down arrow pressed
                if (getHistory().length > this.historyIndex) {
                    this.historyIndex++;
                    $('.command-input').last().html(getHistory()[this.historyIndex]);
                }
            }
        });

        // $("#terminal").on('keyup', function(e) {
        //     alert( e.keyCode );
        //     $(".command-input").innerHTML += e.keyCode;
        // });
    }

    // clear CLI
    clearScreen = () => {
        const currDir = getCurrentDir() == 'fayshal' ? '' : `/${getCurrentDir()}`;
        $('#terminal').html(
            `<p class="hidden">
                <span class="prompt">
                    <span class="path">Fayshal@root${currDir}</span>
                    <span class="arrow">❯</span>
                </span>
                <span contenteditable="true" class="command-input"></span>
            </p>`
          )
        $('.command-input').focus()
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
        if (data.cd) {
            if (data.cd === 1) {
                this.lastDir = $('.path').last().html();
                $('.path').last().html('Fayshal@root');
            }
            else if (data.cd === 2) {
                this.lastDir = $('.path').last().html();
                $('.path').last().html(`Fayshal@root/${data.path}`);
            }
            else if (data.cd === 3) {
                elements = data.err;
            }
        }
        if (typeof data === 'string') {
            elements = data;
        }
        return elements;
    }

    resetCursor = (inputfield) => {
        const newInput = $(inputfield).parent().clone();
        if (this.lastDir) {
            $(".path").last().html(this.lastDir);
            this.lastDir = '';
        }
        $(inputfield).attr('contenteditable', false);
        $('#terminal').append(newInput);
        newInput.find('.command-input').last().empty().focus();
    }
}