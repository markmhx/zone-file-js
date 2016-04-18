'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ZoneFile = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _makeZoneFile = require('./makeZoneFile');

var _parseZoneFile = require('./parseZoneFile');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ZoneFile = exports.ZoneFile = function () {
  function ZoneFile(zoneFile) {
    _classCallCheck(this, ZoneFile);

    if ((typeof zoneFile === 'undefined' ? 'undefined' : _typeof(zoneFile)) === 'object') {
      this.jsonZoneFile = JSON.parse(JSON.stringify(zoneFile));
    } else if (typeof zoneFile === 'string') {
      this.jsonZoneFile = (0, _parseZoneFile.parseZoneFile)(zoneFile);
    }
  }

  _createClass(ZoneFile, [{
    key: 'toJSON',
    value: function toJSON() {
      return this.jsonZoneFile;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return (0, _makeZoneFile.makeZoneFile)(this.toJSON());
    }
  }]);

  return ZoneFile;
}();