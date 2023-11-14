/**
 * The remark plugin for supporting numbered headings ids
 * @author iloveip
 */

import { visit } from 'unist-util-visit'
import { slugify } from './text.js'

var defaultPrefix = 'id'

function autoHeadingIds(options) {
  var settings = options || {}
  var prefix = settings.prefix || defaultPrefix
  return transformer

  function transformer(ast) {
    var count = 1

    visit(ast, 'heading', visitor)

    function visitor(node) {
      var data = node.data || (node.data = {})
      var props = data.hProperties || (data.hProperties = {})

      let heading = node.children.map(c => c.value).join('')

      let match = heading.match(/(\d+\.)?(.+)/)
      props.id = slugify(match[2].trim())
    }
  }
}

export default autoHeadingIds
