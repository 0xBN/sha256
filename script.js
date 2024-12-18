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

function clearInput(elementId) {
  const inputField = document.getElementById(elementId);
  if (inputField) {
    if (inputField.tagName === 'INPUT' || inputField.tagName === 'TEXTAREA') {
      inputField.value = ''; // Clears the value for input or textarea elements
    } else {
      inputField.textContent = ''; // Clears textContent for other elements, if necessary
    }
  }
}

function copyToClipboard(elementId) {
  const textElement = document.getElementById(elementId);
  const textToCopy = textElement.value || textElement.textContent; // Get value or textContent

  if (textToCopy && textToCopy !== 'Hash will appear here...') {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        showCopyNotification();
        if (elementId === 'hashOutput') {
          clearInput('textInput'); // Clear input field specifically for hash operations
        }
        clearInput(elementId); // Clear the element from which text was copied
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  } else {
    // console.log('No text to copy.');
  }
}

function showCopyNotification() {
  const notification = document.getElementById('copyNotification');
  notification.style.display = 'block';
  setTimeout(() => {
    notification.style.display = 'none';
  }, 2000); // Notification disappears after 2000 ms (2 seconds)
}

function clearInput(inputId) {
  const inputField = document.getElementById(inputId);
  inputField.value = ''; // Clears the input field
}

function copyToClipboardAndPaste(elementId) {
  const textElement = document.getElementById(elementId);
  const textToCopy = textElement.textContent; // Ensure this is getting the correct text

  // console.log('Copying text:', textToCopy); // Check what is being copied

  if (textToCopy && textToCopy !== 'Hash will appear here...') {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        showCopyNotification();
        // console.log('Text copied successfully');

        document.getElementById('textInput').value = textToCopy;
        // console.log(
        //   'Pasted text into input:',
        //   document.getElementById('textInput').value
        // ); // Verify the paste operation

        generateHash(); // This should re-hash the newly pasted text
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  } else {
    // console.log('No text to copy.');
  }
}
