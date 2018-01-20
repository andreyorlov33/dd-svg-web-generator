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

        var artboard_names = ''
        var ArtBoards = app.activeDocument.artboards
        for (var i = 0; i < ArtBoards.length; i++) {
            if (i == 0) {
                artboard_names = ArtBoards[i].name
            } else {
                artboard_names = artboard_names + ',' + ArtBoards[i].name
            }
        }

        while ( app.activeDocument.placedItems.length > 0 ) {
            alert(app.activeDocument.placedItems.name)
            placedArt = app.activeDocument.placedItems[0];
            placedArt.embed();
        }
       
        var asset_name = path.split('/').pop().split('.').shift()
        var export_path = '/Users/uv/Desktop/dd-svg-generator/generated_svgs/' + asset_name
        var file = new File(export_path)
        var export_options = new ExportOptionsSVG()
        var type = ExportType.SVG

        export_options.embedRasterImages = true
        export_options.coordinatePrecision = 7
        export_options.includeUnusedStyles = false
        export_options.cssProperties = SVGCSSPropertyLocation.STYLEELEMENTS
        export_options.embedLinkedFiles = true
        export_options.saveMultipleArtboards = true
        export_options.artboardRange = "1"
        export_options.documentEncoding = SVGDocumentEncoding.UTF8
        app.activeDocument.exportFile(file, type, export_options)

    }
    catch (e) {
        alert(e)
    }
})();

