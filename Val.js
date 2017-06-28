const jsc = require("jsverify");
const merge = require("lodash.merge");

/**
 * Remove entries from the given array that are exactly equal to `false`.
 * @param {Array} arr an array to filter.
 * @return {Array} a copy of the given array, without any entries that are `false`.
*/
function removeFalse(arr) {
  return arr.filter(el => el !== false);
}

/**
 * Generates standard JavaScript values, including primitives and basic arrays and objects by default.  Additional
 * types can be added.
 * @param {Object} opts configuration for the generator.  Provide `false` for one of the data types to disable it.
 * @param {Arbitrary|false} [opts.num] the numbers to use.  Defaults to `jsc.number`.
 * @param {Arbitrary|false} [opts.str] the strings to use.  Defaults to `jsc.string`.
 * @param {Arbitrary|false} [opts.bool] the booleans to use.  Defaults to `jsc.bool`.
 * @param {Arbitrary|false} [opts.date] the dates to use.  Defaults to `jsc.datetime`.
 * @param {Arbitrary|false} [opts.array] the arrays to use.  Defaults to `jsc.array(jsc.json)`.
 * @param {Arbitrary|false} [opts.obj] the objects to use.  Defaults to `jsc.constant({ foo: 1, bar: 2 })`.
 * @param {Arbitrary|true} [opts.complexObj] Set to `true` to use complex objects (`wrapObj(jsc.json)`) or provide a
 *   custom object definition.  Not included by default.
 * @param {Array<Arbitrary>} [opts.extra] additional generators to use.  Defaults to `[]`.
 * @example <caption>No Strings, Only Integers</caption>
 * const ValueGenerator = require("@rweda/jsverify-generators/Val");
 * jsc.sampler(ValueGenerator({ string: false, num: jsc.integer }));
 * @example <caption>Disable Strings, Only <code>false</code> Booleans</caption>
 * jsc.sampler(ValueGenerator({ string: false, bool: jsc.constant(false) }));
*/
function ValueGenerator(opts) {
  opts = merge({
    num: jsc.number,
    str: jsc.string,
    bool: jsc.bool,
    date: jsc.datetime,
    array: jsc.array(jsc.json),
    obj: jsc.constant({ foo: 1, bar: 2 }),
    extra: [],
  }, opts);
  return jsc.oneof(removeFalse([
    opts.num,
    opts.str,
    opts.bool,
    opts.date,
    opts.array,
    opts.obj,
    ...opts.extra,
  ]));
}

module.exports = ValueGenerator;
