function getDialog(control, attribute) {
  const targetId = control.getAttribute(attribute);

  if (targetId) {
    return document.getElementById(targetId);
  }

  return control.closest('dialog');
}

function openDialog(dialog) {
  if (!(dialog instanceof HTMLDialogElement) || dialog.open) return;

  dialog.showModal();
}

function closeDialog(dialog) {
  if (!(dialog instanceof HTMLDialogElement) || !dialog.open) return;

  dialog.close();
}

/**
 * Enables `data-dialog-open` and `data-dialog-close` as a fallback for
 * browsers without declarative Invoker Commands. Native `<dialog>` handles
 * focus management, Escape, and focus restoration in every path.
 */
export function initDialogs(scope = document) {
  const controls = Array.from(
    scope.querySelectorAll('[data-dialog-open], [data-dialog-close]'),
  );

  controls.forEach((control) => {
    if (control.dataset.dialogReady === 'true') return;

    control.dataset.dialogReady = 'true';
    control.addEventListener('click', () => {
      if (control.hasAttribute('data-dialog-open')) {
        openDialog(getDialog(control, 'data-dialog-open'));
      }

      if (control.hasAttribute('data-dialog-close')) {
        closeDialog(getDialog(control, 'data-dialog-close'));
      }
    });
  });
}
