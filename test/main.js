'use strict';
var revmap = require('../');
var assert = require('assert');
var path = require('path');
var File = require('gulp-util').File;

require('mocha');

describe('gulp-revmap', function() {

    it('should create hash map', function (done) {
        var stream = revmap('assets.json');

        var fakeFile = new File({
            path: './test/fixture/file.js',
            cwd: './test/',
            base: './test/fixture/',
            contents: new Buffer('//fakefile')
        });

        var fakeFile2 = new File({
            path: './test/fixture/file2.js',
            cwd: './test/',
            base: './test/fixture/',
            contents: new Buffer('//fakeFile2')
        });

        stream.on('data', function (file) {
            assert.equal(path.basename(file.path), 'assets.json');
            assert.equal(file.contents, '{"file.js":"fddfcf5b2a","file2.js":"42840c25c7"}');
            done();
        });

        stream.write(fakeFile);
        stream.write(fakeFile2);
        stream.end();
    });
});
