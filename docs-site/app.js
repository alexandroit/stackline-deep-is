'use strict';

(() => {
  const deepIs = globalThis.DeepIs.default;
  const actualInput = document.querySelector('#actual-input');
  const expectedInput = document.querySelector('#expected-input');
  const cycleInput = document.querySelector('#cycle');
  const presetInput = document.querySelector('#preset');
  const resultLabel = document.querySelector('#result-label');
  const resultDetail = document.querySelector('#result-detail');
  const indicator = document.querySelector('#status-indicator');

  const presets = {
    nested: ['{"team":{"name":"Stackline","active":true},"ids":[1,2,3]}', '{"ids":[1,2,3],"team":{"active":true,"name":"Stackline"}}', false],
    loose: ['1', '"1"', false],
    'signed-zero': ['0', '-0', false],
    different: ['{"status":"ready","count":3}', '{"status":"ready","count":4}', false],
    cycle: ['{"name":"node","children":[]}', '{"children":[],"name":"node"}', true]
  };

  document.querySelector('#compare-button').addEventListener('click', compare);
  document.querySelector('#reset-button').addEventListener('click', () => applyPreset('nested'));
  presetInput.addEventListener('change', () => applyPreset(presetInput.value));
  for (const input of [actualInput, expectedInput, cycleInput]) input.addEventListener('input', compare);
  document.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-copy]');
    if (!button) return;
    await navigator.clipboard.writeText(button.dataset.copy);
    const original = button.textContent;
    button.textContent = 'Copied';
    setTimeout(() => { button.textContent = original; }, 1200);
  });

  applyPreset('nested');

  function applyPreset(name) {
    const [actual, expected, cyclic] = presets[name] || presets.nested;
    presetInput.value = name;
    actualInput.value = actual;
    expectedInput.value = expected;
    cycleInput.checked = cyclic;
    compare();
  }

  function compare() {
    try {
      const started = performance.now();
      const actual = JSON.parse(actualInput.value);
      const expected = JSON.parse(expectedInput.value);
      if (cycleInput.checked) {
        requireObject(actual, 'Actual');
        requireObject(expected, 'Expected');
        actual.self = actual;
        expected.self = expected;
      }
      const equal = deepIs(actual, expected);
      const elapsed = performance.now() - started;
      resultLabel.textContent = equal ? 'Equal' : 'Different';
      resultDetail.textContent = `Completed in ${elapsed.toFixed(2)} ms without mutating either input.`;
      indicator.classList.toggle('error', !equal);
    } catch (error) {
      resultLabel.textContent = 'Invalid input';
      resultDetail.textContent = error.message;
      indicator.classList.add('error');
    }
  }

  function requireObject(value, label) {
    if (value === null || typeof value !== 'object') throw new TypeError(`${label} must be an object to add a cycle.`);
  }
})();
