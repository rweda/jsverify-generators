const test = require("ava");
const jsc = require("jsverify");
const ValueGenerator = require("Val");

const prims = [
  "number",
  "string",
  "boolean",
];

test("filters out complex data", t => {
  t.plan(100);
  jsc.assert(jsc.forall(ValueGenerator({ array: false, obj: false }), val => {
    t.true(
      val instanceof Date || prims.indexOf(typeof val) >= 0,
      `ValueGenerator(...) should return primatives, got ${typeof val} ${val}`
    );
    return true;
  }));
});
