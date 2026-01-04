import { LightSensor } from '@capgo/capacitor-light-sensor';

const actions = [
  {
    id: 'isAvailable',
    label: 'Check Availability',
    description: 'Check if the light sensor is available on this device.',
    inputs: [],
    run: async () => {
      return await LightSensor.isAvailable();
    }
  },
  {
    id: 'checkPermissions',
    label: 'Check Permissions',
    description: 'Check if high sampling rate sensor permission is granted.',
    inputs: [],
    run: async () => {
      return await LightSensor.checkPermissions();
    }
  },
  {
    id: 'requestPermissions',
    label: 'Request Permissions',
    description: 'Request high sampling rate sensor permission (Android 12+).',
    inputs: [],
    run: async () => {
      return await LightSensor.requestPermissions();
    }
  },
  {
    id: 'startSensor',
    label: 'Start Sensor',
    description: 'Start listening to light sensor updates. Shows live readings.',
    inputs: [
      { name: 'updateInterval', label: 'Update Interval (ms)', type: 'number', default: 200 }
    ],
    run: async (params) => {
      await LightSensor.start({ updateInterval: params.updateInterval });
      return { status: 'Sensor started', updateInterval: params.updateInterval };
    }
  },
  {
    id: 'stopSensor',
    label: 'Stop Sensor',
    description: 'Stop listening to light sensor updates.',
    inputs: [],
    run: async () => {
      await LightSensor.stop();
      return { status: 'Sensor stopped' };
    }
  },
  {
    id: 'getPluginVersion',
    label: 'Get Plugin Version',
    description: 'Get the current version of the plugin.',
    inputs: [],
    run: async () => {
      return await LightSensor.getPluginVersion();
    }
  }
];

const actionSelect = document.getElementById('action');
const actionDescription = document.getElementById('actionDescription');
const formContainer = document.getElementById('formContainer');
const runBtn = document.getElementById('runBtn');
const output = document.getElementById('output');
const liveReading = document.getElementById('liveReading');
const luxValue = document.getElementById('luxValue');
const luxBarFill = document.getElementById('luxBarFill');
const luxDescription = document.getElementById('luxDescription');

let listenerHandle = null;
let isListening = false;

// Populate action dropdown
actions.forEach((action) => {
  const option = document.createElement('option');
  option.value = action.id;
  option.textContent = action.label;
  actionSelect.appendChild(option);
});

// Handle action selection
actionSelect.addEventListener('change', () => {
  const action = actions.find((a) => a.id === actionSelect.value);

  if (action) {
    actionDescription.textContent = action.description;
    buildForm(action.inputs);
    runBtn.disabled = false;
    runBtn.textContent = action.id === 'stopSensor' ? 'Stop Sensor' : 'Run Action';
    runBtn.className = action.id === 'stopSensor' ? 'stop-btn' : '';
  } else {
    actionDescription.textContent = '';
    formContainer.innerHTML = '';
    runBtn.disabled = true;
    runBtn.textContent = 'Run Action';
    runBtn.className = '';
  }
});

// Build form for action inputs
function buildForm(inputs) {
  formContainer.innerHTML = '';

  if (!inputs || inputs.length === 0) {
    formContainer.innerHTML = '<p class="description">No parameters required</p>';
    return;
  }

  inputs.forEach((input) => {
    const group = document.createElement('div');
    group.className = 'form-group';

    if (input.type === 'checkbox') {
      group.className += ' checkbox-group';
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = input.name;
      checkbox.name = input.name;
      checkbox.checked = input.default || false;

      const label = document.createElement('label');
      label.htmlFor = input.name;
      label.textContent = input.label;

      group.appendChild(checkbox);
      group.appendChild(label);
    } else {
      const label = document.createElement('label');
      label.htmlFor = input.name;
      label.textContent = input.label;

      const field = document.createElement('input');
      field.type = input.type || 'text';
      field.id = input.name;
      field.name = input.name;
      field.value = input.default !== undefined ? input.default : '';
      if (input.placeholder) field.placeholder = input.placeholder;

      group.appendChild(label);
      group.appendChild(field);
    }

    formContainer.appendChild(group);
  });
}

// Get form values
function getFormValues(inputs) {
  const values = {};

  if (!inputs) return values;

  inputs.forEach((input) => {
    const el = document.getElementById(input.name);
    if (!el) return;

    if (input.type === 'checkbox') {
      values[input.name] = el.checked;
    } else if (input.type === 'number') {
      values[input.name] = el.value ? parseInt(el.value, 10) : input.default;
    } else {
      values[input.name] = el.value || input.default;
    }
  });

  return values;
}

// Get light level description
function getLightDescription(lux) {
  if (lux < 1) return 'Very dark (moonless night)';
  if (lux < 10) return 'Dark (full moon)';
  if (lux < 50) return 'Dim (twilight)';
  if (lux < 200) return 'Indoor lighting';
  if (lux < 500) return 'Office lighting';
  if (lux < 1000) return 'Overcast day';
  if (lux < 10000) return 'Daylight (shade)';
  if (lux < 25000) return 'Full daylight';
  return 'Direct sunlight';
}

// Calculate bar percentage (logarithmic scale)
function getLuxBarPercent(lux) {
  if (lux <= 0) return 0;
  // Log scale: 0-100000 lux mapped to 0-100%
  const maxLux = 100000;
  const percent = (Math.log10(lux + 1) / Math.log10(maxLux)) * 100;
  return Math.min(100, Math.max(0, percent));
}

// Setup light sensor listener
async function setupListener() {
  if (listenerHandle) {
    await listenerHandle.remove();
  }

  listenerHandle = await LightSensor.addListener('lightSensorChange', (data) => {
    luxValue.textContent = Math.round(data.illuminance);
    luxBarFill.style.width = `${getLuxBarPercent(data.illuminance)}%`;
    luxDescription.textContent = getLightDescription(data.illuminance);
  });

  isListening = true;
  liveReading.style.display = 'block';
}

// Remove listener
async function removeListener() {
  if (listenerHandle) {
    await listenerHandle.remove();
    listenerHandle = null;
  }
  isListening = false;
  liveReading.style.display = 'none';
  luxValue.textContent = '--';
  luxBarFill.style.width = '0%';
  luxDescription.textContent = 'Waiting for data...';
}

// Run action
runBtn.addEventListener('click', async () => {
  const action = actions.find((a) => a.id === actionSelect.value);
  if (!action) return;

  const params = getFormValues(action.inputs);

  try {
    output.textContent = 'Running...';

    const result = await action.run(params);

    output.textContent = JSON.stringify(result, null, 2);

    // Handle sensor start/stop
    if (action.id === 'startSensor') {
      await setupListener();
    } else if (action.id === 'stopSensor') {
      await removeListener();
    }
  } catch (error) {
    output.textContent = `Error: ${error.message || error}`;
    console.error(error);
  }
});

// Cleanup on page unload
window.addEventListener('beforeunload', async () => {
  if (isListening) {
    await LightSensor.stop();
    await removeListener();
  }
});
