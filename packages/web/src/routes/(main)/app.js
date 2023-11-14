import { derived, get, writable } from 'svelte/store'
import { uid } from 'uid'
import { OpenAI } from "openai"
import { localExtStorage } from "@webext-core/storage"

export const template = writable(null)
export const text = writable('')
export const editable = writable(false)
export const totalDiff = writable(0)
export const history = writable([])
export const isFirstMount = writable(true)


export const gptModel = {
  '3.5-turbo': {
    name: '3.5',
    model: "gpt-3.5-turbo",
  },
  '4': {
    name: '4 Standard',
    model: "gpt-4",
  },
  '4-turbo': {
    name: '4',
    model: "gpt-4-1106-preview",
  },
}

export const gptVersion = writable(await localExtStorage.getItem("gptVersion"))
export const key = writable(await localExtStorage.getItem("key"))
export const temp = writable(await localExtStorage.getItem("temp"))
export let openai

key.subscribe((v) => {
  console.log('set openai')
  openai = new OpenAI({
    apiKey: get(key),
    dangerouslyAllowBrowser: true,
  })
})

export const nav = (() => {
  let x = writable({
    history: ['main']
  })

  return {
    store: x,
    goto(page) {
      x.update(c => {
        if (page === c.history[c.history.length - 1])
          return c

        c.history.push(page)
        return c
      })
    },
    back() {
      x.update(c => {
        if (c.history.length <= 1)
          return c

        c.history.pop()
        return c
      })
    },
    set(history) {
      x.update(c => ({ ...c, history }))
    },
  }
})()

export const page = derived(nav.store, ($nav) => $nav.history[$nav.history.length - 1])

export const mouse = writable({
  ax: 0, ay: 0,
  x: 0, y: 0, isDrag: false,
})

let ts = await localExtStorage.getItem('templates')
export const templates = writable(ts)

export const command = {
  exit() {
    console.log('EXIT')
  },
  done() {
    console.log('DONE')
  },
  addHistory(data) {
    let { type, prompt, response } = data
    let x = {
      id: uid(),
      model: get(gptVersion).model,
      type,
      prompt,
      response,
      text: get(text),
      date: new Date().toISOString(),
    }
    history.update(c => {
      let z = [x, ...c]
      localExtStorage.setItem('history', z)
      return z
    })
  },
  addTemplate(newTemplate) {
    newTemplate.id = uid()
    templates.update(c => [...c, newTemplate])
  },
  editTemplate(template, newVal) {
    templates.update(c => {
      let index = c.indexOf(template)

      if (index === -1)
        throw `template doesn't exist`

      if (newVal)
        c.splice(index, 1, { ...c[index], ...newVal })
      else
        c.splice(index, 1)

      return c
    })
  },
  deleteTemplate(template) {
    this.editTemplate(template)
  },
}
