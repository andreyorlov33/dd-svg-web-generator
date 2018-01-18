import fs from 'fs'
import inquirer from 'inquirer'
import chokidar from 'chokidar'
import applescript from 'applesctipt'
import run_script from './utils/run_illustrator'
import * as prompt from './utils/prompts'

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
        this.staged_files = files
        process.stdout.write('/n Following files are staged for generation')
        files.map(i => process.stdout.write(`${i} \n`))
        cli(prompt.start)
        .then(answer => asnwer.start ? this.run_batch : process.exit(0))
    }
    run_batch(){
        this.staged_files.map( async i => await generate(i))
        this.init()
    }
    clear(){
        process.stdout.write('\x1Bc')
    }
}