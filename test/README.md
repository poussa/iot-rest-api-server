
## Environment Variables

* `API_SERVER_HOST` - Hostname/address where API server is running
  (default: localhost)
* `API_SERVER_PORT` - Port where API server is running (default: 8000)
* `API_SERVER_HTTPS` - To use https instead of http (default: http)

## Examples

### oic-get

```sh
# Resource discovery (/oic/res)
./oic-get "/res"

# Device discovery discovery (/oic/d)
./oic-get "/d"

# Platform discovery (/oic/p)
./oic-get "/p"

# Resource get (/a/light?di=<Device ID>&ep=<Origin of the resource>&pri=<Priority of the endpoint>)
./oic-get "/a/light?di=<di>&ep=<Origin of the resource>&pri=<Priority of the endpoint>"

# Resource get with query filter (/a/light?di=<Device ID>&ep=<Origin of the resource>&pri=<Priority of the endpoint> with power less than 50)
./oic-get "/a/light?di=?di=<di>&ep=<Origin of the resource>&pri=<Priority of the endpoint>&power<50"

# Resource observe (/a/light?di=<Device ID>&obs=1&ep=<Origin of the resource>&pri=<Priority of the endpoint>)
./oic-get "/a/light?di=<di>&obs=1&ep=<Origin of the resource>&pri=<Priority of the endpoint>"
```

### oic-post

```sh
# Resource post (/a/light?di=<Device ID&ep=<Origin of the resource>&pri=<Priority of the endpoint> from a file: post-light-values.txt)
./oic-post "/a/light?di=<di>&ep=<Origin of the resource>&pri=<Priority of the endpoint>"
```
