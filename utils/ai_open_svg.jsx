#include "./json2.js" //
// PLACE THIS SCRIPT INTO THE ILLUSTRATOR >> PRESETS >> SCRIPTS FOLDER AND RESTART ILLUSTRATOR 

function loadJSON(relPath) {
    var script = new File($.fileName);
    // EDIT THE JSONFILE PATH BASED ON THE TEMP DIRECTORY PATH ... 
    var jsonFile = new File('/Users/uv/Desktop/dd-svg-generator/temp/order.json');
    jsonFile.open('r');
    var str = jsonFile.read();
    jsonFile.close();
    return JSON.parse(str);
}

(function start() {
    try {
        app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS
        var order = loadJSON('/Users/uv/Desktop/dd-svg-generator/temp/order.json')
        var path = order.file_path
        var AIFile = new File(path)
        app.open(new File(AIFile)) 
    }
    catch(e){
        alert(e)
    }
})();