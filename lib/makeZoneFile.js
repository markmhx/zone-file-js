'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.makeZoneFile = makeZoneFile;

var _zoneFileTemplate = require('./zoneFileTemplate');

function makeZoneFile(jsonZoneFile) {
    var template = arguments.length <= 1 || arguments[1] === undefined ? (0, _zoneFileTemplate.getZoneFileTemplate)() : arguments[1];

    template = processOrigin(jsonZoneFile['$origin'], template);
    template = processTTL(jsonZoneFile['$ttl'], template);
    template = processSOA(jsonZoneFile['soa'], template);
    template = processNS(jsonZoneFile['ns'], template);
    template = processA(jsonZoneFile['a'], template);
    template = processAAAA(jsonZoneFile['aaaa'], template);
    template = processCNAME(jsonZoneFile['cname'], template);
    template = processMX(jsonZoneFile['mx'], template);
    template = processPTR(jsonZoneFile['ptr'], template);
    template = processTXT(jsonZoneFile['txt'], template);
    template = processSRV(jsonZoneFile['srv'], template);
    template = processSPF(jsonZoneFile['spf'], template);
    template = processURI(jsonZoneFile['uri'], template);
    template = processValues(jsonZoneFile, template);
    return template.replace(/\n{2,}/gim, '\n\n');
};

var processOrigin = function processOrigin(data, template) {
    var ret = '';
    if (typeof data !== 'undefined') {
        ret += '$ORIGIN ' + data;
    }
    return template.replace('{$origin}', ret);
};

var processTTL = function processTTL(data, template) {
    var ret = '';
    if (typeof data !== 'undefined') {
        ret += '$TTL ' + data;
    }
    return template.replace('{$ttl}', ret);
};

var processSOA = function processSOA(data, template) {
    var ret = template;
    if (typeof data !== 'undefined') {
        data.name = data.name || '@';
        data.ttl = data.ttl || '';
        for (var key in data) {
            var value = data[key];
            ret = ret.replace('{' + key + '}', value + '\t');
        }
    }
    return ret;
};

var processNS = function processNS(data, template) {
    var ret = '';
    for (var i in data) {
        ret += (data[i].name || '@') + '\t';
        if (data[i].ttl) ret += data[i].ttl + '\t';
        ret += 'IN\tNS\t' + data[i].host + '\n';
    }
    return template.replace('{ns}', ret);
};

var processA = function processA(data, template) {
    var ret = '';
    for (var i in data) {
        ret += (data[i].name || '@') + '\t';
        if (data[i].ttl) ret += data[i].ttl + '\t';
        ret += 'IN\tA\t' + data[i].ip + '\n';
    }
    return template.replace('{a}', ret);
};

var processAAAA = function processAAAA(data, template) {
    var ret = '';
    for (var i in data) {
        ret += (data[i].name || '@') + '\t';
        if (data[i].ttl) ret += data[i].ttl + '\t';
        ret += 'IN\tAAAA\t' + data[i].ip + '\n';
    }
    return template.replace('{aaaa}', ret);
};

var processCNAME = function processCNAME(data, template) {
    var ret = '';
    for (var i in data) {
        ret += (data[i].name || '@') + '\t';
        if (data[i].ttl) ret += data[i].ttl + '\t';
        ret += 'IN\tCNAME\t' + data[i].alias + '\n';
    }
    return template.replace('{cname}', ret);
};

var processMX = function processMX(data, template) {
    var ret = '';
    for (var i in data) {
        ret += (data[i].name || '@') + '\t';
        if (data[i].ttl) ret += data[i].ttl + '\t';
        ret += 'IN\tMX\t' + data[i].preference + '\t' + data[i].host + '\n';
    }
    return template.replace('{mx}', ret);
};

var processPTR = function processPTR(data, template) {
    var ret = '';
    for (var i in data) {
        ret += (data[i].name || '@') + '\t';
        if (data[i].ttl) ret += data[i].ttl + '\t';
        ret += 'IN\tPTR\t' + data[i].host + '\n';
    }
    return template.replace('{ptr}', ret);
};

var processTXT = function processTXT(data, template) {
    var ret = '';
    for (var i in data) {
        ret += (data[i].name || '@') + '\t';
        if (data[i].ttl) ret += data[i].ttl + '\t';
        ret += 'IN\tTXT\t"' + data[i].txt + '"\n';
    }
    return template.replace('{txt}', ret);
};

var processSRV = function processSRV(data, template) {
    var ret = '';
    for (var i in data) {
        ret += (data[i].name || '@') + '\t';
        if (data[i].ttl) ret += data[i].ttl + '\t';
        ret += 'IN\tSRV\t' + data[i].priority + '\t';
        ret += data[i].weight + '\t';
        ret += data[i].port + '\t';
        ret += data[i].target + '\n';
    }
    return template.replace('{srv}', ret);
};

var processSPF = function processSPF(data, template) {
    var ret = '';
    for (var i in data) {
        ret += (data[i].name || '@') + '\t';
        if (data[i].ttl) ret += data[i].ttl + '\t';
        ret += 'IN\tSPF\t' + data[i].data + '\n';
    }
    return template.replace('{spf}', ret);
};

var processURI = function processURI(data, template) {
    var ret = '';
    for (var i in data) {
        ret += (data[i].name || '@') + '\t';
        if (data[i].ttl) ret += data[i].ttl + '\t';
        ret += 'IN\tURI\t' + data[i].priority + '\t';
        ret += data[i].weight + '\t';
        ret += '"' + data[i].target + '"\n';
    }
    return template.replace('{uri}', ret);
};

var processValues = function processValues(jsonZoneFile, template) {
    template = template.replace('{zone}', jsonZoneFile['$origin'] || jsonZoneFile['soa']['name'] || '');
    template = template.replace('{datetime}', new Date().toISOString());
    return template.replace('{time}', Math.round(Date.now() / 1000));
};