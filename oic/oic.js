exports.parseRes = function(resource) {
  console.log(resource);

  var o = {}; // resource object according to the OIC core spec.
  var p = {}; // Policy Parameter.

  if (typeof resource.deviceId != "undefined")
    o.di = resource.deviceId;

  if (typeof resource.resourcePath != "undefined")
    o.href = resource.resourcePath;

  if (typeof resource.resourceTypes != "undefined")
    o.rt = resource.resourceTypes;

  if (typeof resource.interfaces != "undefined")
    o.if = resource.interfaces;

  if (resource.discoverable || resource.observable) {
    p.bm = (0 | (resource.discoverable ? 1 << 0 : 0) |
           (resource.observable ? 1 << 1 : 0));
  }

  p.secure = resource.secure;

  if (typeof resource.port != "undefined")
    p.port = resource.port;

  o.p = p;

  if (typeof resource.endpoints != "undefined") {
    o.eps = resource.endpoints.map(function epRepresentation(item) {
      return {
        ep: item.origin,
        pri: item.priority
      };
    });
  }

  console.log(JSON.stringify(o));

  return o;
}

exports.parseDevice = function(device) {
  console.log(device);

  var o = {};

  if (typeof device.uuid != "undefined")
    o.di = device.uuid;

  if (typeof device.name != "undefined")
    o.n = device.name;

  if (typeof device.coreSpecVersion != "undefined")
    o.icv = device.coreSpecVersion;

  if (typeof device.dataModels != "undefined")
    o.dmv = device.dataModels;

  if (typeof device.piid != "undefined")
    o.piid = device.piid;

  console.log(JSON.stringify(o));

  return o;
}

exports.parsePlatform = function(info) {
  var o = {};

  console.log(info);

  if (typeof info.id != "undefined")
    o.pi = info.id;

  if (typeof info.manufacturerName != "undefined")
    o.mnmn = info.manufacturerName;

  if (typeof info.manufacturerUrl != "undefined")
    o.mnml = info.manufacturerUrl;

  if (typeof info.model != "undefined")
    o.mnmo = info.model;

  if (typeof info.manufactureDate != "undefined")
    o.mndt = info.manufactureDate;

  if (typeof info.platformVersion != "undefined")
    o.mnpv = info.platformVersion;

  if (typeof info.osVersion != "undefined")
    o.mnos = info.osVersion;

  if (typeof info.hardwareVersion != "undefined")
    o.mnhw = info.hardwareVersion;

  if (typeof info.firmwareVersion != "undefined")
    o.mnfv = info.firmwareVersion;

  if (typeof info.supportUrl != "undefined")
    o.mnsl = info.supportUrl;

  if (typeof info.systemTime != "undefined")
    o.st = info.systemTime;

  console.log(JSON.stringify(o));

  return o;
}

exports.parseResource = function(payload) {
  var o = {};
  var index, property;

  console.log(payload);

  if (typeof payload.uri != "undefined")
    o.href = payload.uri;

  if (typeof payload.properties != "undefined")
    for (index in payload.properties) {
      value = payload.properties[index];
      o[index] = value;
    }

  var json = JSON.stringify(o);

  if (typeof payload != "undefined")
    console.log(json);

  return json;
}
