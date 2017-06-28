const test = require("ava");
const jsc = require("jsverify");
const ValueGenerator = require("Val");

function ignore(t, key, type) {
  t.plan(100);
  const obj = {};
  obj[key] = false;
  jsc.assert(jsc.forall(ValueGenerator(obj), val => {
    t.true(typeof val !== type);
    return true;
  }));
}
ignore.title = (title, key, type) => `ValueGenerator({ ${key}: false }) doesn't produce ${type}`;

test(ignore, "str", "string");
test(ignore, "num", "number");
test(ignore, "bool", "boolean");
