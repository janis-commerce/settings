'use strict';

const path = require('path');

class Settings {

	static get settingsFilePath() {
		const prefix = typeof process.env.MS_PATH === 'string' ? process.env.MS_PATH : '';
		return path.join(process.cwd(), prefix, '.janiscommercerc.json');
	}

	static _setCache() {
		if(typeof this._settingsCache !== 'undefined')
			return;

		let settingsCache;

		try {
			settingsCache = require(this.settingsFilePath); // eslint-disable-line

			if(typeof this._settingsCache !== 'object' || Array.isArray(this._settingsCache))
				settingsCache = {};

		} catch(error) {
			settingsCache = {};
		}

		this._settingsCache = settingsCache;
	}

	static get settings() {
		this._setCache();
		return this._settings;
	}

	static get(key) {
		return key ? this.settings[key] : this.settings;
	}

}

module.exports = Settings;
