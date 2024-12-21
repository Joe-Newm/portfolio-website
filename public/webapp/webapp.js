/* Rom Patcher JS (complete webapp implementation) v20240809 - Marc Robledo 2016-2024 - http://www.marcrobledo.com/license */


/* service worker */
// const FORCE_HTTPS = true;
// if (FORCE_HTTPS && location.protocol === 'http:')
// 	location.href = window.location.href.replace('http:', 'https:');
// else if (location.protocol === 'https:' && 'serviceWorker' in navigator && window.location.hostname === 'www.marcrobledo.com')
// 	navigator.serviceWorker.register('/RomPatcher.js/_cache_service_worker.js', { scope: '/RomPatcher.js/' }); /* using absolute paths to avoid unexpected behaviour in GitHub Pages */


/* settings */
const LOCAL_STORAGE_SETTINGS_ID = 'rom-patcher-js-settings';
/* default settings */
const settings = {
	language: typeof navigator.userLanguage === 'string' ? navigator.userLanguage.substr(0, 2) : 'en',
	outputSuffix: true,
	fixChecksum: false,
	theme: 'default'
};
/* load settings from localStorage */
if (typeof localStorage !== 'undefined' && localStorage.getItem(LOCAL_STORAGE_SETTINGS_ID)) {
	try {
		const loadedSettings = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SETTINGS_ID));

		if (typeof loadedSettings.language === 'string')
			settings.language = loadedSettings.language;

		if (typeof loadedSettings.outputSuffix === 'boolean')
			settings.outputSuffix = loadedSettings.outputSuffix;

		if (typeof loadedSettings.fixChecksum === 'boolean')
			settings.fixChecksum = loadedSettings.fixChecksum;

		if (typeof loadedSettings.theme === 'string' && ['light'].indexOf(loadedSettings.theme) !== -1)
			settings.theme = loadedSettings.theme;
	} catch (err) {
		console.error('Error while loading settings: ' + err.message);
	}
}
const buildSettingsForWebapp = function() {
	return {
		language: settings.language,
		outputSuffix: settings.outputSuffix,
		fixChecksum: settings.fixChecksum,
		allowDropFiles: true,
		ondropfiles: function(evt) {
			if (currentMode === 'creator') {
				ocument.getElementById('switch-create-button').click();
			}
		}
	};
}
const saveSettings = function() {
	if (typeof localStorage !== 'undefined')
		localStorage.setItem(LOCAL_STORAGE_SETTINGS_ID, JSON.stringify(settings));
	RomPatcherWeb.setSettings(buildSettingsForWebapp());
}


var currentMode = 'patcher';



window.addEventListener('load', function() {
	try {
		// Set theme
		document.body.className = `theme-${settings.theme}`;

		// Utility for safe event listener addition
		function addEventListenerIfExists(id, event, handler) {
			const element = document.getElementById(id);
			if (element) {
				element.addEventListener(event, handler);
			}
		}

		// Event listeners
		addEventListenerIfExists('button-settings', 'click', () => {
			const dialog = document.getElementById('dialog-settings');
			if (dialog) dialog.showModal();
		});

		addEventListenerIfExists('dialog-settings-button-close', 'click', () => {
			const dialog = document.getElementById('dialog-settings');
			if (dialog) dialog.close();
		});

		const settingsLanguage = document.getElementById('settings-language');
		if (settingsLanguage) {
			settingsLanguage.value = settings.language;
			settingsLanguage.addEventListener('change', function() {
				settings.language = this.value;
				saveSettings();
				RomPatcherWeb.translateUI(settings.language);
			});
		}

		// Initialize Rom Patcher
		try {
			const initialSettings = buildSettingsForWebapp();
			RomPatcherWeb.initialize(initialSettings);
		} catch (err) {
			const container = document.getElementById('rom-patcher-container');
			if (container) {
				container.innerHTML = 'Error: ' + err.message;
				container.style.color = 'red';
			}
		}
	} catch (err) {
		console.error("A script error occurred:", err);
	}
});
