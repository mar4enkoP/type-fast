export function splitLines(el: HTMLElement) {
  const originalText = el.textContent ?? '';
  const listSpans = originalText.split(' ');
  el.innerHTML = '';
  const wordSpans: HTMLElement[] = [];
  listSpans.forEach((span) => {
    const spanEl = document.createElement('span');
    spanEl.textContent = span;
    el.appendChild(spanEl);
    el.appendChild(document.createTextNode(' '));
    wordSpans.push(spanEl);
  });
  el.offsetHeight;
  const map = new Map<number, HTMLElement[]>();
  wordSpans.forEach((spans) => {
    let top = spans.offsetTop;
    if (map.has(top)) {
      map.get(top)?.push(spans);
    } else {
      map.set(top, [spans]);
    }
  });
  el.innerHTML = '';
  const lines: HTMLElement[] = [];
  Array.from(map.values()).forEach((value) => {
    const spanLines = document.createElement('span');
    let spanValue = document.createElement('span');
    spanValue.className = 'split-line-value';
    spanLines.className = 'split-line';
    value.forEach((span) => {
      spanValue.appendChild(span);
      spanValue.appendChild(document.createTextNode(' '));
    });
    spanLines.appendChild(spanValue);
    el.appendChild(spanLines);
    lines.push(spanValue);
  });
  return {
    lines,
    destroy: () => {
      el.textContent = originalText;
    },
  };
}
