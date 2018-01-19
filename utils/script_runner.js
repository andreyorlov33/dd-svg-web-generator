import applescript from 'applescript'
import path from 'path'

const working_dir = path.join(__dirname+'/')


export function run_svg_gen(){
    return new Promise ((resolve, reject)=>{
        applescript.execFile(working_dir+'generation_action.applescript', (err, result)=>{
            if(err){reject(err)}
            resolve(result)
        })
    })
}

export function open_file_in_illustrator(){
    return new Promise ((resolve, reject)=>{
        applescript.execFile(working_dir+'open_svg.applescript', (err, result)=>{
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