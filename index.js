'use strict';

var through = require('through');
var os = require('os');
var path = require('path');
var crypto = require('crypto');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

module.exports = function(fileName, opt) {
    if (!fileName) throw new PluginError('gulp-revmap', 'Missing fileName option for gulp-revmap');
    if (!opt) opt = {};

    var hashMap = {};
    var firstFile = null;

    function hashFile(file) {
        if (file.isNull()) return; // ignore
        if (file.isStream()) return this.emit('error', new PluginError('gulp-revmap', 'Streaming not supported'));

        if (!firstFile) firstFile = file;

        var hash = crypto.createHash(opt.algo || 'md5')
          .update(file.contents.toString(), 'utf8').digest('hex');

        var filename = path.basename(file.path);
        hashMap[filename] = hash.slice(0, opt.hashlen || 10);
    }

    function endStream() {
        if (Object.keys(hashMap).length === 0) return this.emit('end');

        this.emit('data', new gutil.File({
            cwd: firstFile.cwd,
            base: firstFile.base,
            path: path.join(firstFile.base, fileName),
            contents: new Buffer(JSON.stringify(hashMap))
        }));

        this.emit('end');
    }

    return through(hashFile, endStream);
};