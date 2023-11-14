const getFilenameFromPath = (text) => text.match(/^(?:.*\/)?([^\/]+?|)(?=(?:\.[^\/.]*)?$)/)[1]

export function getPostsMetadata() {
  const modules = import.meta.glob(`/src/posts/*.{md,svx,svelte.md}`, { eager: true, import: 'metadata' });

  let posts = Object.keys(modules)
    .map(loc => ({ url: '/' + getFilenameFromPath(loc), ...modules[loc] }))

  const publishedPosts = posts.filter((post) => !post.draft)

  return publishedPosts
}
