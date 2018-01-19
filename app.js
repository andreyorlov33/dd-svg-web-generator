import fs from 'fs'
import inquirer from 'inquirer'
import * as prompt from './utils/prompts'
import generate from './utils/generate'
import {close_all_docs} from './utils/script_runner'

const cli = inquirer.createPromptModule()

class App {
    constructor(props){
        this.staged_files = []
        this.generating = false
        this.generating_asset_name = null
    }

    init(){
        this.clear()
        this.generating_asset_name = null
        cli(prompt.init)
        .then(answer => answer.init ? this.start(): process.exit(0))

    }
    start(){
        let files = fs.readdirSync('./input/')
        files = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item))
        this.staged_files = [...files]
        process.stdout.write('\n Following files are staged for generation... \n')
        files.map(i => process.stdout.write(`${i} \n`))
        cli(prompt.start)
        .then(answer => answer.start ? this.run_batch() : process.exit(0))
    }
    async run_batch(){
        console.log('initiating batch process ... \n')
        for(let i in this.staged_files){
            console.log('*********************** \n')
            let item = this.staged_files[i]
            await generate(item)
        }
        close_all_docs()
        this.init()
    }
    clear(){
        process.stdout.write('\x1Bc')
    }
}

let intance = new App()
intance.init()