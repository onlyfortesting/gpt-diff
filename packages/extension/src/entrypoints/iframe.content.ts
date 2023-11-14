import { Bellhop } from 'bellhop-iframe';
import { onMessage } from 'common/message'

export default defineContentScript({
  matches: ['*://*/*'],
  runAt: "document_end",

  main(ctx) {
    let isRunning = false
    let activeElement

    onMessage('start', (e) => {
      if (isRunning)
        return

      isRunning = true

      const ui = createContentScriptIframe(ctx, {
        page: '/iframe-src.html',
        type: 'modal',
        anchor: 'body',
      });

      ui.wrapper.style.cssText = 'position:fixed;inset:0;z-index:9999999'
      ui.iframe.style.cssText = 'width:100%;height:100%'

      activeElement = document.activeElement
      ui.mount();

      const bellhop = new Bellhop();
      bellhop.connect(ui.iframe);

      bellhop.send('init', {
        ...e.data
      })

      bellhop.on('exit', () => {
        isRunning = false
        ui.remove()
        console.log('gpt-diff exited')
      })

      bellhop.on('done', (event) => {
        let result = event.data.result
        console.log('DONE')
        if (e.data.editable) {
          replaceSelectedText(result, activeElement)
        } else {
          copyTextToClipboard(result)
        }
      })
    })
  },
})

function replaceSelectedText(replacementText, activeElement) {
  let sel, range;
  console.log(activeElement?.tagName)
  if (activeElement?.tagName.match(/input|textarea/i)) {
    replaceInputSelection(replacementText, activeElement)
  } else if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(replacementText));
    }
  } else if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    range.text = replacementText;
  }
}

function copyTextToClipboard(text) {
  const el = document.createElement('textarea');
  el.value = text;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

function replaceInputSelection(replacementText, element) {
  // obtain the object reference for the textarea>
  let input = element
  // obtain the index of the first selected character
  let start = input.selectionStart;
  // obtain the index of the last selected character
  let finish = input.selectionEnd;
  //obtain all Text
  let allText = input.value;

  let newText = allText.slice(0, start) + replacementText + allText.slice(finish, allText.length);

  input.value = newText;
}
