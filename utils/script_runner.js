import applescript from 'applescript'
import path from 'path'

const working_dir = path.join(__dirname+'/')

export function ai_generate_web_svg(){
    return new Promise ((resolve, reject)=>{
        applescript.execFile(working_dir+'ai_generate_web_svg.applescript', (err, result)=>{
            if(err){reject(err)}
            resolve('file opened')
        })
    })
}

export function close_all_docs(){
    return new Promise ((resolve, reject)=>{
        applescript.execFile(working_dir+'close_all_docs.applescript', (err, result)=>{
            if(err){reject(err)}
            resolve('file opened')
        })
    })
}