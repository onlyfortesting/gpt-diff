// export const slugify = (text) => text.toLowerCase().replaceAll(' ', '-')
export const slugify = (text) => {
  return text
    .normalize('NFKD')            // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
    .toLowerCase()                // Convert the string to lowercase letters
    .trim()                       // Remove whitespace from both sides of a string (optional)
    .replace(/\s+/g, '-')         // Replace spaces with -
    .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
    .replace(/\_/g, '-')           // Replace _ with -
    .replace(/\-\-+/g, '-')       // Replace multiple - with single -
    .replace(/\-$/g, '');         // Remove trailing -
}
export const deslug = (text) => text.replaceAll('-', ' ')
export function titleify(text) {
  return text.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
}
