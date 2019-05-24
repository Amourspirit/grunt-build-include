## Fence Type Flex

Matches the pattern of:  
(optional space)(optional `*`)(optional space)(reguired <code>&#96;&#96;&#96;</code>)(optional type)
fenced text
(reguired <code>&#96;&#96;&#96;</code>)

Some match examples:

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

````text
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

````text
* ```
fenced text
```
````

See Also: [flexFence](/grunt-build-include/classes/fences.flexfence.html)  