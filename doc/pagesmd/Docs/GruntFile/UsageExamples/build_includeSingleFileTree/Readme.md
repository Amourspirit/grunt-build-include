## build_include for a single file tree


```js
build_include: {
  main: {
    expand: true,
    src: 'src/*',
    dest: 'dest/',
  },
},
```

<br />

```text
$ grunt build_include
Running "build_include:main"
Created 1 directories, copied 1 files

Done, without errors.
$ tree -I node_modules
.
├── Gruntfile.js
├── dest
│   └── src
│       ├── a
│       └── subdir
└── src
    ├── a
    └── subdir
        └── b

5 directories, 4 files
```

[Usage Examples](../)