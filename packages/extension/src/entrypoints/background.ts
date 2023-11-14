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
          type: 'transform',
          name: "🔧 Fix Grammars",
          description:
            "Fix grammars without changing the structure of your sentences",
          prompt: `Fix grammars:\n{{text}}`,
        },
        {
          type: 'transform',
          name: "📝 Use Proper English",
          description:
            "Rewords your text to make use of proper english",
          prompt: `Convert to proper english:\n{{text}}`,
        },
        {
          type: 'transform',
          name: "🔄 Rewrite for Clarity",
          description:
            "Enhance the clarity of the selected text",
          prompt: `Rewrite for clarity:\n{{text}}`,
        },
        {
          type: 'transform',
          name: "🔀 Paraphrase Sentences",
          description:
            "Provide alternative phrasing for the selected sentences",
          prompt: `Provide alternative phrasing:\n{{text}}`,
        },
        {
          type: 'transform',
          name: "🗑️ Remove Redundancy",
          description:
            "Identify and eliminate redundant phrases",
          prompt: `Eliminate redundant phrases:\n{{text}}`,
        },
        {
          type: 'transform',
          name: "🗣️ Formal Tone",
          description:
            "Adjust the tone of the selected text into formal tone",
          prompt: `Rewrite to formal tone:\n{{text}}`,
        },
        {
          type: 'transform',
          name: "🧠 Simplify Language",
          description:
            "Simplify complex sentences for easier understanding",
          prompt: `Simplify for easier understanding:\n{{text}}`,
        },
        {
          type: 'transform',
          name: "✍️ Enhance Descriptions",
          description:
            "Elaborate on brief descriptions to provide more context",
          prompt: `Elaborate to provide more context:\n{{text}}`,
        },
        {
          type: 'generate',
          name: "📝 Summarize Paragraph",
          description:
            "Summarize the selected paragraph to its key points",
          prompt: `Summarize:\n{{text}}`,
        },
        {
          type: 'generate',
          name: "🌟 Convert to Bullet Points",
          description:
            "Transform a block of text into a bullet-pointed list",
          prompt: `Transform into a bullet-pointed list:\n{{text}}`,
        },
      ].map((c, i) => ({ ...c, id: i }))
      await localExtStorage.setItem('templates', startTemplates)
    }


  })
});
