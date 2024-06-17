function encodeTextWithCharacter(title, character = null) {
  const encodedTitle = encodeURIComponent(title) || encodeURI(title);

  // Replace spaces with %20 for URL safety
  const urlSafeTitle = character ? encodedTitle.replace(/%20/g, character) : encodedTitle;

  return urlSafeTitle;
}

export function encodeSearchText(title) {
  return encodeTextWithCharacter(title, '+');
}

export function encodeText(title) {
  return encodeTextWithCharacter(title, '_');
}

function decodeTextWithCharacter(title, character = null) {
  const text = character ? title.replace(character, ' ') : title;
  const decodedText = decodeURIComponent(title) || decodeURI(title);
  // Use DOMParser for more robust entity decoding
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'text/html');

  // Extract text content from the parsed element
  const decodedTitle = doc.body.textContent;

  // Alternatively, use a regular expression for simpler cases
  // const decodedTitle = title.replace(/&amp;|&.*;/g, ''); // Replace &amp; and other entities

  return decodedTitle.trim(); // Remove leading/trailing whitespace
}

export function decodeSearchText(title) {
  return decodeTextWithCharacter(title, '+');
}

export function decodeText(title) {
  return decodeTextWithCharacter(title);
}
