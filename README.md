## Install

```bash
> npm install -g ystatic
```

## Usage

```bash
> cd someDir
> static --port 4040 --index home.html
```

## Options

|name|default|desc|
|:---|:---|:---|
|port|8080|port number|
|index|index.html|home page|
|root|'./'|root directory|
|notfound|'not found'|not found page|

## Invoking Usage

```bash
> cd someDir
> npm install ystatic --save
```

```js
// index.js
const ystatic require('ystatic');
ystatic({
    port:'4040',
    index: 'home.html'
});
```
