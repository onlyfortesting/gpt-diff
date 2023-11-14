import './app.css'
import { command, text, editable } from "shared/app"
import { Bellhop } from 'bellhop-iframe';
import App from './App.svelte';

const app = new App({
  target: document.querySelector('#app')
})

const bellhop = new Bellhop()
bellhop.connect()

bellhop.on('init', (e) => {
  text.set(e.data.selection)
  editable.set(e.data.editable)
})

command.exit = () => {
  app.$destroy()

  bellhop.send('exit')
  bellhop.destroy()
}

command.done = (result) => {
  bellhop.send('done', { result })
  command.exit()
}
