// global vars
const commands = {};
let commandData = {};
localStorage.path = '/home/fayshal';
  
// initialize cli
$(() => {
    const listenerObj = new Listeners(commands);
    $.getJSON( "data/commandData.json", function( data ) {
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

getCurrentDir = () => localStorage.path.split('/').slice(-1)[0];

// view list of items in the current directory
commands.ls = () => {
    const currentDir = localStorage.path.split('/').slice(-1)[0];
    if (!getCurrentDir() in commandData.dir) {
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
        return localStorage.path;
    }
    else if (dir in commandData.dir) {
        if (dir != 'fayshal') {
            paths = localStorage.path.split('/');
            if (paths.length == 3) {
                return localStorage.path += '/'+dir;
            }
        }
    }
    return commandData.errors.dirNotFound;
}