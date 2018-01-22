import jsonfile from 'jsonfile'
import path from 'path'
import mv from 'mv'
import { ai_generate_web_svg, close_all_docs} from './script_runner'
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
       
        await ai_generate_web_svg()
    
        await check_for_output(file_name)

        close_all_docs()
        
        update_embeded_links(file_name)

        console.log(`svg asset ${file} generated`)
        mv(processing_dir+file, processed_dir+file, err => err? console.error(err): console.log(`asset ${file} moved to processed`))
    
        scrub()
        resolve(`${file} Processed`)
    })
}

function check_for_output() {
    return new Promise((resolve, reject) => {    
        let params = { persistent: true, ignoreInitial: false, ignore:  /(^|[\/\\])\../  }
        let watcher = chokidar.watch(generated_svg_dir, params)
        watcher.on('add', generated_svg_dir => {
           let file =  generated_svg_dir.split('/').pop()
            file != '.DS_Store' ? resolve() : null 
        })
    })
}


function scrub(){
    fs.unlinkSync(temp_dir+'order.json')
    fs.existsSync(generated_svg_dir+'web_svg-01.svg') ? fs.unlinkSync(generated_svg_dir+'web_svg.svg') : null
    fs.existsSync(generated_svg_dir+'web_svg1.png') ? fs.unlinkSync(generated_svg_dir+'web_svg1.png') : null 
}


function update_embeded_links(file_name){
    let files = fs.readdirSync(generated_svg_dir)   
    files = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item)) 
    if(files.length > 1){
       let string = fs.readFileSync(`${generated_svg_dir}web_svg-01.svg`, 'utf8')
       string =  string.replace('web_svg1.png', file_name+'.png')
       try{
         fs.writeFileSync(`${svg_repo}${file_name}.svg`, string)
         fs.unlinkSync(`${generated_svg_dir}web_svg-01.svg`)
         mv(`${generated_svg_dir}web_svg1.png`, `${svg_repo}${file_name}.png`, err => err? console.error(err): console.log(`${file_name}.png oved to SVG repo`))
        }
       catch(e){
           console.error(e)
        }
    } else {
        mv(`${generated_svg_dir}web_svg-01.svg`, `${svg_repo}${file_name}.svg`, err => err? console.error(err): console.log(`${file_name}.svg has been generated`))
    }   
}