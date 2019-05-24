## Troubleshooting

By default, if a file or directory is not found it is quietly ignored. If the file should exist, and non-existence generate an error, then add `nonull:true`. For instance, this Gruntfile.js entry:

```js
build_include: {
  main: {
    nonull: true,
    src: 'not-there',
    dest: 'create-me',
  },
},
```

gives this output:

```text
$ grunt build_include
Running "build_include:main"
Warning: Unable to read "not-there" file (Error code: ENOENT). Use --force to continue.

Aborted due to warnings.
```

[Usage Examples](../)