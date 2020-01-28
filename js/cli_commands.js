// global vars
const commands = {}
let commandData = {}
const rootPath = 'root'
  
// initialize cli
$(() => {
    const listenerObj = new Listeners(commands);

    $.getJSON( "data/commandData.json", function( data ) {
        commandData = data;
    });
})

// view list of possible commands
commands.help = () => systemData.help;