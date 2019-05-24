## build_include without full path

```js
build_include: {
  main: {
    expand: true,
    cwd: 'src',
    src: '**',
    dest: 'dest/',
  },
},
```

<br />

```text
$ grunt build_include
Running "build_include:main"
Created 2 directories, copied 2 files

Done, without errors.
$ tree -I node_modules
.
├── Gruntfile.js
├── dest
│   ├── a
│   └── subdir
│       └── b
└── src
    ├── a
    └── subdir
        └── b

5 directories, 5 files
```

[Usage Examples](../)