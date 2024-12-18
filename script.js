async function generateHash() {
  const text = document.getElementById('textInput').value;
  if (text.length === 0) {
    document.getElementById('hashOutput').textContent =
      'Hash will appear here...';
    return;
  }
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  document.getElementById('hashOutput').textContent = hashHex;
}

function copyToClipboard() {
  const hashText = document.getElementById('hashOutput').textContent;
  if (hashText !== 'Hash will appear here...' && hashText.length > 0) {
    navigator.clipboard
      .writeText(hashText)
      .then(() => {})
      .catch((err) => {
        alert('Failed to copy text: ', err);
      });
  } else {
    alert('No hash to copy.');
  }
}
