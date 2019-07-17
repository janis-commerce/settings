'use strict';

const assert = require('assert');
const sandbox = require('sinon').createSandbox();
const mockRequire = require('mock-require');

const Settings = require('./..');

describe('Settings', () => {

	let spySetCache;

	beforeEach(() => {
		delete process.env.MS_PATH;
		spySetCache = sandbox.spy(Settings, '_setCache');
	});

	afterEach(() => {
		Settings._settingsCache = undefined; // eslint-disable-line
		sandbox.restore();
		mockRequire.stopAll();
	});

	const mockConfig = config => {
		mockRequire(Settings.configPath, config);
	};

	context('when config file not found', () => {

		it('should return an empty object when getting without key', () => {
			const settings = Settings.get();
			assert.deepEqual(settings, {});
		});

		it('should return undefined when getting by key', () => {
			const settings = Settings.get('my-key');
			assert.deepEqual(settings, undefined);
		});

		it('should cache settings', () => {
			Settings.get();
			Settings.get();

			sandbox.assert.calledOnce(spySetCache);
		});
	});

	context('when invalid config file found', () => {

		it('should return an empty object when getting without key', () => {

			mockConfig(['bad', 'config']);

			const settings = Settings.get();
			assert.deepEqual(settings, {});
		});

		it('should return undefined when getting with key', () => {

			mockConfig(['bad', 'config']);

			const settings = Settings.get('my-key');

			assert.deepEqual(settings, undefined);
		});
	});

	context('when config file found', () => {

		it('should return the whole config when getting without key', () => {

			const wholeConfig = { configFoo: 'foo', configBar: { bar: 1 } };

			mockConfig(wholeConfig);

			const settings = Settings.get();

			assert.deepEqual(settings, wholeConfig);
		});

		it('should return undefined when getting by key and not found that key', () => {

			const wholeConfig = { configFoo: 'foo', configBar: { bar: 1 } };

			mockConfig(wholeConfig);

			const settings = Settings.get('my-key');

			assert.deepEqual(settings, undefined);
		});

		it('should return the settings for a key when found', () => {

			const wholeConfig = { configFoo: 'foo', configBar: { bar: 1 } };

			mockConfig(wholeConfig);

			assert.deepEqual(Settings.get('configFoo'), wholeConfig.configFoo);
			assert.deepEqual(Settings.get('configBar'), wholeConfig.configBar);
		});
	});

	it('should use MS_PATH as prefix when exists', () => {
		process.env.MS_PATH = 'my-prefix';
		assert(Settings.configPath.endsWith('my-prefix/config/.janiscommercerc.json'));
	});

	it('should use MS_PATH as prefix when not exists', () => {
		// settings/ cause is the folder of the package
		// configPath getter use process.cwd()
		assert(Settings.configPath.endsWith('settings/config/.janiscommercerc.json'));
	});

});
