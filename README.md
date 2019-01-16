# This repository will be discontinued at the end on Jan 2019

# IoT REST API Server

## Description
This project provides node.js based REST API server according to the  OIC (Open
Interconnect) core specification.

The project is experimental at the moment and APIs provided are work in
progress and subject to changes.

![Overview](img/iot-rest-api-server.png)

## Global Install

```
npm install -g iot-rest-api-server
```

Run with: `$ iot-rest-api-server`.

## Local Install

```
npm install iot-rest-api-server
```

> Must have a `package.json` file in your current directory. Also you may want
> to add the `--save` flag to `npm install` so that `package.json` knows your
> project requires `iot-rest-api-server`.

Run with: `$ ./node_modules/iot-rest-api-server/bin/iot-rest-api-server.js`.

## Usage

Start the API server

`$ iot-rest-api-server`

### Command Line Options

The command line options

```
$ iot-rest-api-server -h

Options

  -h, --help
  -v, --verbose
  -p, --port number
  -s, --https
```

#### verbose
More verbose logging

#### port
Listen to specific port. Default is 8000

#### https
Use https with TLS instead of plain http. In order to use https the `config`
directory needs to contain the following certificate and private key files (in
PEM format)

```
certificate.pem
private.key
```

You can use the `config/generate-key-and-cert.sh` to generate the files for
testing only purposes. The certificate is self signed and browsers do not
recognise it so you will get warnings.

The recommended way to use the https is to get proper certificate from know
certificate authority and corresponding private key and place those to the
`config` directory.

## API End Points

- `/api/system`
- `/api/oic`

# Hacking

## Install Dev Dependencies

```
npm install node-gyp -g
```

## API documentation

The REST APIs are documented in the [doc](./doc/) folder using the
[RAML](http://raml.org/) modeling language. You also need the `raml2html` node
module to produce the documentation:

```
npm install -g raml2html
```

The API documentation can be generated with

```
raml2html doc/name-of-the-raml-file > api.html
```

For example

```
raml2html doc/oic.wk.res.raml > oic-res.html
```

The `.html` file can be then opened by a browser. The `.html` file contains the
full documentation of the REST API including all the REST methods (GET, POST,
DELETE, etc) supported, query parameters (like ?id=foo) and the JSON formats in
each API.

## Examples

The following examples assumes the iot-rest-api-server runs on IP address:
192.168.0.1, port 8000.

Get the system status:

```
http://192.168.0.1:8000/api/system
```

Discover all the OIC enabled devices on the local network:

```
http://192.168.0.1:8000/api/oic/res
```

See the more detailed API documentation in the chapter above.

## Tests

The [test](./test/) directory contains the following small test utilities:

### oic-get

Send HTTP GET to `/api/oic` endpoint. Environment variables `API_SERVER_HOST`
and `API_SERVER_PORT` are used to construct the authority part of the URL.

```
export API_SERVER_HOST=10.211.55.3
# Discover
./test/oic-get /res
# Retrieve (href, di, ep and pri are from the discovery above)
./test/oic-get <href>?di=<di>&ep=<ep>&pri=<pri>
# Observe
./test/oic-get <href>?di=<di>&ep=<ep>&pri=<pri>&obs=1
```

### oic-post

Send HTTP POST to `/api/oic` endpoint. Environment variables `API_SERVER_HOST`
and `API_SERVER_PORT` are used to construct the authority part of the URL.
First parameter is `uri` from the discover (`/res`) and second is JSON files
with the properties that are being set.

```
API_SERVER_HOST=10.211.55.3
./test/oic-post  <href>?di=<di>&ep=<ep>&pri=<pri> <file-name-for-body>
```

### oic-api-tester

Performs the OIC discovery. On discovered resources performs a) GET or b)
OBSERVE operations

```
./test/oic-api-tester.js -?
# Start observing all found resources
./test/oic-api-tester.js -h 10.0.0.1 -p 8000 -o
```

## Tips

- If you are running Chrome and want to see the JSON objects in nicely formatted
way, install the JSONView extension.

- Another great tool for REST API development and testing is Postman, another
Chrome extension.

- By default, the REST API server listens only on localhost interface, so no outside
entity will be able to interact with it. In case if you want to expose the API to
outside, you can use a reverse proxy server (e.g., NGNIX).
