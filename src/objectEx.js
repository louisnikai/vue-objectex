import Vue from "vue";
import {
  runBasicExtender
} from "vue-extender/lib/basic.extender";
runBasicExtender(Vue);

const _typeOf = (value) => {
  return Object.prototype.toString.call(value).match(/^\[object\s(.*)\]$/)[1].toLowerCase();
};

export class ObjectEx {
  constructor(options, funcExtensions, defineProps, factoryType = null) {
    let enumOptions;
    let enumFuncExtensions;
    let enumDefineProps;

    class _ObjectEx {
      constructor(options, funcExtensions, defineProps) {
        if (_typeOf(options) !== "array")
          throw "items is not an array.";
        options.forEach(({
          key,
          value
        }) => {
          if (key === undefined || value === undefined) return;
          this[`_${key}`] = value;
          Vue.defineProperty(this, key, {
            get() {
              return this[`_${key}`];
            },
            set(newValue) {
              let enumOption = this.keyOf(key);
              if (!enumOption) return;

              enumOption.value = newValue;
              this[`_${key}`] = newValue;
            }
          }, true);
        });
        enumOptions = options;

        if (_typeOf(funcExtensions) === "object") {
          Object.entries(funcExtensions).filter(([key, value]) => _typeOf(value) === "function").forEach(([key, value]) => {
            this[key] = value.bind(this);
          });
          enumFuncExtensions = funcExtensions;
        }

        if (_typeOf(defineProps) === "object") {
          Vue.defineProperties(this, defineProps, true);
          enumDefineProps = defineProps;
        }
      }

      get keys() {
        return enumOptions.map(option => option.key);
      }

      keyOf(key) {
        return enumOptions.find(op => op.key === key);
      }

      valueOf(value) {
        return enumOptions.find(op => op.value === value);
      }

      indexOf(key) {
        return enumOptions.findIndex(op => op.key === key);
      }

      getAttrValue(value, attrName, unfoundResult = null) {
        let enumOption = this.valueOf(value);
        if (!enumOption) return unfoundResult;

        if (!Object.keys(enumOption).includes(attrName)) return unfoundResult;

        return enumOption[attrName];
      }

      getAttrValueByKey(key, attrName, unfoundResult = null) {
        let enumOption = this.keyOf(key);
        if (!enumOption) return unfoundResult;

        if (!Object.keys(enumOption).includes(attrName)) return unfoundResult;

        return enumOption[attrName];
      }

      setAttrValueByKey(key, attrName, attrValue) {
        let enumOption = this.keyOf(key);
        if (!enumOption) return false;

        if (!Object.keys(enumOption).includes(attrName)) return false;

        enumOption[attrName] = attrValue;
        return true;
      }

      getOptions(cbFilter) {
        if (_typeOf(cbFilter) !== "function")
          return enumOptions;

        return enumOptions.filter(cbFilter);
      }

      addOption(option) {
        if (!option.key === undefined || option.value === undefined || !!this.keyOf(option.key)) return;
        this[option.key] = option.value;
        enumOptions.push(option);
      }

      removeOption(key) {
        let index = this.indexOf(key);
        if (index < 0) return;
        delete this[key];
        enumOptions.splice(index, 1);
      }

      getFuncExtensions() {
        return enumFuncExtensions;
      }

      getDefineProps() {
        return enumDefineProps;
      }
    }
    _ObjectEx.prototype.__instanceType__ = _ObjectEx;
    _ObjectEx.prototype.__factoryType__ = factoryType || ObjectEx;

    return new _ObjectEx(options, funcExtensions, defineProps);
  }
}
