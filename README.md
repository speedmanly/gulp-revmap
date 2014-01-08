
## Information

<table>
<tr> 
<td>Package</td><td>gulp-revmap</td>
</tr>
<tr>
<td>Description</td>
<td>Generate JSON hash mapping of assets, for cache busting</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.4</td>
</tr>
</table>

## Usage

```js
var revmap = require('gulp-revmap');

gulp.task('scripts', function() {
    gulp.src('./js/**/*.js')
        .pipe(revmap('revmap.js', {hashlen: 10}))
        .pipe(gulp.dest('./public/dist/'))
});
```

Ouput:

```js
{
  "foo.js": "fddfcf5b2a",
  "bar.js": "42840c25c7"
}
```

## Options

#### options.algorithm
Type: `String`
Default value: `'md5'`

The algorithm to generate hash digests: `'sha1'`, `'md5'`, `'sha256'`, etc.

#### options.hashlen
Type: `Number`
Default value: `10`

The length of a hash digest hex value.


## LICENSE

(MIT License)

Copyright (c) 2014 zedix

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.