# settings

[![Build Status](https://travis-ci.org/janis-commerce/settings.svg?branch=master)](https://travis-ci.org/janis-commerce/settings)
[![Coverage Status](https://coveralls.io/repos/github/janis-commerce/settings/badge.svg?branch=master)](https://coveralls.io/github/janis-commerce/settings?branch=master)

## Installation
```bash
npm install janiscommerce/settings
```

## API

### Settings.get(string) **static**
- This method returns settings or settings by key.
**Example:** Settings.get();
**Example:** Settings.get('database');

## Setting file

The setting file is a JSON with all the settings.

### Example
```json
{
	"database": {
		"core": {
			"host": "my-host",
			"user": "the-user"
		},
		"otherConn": {
			"host": "my-other-host",
			"user": "other-user"
		}
	},
	"otherConfig": 123,
	"mainPath": "/main/path/"
}
```

## Usage

### How to get settings

```js
const Settings = require('janiscommerce/settings');

const settings = Settings.get();
```

### How to get settings by key

```js
const Settings = require('janiscommerce/settings');

const settings = Settings.get('database');
```
