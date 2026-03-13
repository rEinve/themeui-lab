const COPY_RESET_MS = 1200;

function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  fallbackCopy(text);
}

document.querySelectorAll(".example-code").forEach((block) => {
  const parent = block.parentNode;
  if (!parent) return;

  const shell = document.createElement("div");
  shell.className = "example-code-shell";
  parent.insertBefore(shell, block);
  shell.appendChild(block);

  const button = document.createElement("button");
  button.className = "example-copy";
  button.type = "button";
  button.textContent = "Copy";
  button.setAttribute("aria-label", "Copy code snippet");
  shell.appendChild(button);

  let resetTimer;

  button.addEventListener("click", async () => {
    const code = block.querySelector("code");
    const text = (code ? code.textContent : block.textContent || "").trimEnd();
    if (!text) return;

    try {
      await copyText(text);
      button.textContent = "Copied";
    } catch {
      button.textContent = "Failed";
    }

    window.clearTimeout(resetTimer);
    resetTimer = window.setTimeout(() => {
      button.textContent = "Copy";
    }, COPY_RESET_MS);
  });
});
