// global vars
let commands = {};
let commandData = {};
localStorage.path = '/home/fayshal';
let history = [];
const availableComands = ['pwd', 'ls', 'cd', 'help', 'clear', 'history', 'cat', 'mkdir', 'rmdir', 'touch', 'move', 'copy', 'grep', 'find', 'echo', 'sudo', 'chmod'];
const availableArgs = ['fayshal', 'projects', 'skills', 'about', 'resume', 'contact', 'ohannah', 'criclive', 'self-learn', 'mytube', 'simplemanagement', 'proficient', 'familiar', 'learning'];
  
// initialize cli
$(() => {
    const listenerObj = new Listeners(commands);
    $.getJSON( 'data/commandData.json', function( data ) {
        commandData = data;
    });
})

// view list of possible commands
commands.help = () => {
    return commandData.help;
}

// view present work directory
commands.pwd = () => {
    return localStorage.path;
}

let getCurrentDir = () => localStorage.path.split('/').slice(-1)[0];

let setHistory = (cmd) => history.push(cmd);

let getHistory = () => history;

// view list of items in the current directory)
commands.ls = () => {
    const currentDir = localStorage.path.split('/').slice(-1)[0];
    if (!(getCurrentDir() in commandData.dir)) {
        return commandData.errors.dirError;
    }
    else {
        return commandData.dir[currentDir];
    }
}

// change directory
commands.cd = (dir) => {
    if (dir == '..') {
        if (localStorage.path.split('/').slice(-1)[0] != 'fayshal') {
            pathArr = localStorage.path.split('/');
            pathArr.pop();
            localStorage.path = pathArr.join('/');
        }
        return {cd: 1};
    }
    else if (dir in commandData.dir) {
        if (dir != 'fayshal') {
            paths = localStorage.path.split('/');
            if (paths.length == 3) {
                localStorage.path += `/${dir}`;
                return {cd: 2, path: dir};
            }
        }
    }
    return {cd: 3, err: commandData.errors.dirNotFound};
}

// read file
commands.cat = (file) => {
    const currDir = getCurrentDir();
    if (commandData.dir[currDir] && commandData.dir[currDir].file) {
        const fileName = commandData.dir[currDir].file.find((f) => f == file);
        if (fileName) {
            return commandData[fileName];
        }
    }
    return commandData.errors.fileNotFound;
}

// view the history
commands.history = () => {
    if (getHistory().length > 0) {
        return `<p>${getHistory().join('<br>')}</p>`;
    }
    return '';
}

// view suggestion
let getSuggestion = (input) => {
    const inputArr = input.split(' ');
    if (inputArr.length == 1) {
        return availableComands.find((cmd) => cmd.indexOf(inputArr[0]) == 0) || '';
    }
    else if (inputArr.length == 2) {
        return `${inputArr[0]} ${availableArgs.find((args) => args.indexOf(inputArr[1]) == 0) || ''}`;
    }
    return '';
}