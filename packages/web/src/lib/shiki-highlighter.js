import { getHighlighter } from 'shikiji';

const THEME = 'github-dark';

/**
 * Returns code with curly braces and backticks replaced by HTML entity equivalents
 * @param {string} code - highlighted HTML
 * @returns {string} - escaped HTML
 */
function escapeHtml(code) {
  return code.replace(
    /[{}`]/g,
    (character) => ({
      '{': '&lbrace;',
      '}': '&rbrace;',
      '`': '&grave;',
    })[character],
  );
}

/**
 * Returns array of line numbers to be highlghted
 * @param {string} rangeString - range string to be parsed (e.g. {1,3-5,8})
 * @returns {number[]}
 */
function rangeParser(rangeString) {
  const result = [];
  const ranges = rangeString.split(',');
  ranges.forEach((element) => {
    if (element.indexOf('-') === -1) {
      result.push(parseInt(element, 10));
    } else {
      const limits = element.split('-');
      const start = parseInt(limits[0], 10);
      const end = parseInt(limits[1], 10);
      for (let i = start; i <= end; i += 1) {
        result.push(i);
      }
    }
  });
  return result;
}

/**
 * @param code {string} - code to highlight
 * @param lang {string} - code language
 * @param meta {string} - code meta
 * @returns {string} - highlighted html
 */
async function highlighter(code, lang, meta) {
  const shiki = await getHighlighter({
    themes: [THEME],
  });

  if (!lang) lang = null;
  else await shiki.loadLanguage(lang);

  await shiki.loadTheme(THEME);

  const html = shiki.codeToHtml(code, { lang, theme: "github-dark" });

  return escapeHtml(html);
}

export default highlighter;
