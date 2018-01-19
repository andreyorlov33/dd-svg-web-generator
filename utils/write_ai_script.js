// MODULE FOR NEW ENVIRONMENT SCRIPT PRODUCTION 
// RUN MODULE AND COPY THE PRODUCED FILE TO YOUR LOCAL ILLUSTRATOR >> PRESETS >>> SCRIPTS 
// RESTART ILLUSTRATOR AND THE SCRIPT WILL BE LOADED

import fs from  'fs'
import path from 'path'

const temp_dir = path.join(__dirname,'../temp/')
const utils_folder = path.join(__dirname)
let javascript_string = 

`#include "./json2.js" //
function loadJSON(relPath) {
    var script = new File($.fileName);
    // EDIT THE JSONFILE PATH BASED ON THE TEMP DIRECTORY PATH ... 
    var jsonFile = new File('${temp_dir}/order.json');
    jsonFile.open('r');
    var str = jsonFile.read();
    jsonFile.close();
    return JSON.parse(str);
}

(function start() {
    try {
        app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS
        var order = loadJSON('${temp_dir}/order.json')
        var path = order.file_path
        var AIFile = new File(path)
        app.open(new File(AIFile)) 
    }
    catch(e){
        alert(e)
    }
})();`

export default function produce_ai_script(){
    try{
        fs.writeFileSync(utils_folder+'/TEST.jsx', javascript_string, 'utf8')
    }
    catch(e){
        console.error(e)
    }
}