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
    var newFiles = [];

    function hashFile(file) {
        if (file.isNull()) return; // ignore
        if (file.isStream()) return this.emit('error', new PluginError('gulp-revmap', 'Streaming not supported'));

        var contents = file.contents.toString();

        var hash = crypto.createHash(opt.algo || 'md5')
          .update(contents, 'utf8').digest('hex');

        hash = hash.slice(0, opt.hashlen || 10);

        var oldFilename = path.basename(file.path);
        var ext = path.extname(file.path);
        var newFilename = path.basename(file.path, ext) + '-' + hash + ext;

        hashMap[oldFilename] = newFilename;

        if (opt.write) {
          newFiles.push(new gutil.File({
            path: newFilename,
            contents: new Buffer(contents)
          }));
        }
    }

    function endStream() {
        if (Object.keys(hashMap).length === 0) return this.emit('end');

        this.emit('data', new gutil.File({
            path: fileName,
            contents: new Buffer(JSON.stringify(hashMap))
        }));

        newFiles.forEach(function(file) {
          this.emit('data', file);
        }.bind(this));

        this.emit('end');
    }

    return through(hashFile, endStream);
};
