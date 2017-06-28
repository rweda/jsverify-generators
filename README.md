# JSVerify Generators

Common, configurable generators for [JSVerify][] brought to you by [Redwood EDA][rweda].
Used in-house in several testing processes.

## ValueGenerator

Generates random values.  Disable value types by providing `false`, or customize by providing different implementations.

```js
const jsc = require("jsverify");
const ValueGenerator = require("@rweda/jsverify-generators/Val");

jsc.assert(jsc.forall(ValueGenerator({ str: false, num: jsc.integer }), val => {
  console.log(val);
  return true;
}));
```

[JSVerify]: https://github.com/jsverify/jsverify
[rweda]: http://redwoodeda.com/
