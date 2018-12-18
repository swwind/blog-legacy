# Useful functions

## show

Show a notice.

### Usage

```js
show(message[, timeout])
```

### Arguments

- **message :: String**

  The message you want to show.

- **timeout :: Number**

  Set timeout.

## fly

Scroll to a place.

### Usage

```js
fly(top[, time[, timing_function]])
```

### Arguments

- **top :: Number**

  Scroll top

- **time :: Number**

  Animate time

- **timing_function :: Number -> Number**

  Animate timing function. 0% = 0, 100% = 1.

  Default to $$f(x)=\frac{x^2}{x^2+(1-x)^2}$$



