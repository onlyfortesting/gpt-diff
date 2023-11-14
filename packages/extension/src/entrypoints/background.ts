import { sendMessage } from 'common/message'
import { localExtStorage } from '@webext-core/storage';

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(async () => {
    browser.contextMenus.create({
      id: 'main',
      title: "GPT Diff",
      contexts: ['page', 'editable', "selection"],
    });
    browser.contextMenus.onClicked.addListener(
      (e, tab) => {
        sendMessage('start', { selection: e.selectionText || '', editable: e.editable }, tab.id)
        console.log(e)
        console.log(tab)
      }
    )

    await localExtStorage.setItem('key', '')
    await localExtStorage.setItem('temp', 0)
    await localExtStorage.setItem('gptVersion', '3.5-turbo')

    if (import.meta.env.DEV) {
      await localExtStorage.setItem('key', import.meta.env.VITE_OPENAI_API_KEY)
    }

    const templates = await localExtStorage.getItem('templates');

    if (!templates) {
      let startTemplates = [
        {
          id: 1,
          type: 'transform',
          name: "🔧 Fix Grammars",
          description:
            "Use GPT to fix grammars without changing the structure of your sentences.",
          prompt: `Fix grammars:\n{{text}}`,
        },
        {
          id: 2,
          type: 'transform',
          name: "📝 Use Proper English",
          description:
            "Rewords your whole text to make use of proper english and make it professional and respectful.",
          prompt: `Convert to proper english:\n{{text}}`,
        },
        {
          id: 3,
          type: 'transform',
          name: "🧑‍💻 Create a dialog",
          description:
            "Rewords your whole text to make use of proper english and make it professional and respectful.",
          prompt: `Create a dialog using this scenario:\n{{text}}`,
        },
        {
          id: 4,
          type: 'generate',
          name: "🔧 Generate a paragraph",
          description:
            "Gen a par",
          prompt: `Generate 3 english sentences`,
        },
      ]
      await localExtStorage.setItem('templates', startTemplates)
    }


  })
});
