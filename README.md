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
|whatever|''|if indicate, when file not found response this file|
|storage|./storage|the directory where to put files uploaded|

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

## Tools

You can use some kind of tools by different paths.

### Upload

`/_uplaod`

upload a file by this path.

### timeout

`/_timeout?time=2000`

Set a timeout for response, indicate exact duration by parameter `time`,  unit millisecond.

### error

`/_error?status=404`

Set a error for response, indicate http status by parameter `status`.

### detail

`/_detail/guid-name-date`

response

```JSON
{
    "guid":"EFEeF29b-75f0-7e4F-7b8d-b6A6AD9EDbdd",
    "name":"Richard Robinson",
    "date":"1396361327638"
}
```

Get detail data, you can indicate types of every feild, like `guid-name-date`, split by `-`;

All types are listed below:

- email
- date
- image
- name
- cname
- title
- ctitle
- paragraph
- cparagraph
- url
- county(tru
- id
- guid

### list

`/_list/guid-name-date?size=10&total=100`

```JSON
{
    "data": [{
        "guid": "c68bDC69-6D2b-f734-DE5d-Ee9bDCeADAB2",
        "name": "Michael Robinson",
        "date": "391015183380"
    }, {
        "guid": "C1C8D679-3eF1-ECE2-fd2b-DFd9930af3e2",
        "name": "Sarah Clark",
        "date": "482896752618"
    }, {
        "guid": "03e77cC1-4c6F-B525-6CdE-84C31bFfaB3B",
        "name": "David Hernandez",
        "date": "344569768679"
    }],
    "total": 100
}
```

Get list data like above, indicate the types just like `_detail`, simultaneously indicate `size` as list length, `total` as list total length.
