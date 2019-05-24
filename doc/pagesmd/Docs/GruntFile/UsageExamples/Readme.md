# Usage Examples

```js
build_include: {
  main: {
    files: [
      // includes files within path
      {expand: true, src: ['path/*'], dest: 'dest/', filter: 'isFile'},

      // includes files within path and its sub-directories
      {expand: true, src: ['path/**'], dest: 'dest/'},

      // makes all src relative to cwd
      {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},

      // flattens results to a single level
      {expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'},
    ],
  },
},
```

This task supports all the file mapping format Grunt supports. Please read [Globbing patterns](https://gruntjs.com/configuring-tasks#globbing-patterns) and [Building the files object dynamically](https://gruntjs.com/configuring-tasks#building-the-files-object-dynamically) for additional details.

Here are some additional examples, given the following file tree:

```text
$ tree -I node_modules
.
├── Gruntfile.js
└── src
    ├── a
    └── subdir
        └── b

2 directories, 3 files
```

* [build_include a single file tree](build_includeSingleFileTree/)
* [build_include without full path](build_includeWithoutFullPath/)
* [Flattening the filepath output](FlatteningFilepathOutput/)
* [Troubleshooting](Troubleshooting/)
* [Grunt File](../)