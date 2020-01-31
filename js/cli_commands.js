// global vars
const commands = {};
let commandData = {};
localStorage.path = '/home/fayshal';
  
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

getCurrentDir = () => localStorage.path.split('/').slice(-1)[0];

// view list of items in the current directory
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