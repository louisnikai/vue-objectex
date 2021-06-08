<h1 align="center">vue-objectex</h1>

<p align="center">
<a href="https://www.npmjs.com/package/vue-objectex"><img src="https://img.shields.io/npm/v/vue-objectex.svg"/> <img src="https://img.shields.io/npm/dm/vue-objectex.svg"/></a> <a href="https://vuejs.org/"><img src="https://img.shields.io/badge/vue-2.x-brightgreen.svg"/></a>
</p>

<p align="center">
An advanced object for vue, can be used as an enum.
</p>

<br />
<br />
<br />

# Getting started

This package is an advanced object for vue, can be used as an enum.

1. Install the package:
```
npm install --save vue-objectex
```

<br />
<br />
<br />

# Usage

### Examples

1. Use example:
```javascript
import { ObjectEx } from 'vue-objectex'

const objEx = new ObjectEx([
  // Basic options, define enums
  {
    key: "item1",
    value: 1,
    desc: "Item 1"
  }, {
    key: "item2",
    value: 2,
    desc: "Item 2"
  }, {
    key: "item3",
    value: 3,
    desc: "Item 3"
  }], {
    // Extend funcs
    getDesc(value) {
      let enumOption = this.valueOf(value);
      return !!enumOption ? enumOption.desc : "";
    },
    ...
  }, {
    // Extend props
    basicOptions: {
      get() {
        return this.getOptions();
      }
    }
  });
```

<br />

2. Extend example:
```javascript
import { ObjectEx } from 'vue-objectex'

class UserManager extends ObjectEx {
  constructor(options, funcExtensions, defineProps) {
    let innerOptions = [];
    if (Object.typeOf(options) === "array") {
      Object.copy(innerOptions, options);
    }

    let innerFuncExtensions = {
      isInRole(roleName) {
        ...
      }
    };
    if (typeof(funcExtensions) === "object") {
      innerFuncExtensions = {...innerFuncExtensions, ...funcExtensions};
    }

    let innerDefineProps = {
      isAdmin: {
        get() {
          return ...;
        }
      },
      ...
    };
    if (Object.typeOf(defineProps) === "object") {
      innerDefineProps = {...innerDefineProps, ...defineProps};
    }

    super(innerOptions, innerFuncExtensions, innerDefineProps);
  }
}
```

<br />
<br />
<br />
