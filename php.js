/**
 * Created by Skj on 2017/7/10.
 */
jsPhp = {
    /**
     * 把数组中所有键更改为小写或大写 http://www.w3school.com.cn/php/func_array_change_key_case.asp
     * @param array
     * @param cs
     * @returns {*}
     */
    array_change_key_case: function (array, cs) {
        //  discuss at: http://phpjs.org/functions/array_change_key_case/
        // original by: Ates Goral (http://magnetiq.com)
        // improved by: marrtins
        // improved by: Brett Zamir (http://brett-zamir.me)
        //   example 1: array_change_key_case(42);
        //   returns 1: false
        //   example 2: array_change_key_case([ 3, 5 ]);
        //   returns 2: [3, 5]
        //   example 3: array_change_key_case({ FuBaR: 42 });
        //   returns 3: {"fubar": 42}
        //   example 4: array_change_key_case({ FuBaR: 42 }, 'CASE_LOWER');
        //   returns 4: {"fubar": 42}
        //   example 5: array_change_key_case({ FuBaR: 42 }, 'CASE_UPPER');
        //   returns 5: {"FUBAR": 42}
        //   example 6: array_change_key_case({ FuBaR: 42 }, 2);
        //   returns 6: {"FUBAR": 42}
        //   example 7: ini_set('phpjs.return_phpjs_arrays', 'on');
        //   example 7: var arr = [{a: 0}, {B: 1}, {c: 2}];
        //   example 7: var newArr = array_change_key_case(arr);
        //   example 7: newArr.splice(1, 1);
        //   returns 7: {b: 1}

        var case_fn, key, tmp_ar = {};
        if (Object.prototype.toString.call(array) === '[object Array]') {
            return array;
        }
        if (array && typeof array === 'object' && array.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
            return array.change_key_case(cs);
        }
        if (array && typeof array === 'object') {
            case_fn = (!cs || cs === 'CASE_LOWER') ? 'toLowerCase' : 'toUpperCase';
            for (key in array) {
                tmp_ar[key[case_fn]()] = array[key];
            }
            return tmp_ar;
        }
        return false;
    },

    /**
     * 分割数组 http://www.w3school.com.cn/php/func_array_chunk.asp
     * @param input
     * @param size
     * @param preserve_keys
     * @returns {*}
     */
    array_chunk: function (input, size, preserve_keys) {
        //  discuss at: http://phpjs.org/functions/array_chunk/
        // original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
        // improved by: Brett Zamir (http://brett-zamir.me)
        //        note: Important note: Per the ECMAScript specification, objects may not always iterate in a predictable order
        //   example 1: array_chunk(['Kevin', 'van', 'Zonneveld'], 2);
        //   returns 1: [['Kevin', 'van'], ['Zonneveld']]
        //   example 2: array_chunk(['Kevin', 'van', 'Zonneveld'], 2, true);
        //   returns 2: [{0:'Kevin', 1:'van'}, {2: 'Zonneveld'}]
        //   example 3: array_chunk({1:'Kevin', 2:'van', 3:'Zonneveld'}, 2);
        //   returns 3: [['Kevin', 'van'], ['Zonneveld']]
        //   example 4: array_chunk({1:'Kevin', 2:'van', 3:'Zonneveld'}, 2, true);
        //   returns 4: [{1: 'Kevin', 2: 'van'}, {3: 'Zonneveld'}]

        var x, p = '',
            i = 0,
            c = -1,
            l = input.length || 0,
            n = [];

        if (size < 1) {
            return null;
        }

        if (Object.prototype.toString.call(input) === '[object Array]') {
            if (preserve_keys) {
                while (i < l) {
                    (x = i % size) ? n[c][i] = input[i] : n[++c] = {}, n[c][i] = input[i];
                    i++;
                }
            } else {
                while (i < l) {
                    (x = i % size) ? n[c][x] = input[i] : n[++c] = [input[i]];
                    i++;
                }
            }
        } else {
            if (preserve_keys) {
                for (p in input) {
                    if (input.hasOwnProperty(p)) {
                        (x = i % size) ? n[c][p] = input[p] : n[++c] = {}, n[c][p] = input[p];
                        i++;
                    }
                }
            } else {
                for (p in input) {
                    if (input.hasOwnProperty(p)) {
                        (x = i % size) ? n[c][x] = input[p] : n[++c] = [input[p]];
                        i++;
                    }
                }
            }
        }
        return n;
    },

    /**
     * 通过合并两个数组来创建一个新数组，其中的一个数组元素为键名，另一个数组元素为键值 http://www.w3school.com.cn/php/func_array_combine.asp
     * @param keys
     * @param values
     * @returns {*}
     */
    array_combine: function (keys, values) {
        //  discuss at: http://phpjs.org/functions/array_combine/
        // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // improved by: Brett Zamir (http://brett-zamir.me)
        //   example 1: array_combine([0,1,2], ['kevin','van','zonneveld']);
        //   returns 1: {0: 'kevin', 1: 'van', 2: 'zonneveld'}

        var new_array = {},
            keycount = keys && keys.length,
            i = 0;

        // input sanitation
        if (typeof keys !== 'object' || typeof values !== 'object' || // Only accept arrays or array-like objects
            typeof keycount !== 'number' || typeof values.length !== 'number' || !keycount) { // Require arrays to have a count
            return false;
        }

        // number of elements does not match
        if (keycount != values.length) {
            return false;
        }

        for (i = 0; i < keycount; i++) {
            new_array[keys[i]] = values[i];
        }

        return new_array;
    },
    /**
     * @todo
     * @param arr
     * @param key
     */
    array_column: function (array, key) {

    },
    /**
     * 函数用于统计数组中所有值出现的次数，本函数返回一个数组，其元素的键名是原数组的值，键值是该值在原数组中出现的次数
     * @param array
     * @returns {{}}
     */
    array_count_values: function (array) {
        //  discuss at: http://phpjs.org/functions/array_count_values/
        // original by: Ates Goral (http://magnetiq.com)
        // improved by: Michael White (http://getsprink.com)
        // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        //    input by: sankai
        //    input by: Shingo
        // bugfixed by: Brett Zamir (http://brett-zamir.me)
        //   example 1: array_count_values([ 3, 5, 3, "foo", "bar", "foo" ]);
        //   returns 1: {3:2, 5:1, "foo":2, "bar":1}
        //   example 2: array_count_values({ p1: 3, p2: 5, p3: 3, p4: "foo", p5: "bar", p6: "foo" });
        //   returns 2: {3:2, 5:1, "foo":2, "bar":1}
        //   example 3: array_count_values([ true, 4.2, 42, "fubar" ]);
        //   returns 3: {42:1, "fubar":1}

        var tmp_arr = {},
            key = '',
            t = '';

        var __getType = function (obj) {
            // Objects are php associative arrays.
            var t = typeof obj;
            t = t.toLowerCase();
            if (t === 'object') {
                t = 'array';
            }
            return t;
        };

        var __countValue = function (value) {
            switch (typeof value) {
                case 'number':
                    if (Math.floor(value) !== value) {
                        return;
                    }
                // Fall-through
                case 'string':
                    if (value in this && this.hasOwnProperty(value)) {
                        ++this[value];
                    } else {
                        this[value] = 1;
                    }
            }
        };

        t = __getType(array);
        if (t === 'array') {
            for (key in array) {
                if (array.hasOwnProperty(key)) {
                    __countValue.call(tmp_arr, array[key]);
                }
            }
        }

        return tmp_arr;
    },
    /**
     * 比较两个数组的键和值，并返回差集
     * @param arr1
     * @returns {{}}
     */
    array_diff_assoc: function(arr1) {
        //  discuss at: http://phpjs.org/functions/array_diff_assoc/
        // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // bugfixed by: 0m3r
        //  revised by: Brett Zamir (http://brett-zamir.me)
        //   example 1: array_diff_assoc({0: 'Kevin', 1: 'van', 2: 'Zonneveld'}, {0: 'Kevin', 4: 'van', 5: 'Zonneveld'});
        //   returns 1: {1: 'van', 2: 'Zonneveld'}

        var retArr = {},
            argl = arguments.length,
            k1 = '',
            i = 1,
            k = '',
            arr = {};

        arr1keys: for (k1 in arr1) {
            for (i = 1; i < argl; i++) {
                arr = arguments[i];
                for (k in arr) {
                    if (arr[k] === arr1[k1] && k === k1) {
                        // If it reaches here, it was found in at least one array, so try next value
                        continue arr1keys;
                    }
                }
                retArr[k1] = arr1[k1];
            }
        }

        return retArr;
    },
    /**
     * 比较数组，返回差集（只比较键名）
     * @param arr1
     * @returns {{}}
     */
    array_diff_key: function(arr1) {
        //  discuss at: http://phpjs.org/functions/array_diff_key/
        // original by: Ates Goral (http://magnetiq.com)
        //  revised by: Brett Zamir (http://brett-zamir.me)
        //    input by: Everlasto
        //   example 1: array_diff_key({red: 1, green: 2, blue: 3, white: 4}, {red: 5});
        //   returns 1: {"green":2, "blue":3, "white":4}
        //   example 2: array_diff_key({red: 1, green: 2, blue: 3, white: 4}, {red: 5}, {red: 5});
        //   returns 2: {"green":2, "blue":3, "white":4}

        var argl = arguments.length,
            retArr = {},
            k1 = '',
            i = 1,
            k = '',
            arr = {};

        arr1keys: for (k1 in arr1) {
            for (i = 1; i < argl; i++) {
                arr = arguments[i];
                for (k in arr) {
                    if (k === k1) {
                        // If it reaches here, it was found in at least one array, so try next value
                        continue arr1keys;
                    }
                }
                retArr[k1] = arr1[k1];
            }
        }

        return retArr;
    },
    /**
     * 比较数组，返回差集（比较键名和键值，使用用户自定义的键名比较函数）
     * @param arr1
     * @returns {{}}
     */
    array_diff_uassoc: function(arr1) {
        //  discuss at: http://phpjs.org/functions/array_diff_uassoc/
        // original by: Brett Zamir (http://brett-zamir.me)
        //   example 1: $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
        //   example 1: $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
        //   example 1: array_diff_uassoc($array1, $array2, function (key1, key2){ return (key1 == key2 ? 0 : (key1 > key2 ? 1 : -1)); });
        //   returns 1: {b: 'brown', c: 'blue', 0: 'red'}

        var retArr = {},
            arglm1 = arguments.length - 1,
            cb = arguments[arglm1],
            arr = {},
            i = 1,
            k1 = '',
            k = '';
        cb = (typeof cb === 'string') ? this.window[cb] : (Object.prototype.toString.call(cb) === '[object Array]') ? this.window[
            cb[0]][cb[1]] : cb;

        arr1keys: for (k1 in arr1) {
            for (i = 1; i < arglm1; i++) {
                arr = arguments[i];
                for (k in arr) {
                    if (arr[k] === arr1[k1] && cb(k, k1) === 0) {
                        // If it reaches here, it was found in at least one array, so try next value
                        continue arr1keys;
                    }
                }
                retArr[k1] = arr1[k1];
            }
        }

        return retArr;
    },
    /**
     * 比较数组，返回差集（只比较键名，使用用户自定义的键名比较函数）
     * @param arr1
     * @returns {{}}
     */
    array_diff_ukey: function(arr1) {
        //  discuss at: http://phpjs.org/functions/array_diff_ukey/
        // original by: Brett Zamir (http://brett-zamir.me)
        //   example 1: $array1 = {blue: 1, red: 2, green: 3, purple: 4}
        //   example 1: $array2 = {green: 5, blue: 6, yellow: 7, cyan: 8}
        //   example 1: array_diff_ukey($array1, $array2, function (key1, key2){ return (key1 == key2 ? 0 : (key1 > key2 ? 1 : -1)); });
        //   returns 1: {red: 2, purple: 4}

        var retArr = {},
            arglm1 = arguments.length - 1,
            cb = arguments[arglm1],
            arr = {},
            i = 1,
            k1 = '',
            k = '';

        cb = (typeof cb === 'string') ? this.window[cb] : (Object.prototype.toString.call(cb) === '[object Array]') ? this.window[
            cb[0]][cb[1]] : cb;

        arr1keys: for (k1 in arr1) {
            for (i = 1; i < arglm1; i++) {
                arr = arguments[i];
                for (k in arr) {
                    if (cb(k, k1) === 0) {
                        // If it reaches here, it was found in at least one array, so try next value
                        continue arr1keys;
                    }
                }
                retArr[k1] = arr1[k1];
            }
        }

        return retArr;
    },
    /**
     * 比较数组，返回差集（只比较键值）
     * @param arr1
     * @returns {{}}
     */
    array_diff: function(arr1) {
        //  discuss at: http://phpjs.org/functions/array_diff/
        // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // improved by: Sanjoy Roy
        //  revised by: Brett Zamir (http://brett-zamir.me)
        //   example 1: array_diff(['Kevin', 'van', 'Zonneveld'], ['van', 'Zonneveld']);
        //   returns 1: {0:'Kevin'}

        var retArr = {},
            argl = arguments.length,
            k1 = '',
            i = 1,
            k = '',
            arr = {};

        arr1keys: for (k1 in arr1) {
            for (i = 1; i < argl; i++) {
                arr = arguments[i];
                for (k in arr) {
                    if (arr[k] === arr1[k1]) {
                        // If it reaches here, it was found in at least one array, so try next value
                        continue arr1keys;
                    }
                }
                retArr[k1] = arr1[k1];
            }
        }

        return retArr;
    },
    /**
     * 用指定键名的给定键值填充数组
     * @param keys
     * @param value
     * @returns {{}}
     */
    array_fill_keys: function(keys, value) {
        //  discuss at: http://phpjs.org/functions/array_fill_keys/
        // original by: Brett Zamir (http://brett-zamir.me)
        // bugfixed by: Brett Zamir (http://brett-zamir.me)
        //   example 1: keys = {'a': 'foo', 2: 5, 3: 10, 4: 'bar'}
        //   example 1: array_fill_keys(keys, 'banana')
        //   returns 1: {"foo": "banana", 5: "banana", 10: "banana", "bar": "banana"}

        var retObj = {},
            key = '';

        for (key in keys) {
            retObj[keys[key]] = value;
        }

        return retObj;
    }

};