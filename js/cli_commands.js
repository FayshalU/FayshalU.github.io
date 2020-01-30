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

// view list of items in the current directory
commands.ls = () => {
    const currentDir = localStorage.path.split('/').slice(-1)[0];
    console.log(currentDir);
    if (!currentDir in commandData.dir) {
        return commandData.dirError;
    }
    else {
        return commandData.dir[currentDir];
    }
}