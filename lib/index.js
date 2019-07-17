'use strict';

const path = require('path');

class Settings {

	static get configPath() {
		const prefix = typeof process.env.MS_PATH === 'string' ? process.env.MS_PATH : '';
		return path.join(process.cwd(), prefix, 'config', '.janiscommercerc.json');
	}

	static _setCache() {

		let settingsCache;

		try {

			settingsCache = require(this.configPath); // eslint-disable-line

			if(typeof settingsCache !== 'object' || Array.isArray(settingsCache))
				settingsCache = {};

		} catch(error) {
			settingsCache = {};
		}

		this._settingsCache = settingsCache;
	}

	static get settings() {

		if(typeof this._settingsCache === 'undefined')
			this._setCache();

		return this._settingsCache;
	}

	static get(key) {
		return key ? this.settings[key] : this.settings;
	}

}

module.exports = Settings;
