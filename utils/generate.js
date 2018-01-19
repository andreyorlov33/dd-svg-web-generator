import jsonfile from 'jsonfile'
import path from 'path'
import mv from 'mv'
import {run_svg_gen, open_file_in_illustrator, close_all_docs} from './script_runner'
import chokidar from 'chokidar'
import fs from 'fs'

const temp_dir = path.join(__dirname,'../temp/')
const processing_dir = path.join(__dirname,'../processing/')
const generated_svg_dir = path.join(__dirname,'../generated_svgs/')
const processed_dir = path.join(__dirname,'../processed/')
const input_dir = path.join(__dirname,'../input/')
const svg_repo = path.join(__dirname,'../svg_repo/')

export default function generate(file){
    return new Promise (async (resolve, reject)=>{
        
        let file_name = file.split('.').shift()
        let file_path = processing_dir + file
        let item = {file_path: processing_dir+file}
      
        jsonfile.writeFile(temp_dir+'order.json', item , err => err? console.log(err): console.error('json writtem'))
       
        mv(input_dir+file, processing_dir+file, err => err? console.error(err): console.log(`asset ${file} moved to processing`))
       
        await open_file_in_illustrator()
       
        await run_svg_gen()
        await check_for_output()

        console.log(`svg asset ${file} generated`)
        
        fs.unlinkSync(temp_dir+'order.json')
        
        mv(processing_dir+file, processed_dir+file , err => err ? console.error(err): null)
        
        mv(`${generated_svg_dir}web_svg.svg`, `${svg_repo}${file_name}.svg`, err => err? console.error(err): null)
        
        scrub()
   
        resolve(`${file} Processed`)
    })
}

function check_for_output() {
    return new Promise((resolve, reject) => {    
        let params = { persistent: true, ignoreInitial: false, ignore:  /(^|[\/\\])\../  }
        let watcher = chokidar.watch(generated_svg_dir, params)
        watcher.on('add', (generated_svg_dir) => {
            let file = generated_svg_dir.split('\/').pop()
             if(file == 'web_svg.svg'){resolve()}
        })
    })
}


function scrub(){
    if(fs.existsSync(generated_svg_dir+'web_svg1.png') || fs.existsSync(generated_svg_dir+'web_svg.svg')){
        let files = fs.readdirSync(generated_svg_dir)
        files = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item))
        files.forEach(file => fs.unlinkSync(generated_svg_dir+file))
    }
}