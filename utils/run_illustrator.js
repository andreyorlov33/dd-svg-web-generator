import applescript from 'applescript'

export default function run_script(){
    return new Promise ((resolve, reject)=>{
        applescript.execFile('./script.applescript', (err, result)=>{
            if(err){reject(err)}
            resolve(result)
        })
    })
}