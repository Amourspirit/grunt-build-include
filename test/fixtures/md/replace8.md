# Fence Test


## Repace8



`type=multiflex` Apply multiflex fencing options.  

Matches the pattern of:  
(optional space)(optional `*`)(optional space)(reguired &#96;&#96;&#96;(optional type)
fenced text
(reguired &#96;&#96;&#96;)

Some match examples:

~~~
```js
fenced text
```
~~~

````text
```
fenced text
```
````

````text
```text
fenced text
```
````

````
```
fenced text
```
````

````text
*```js
fenced text
```
````

````text
*```
fenced text
```
````

````text
* ```ini
fenced text
```
````

````
* ```
fenced text
```
````

```
fenced text
```

```text
fenced text
```

~~~text
```js
fenced text
```
~~~

See Also: [flexFence](/modules/_modules_fenceoptions_.html#flexfence)  