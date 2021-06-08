import {
  ObjectEx
} from "@/index";

describe('ObjectEx', () => {
  it('Should not be undefined', () => {
    const target = ObjectEx;
    console.log("Vue.defineField: ", target);

    expect(target).not.toBeUndefined();
  });

  const objEx = new ObjectEx([{
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
    getDesc(value) {
      let enumOption = this.valueOf(value);
      return !!enumOption ? enumOption.desc : "";
    }
  }, {
    basicOptions: {
      get() {
        return this.getOptions();
      }
    }
  });

  it('Test ObjectEx instance', () => {
    console.log("Test ObjectEx instance result: ", JSON.stringify(objEx));

    expect(objEx).toHaveProperty("item1");
  });

  it('Test getOptions', () => {
    let result = objEx.getOptions();
    console.log("Test getOptions result: ", JSON.stringify(result));

    expect(result).toHaveLength(3);
  });

  it('Test func extension', () => {
    let result = objEx.basicOptions;
    console.log("Test func extension result: ", JSON.stringify(objEx.basicOptions));

    expect(result).not.toBeUndefined();
  });

  it('Test prop extension', () => {
    let result = objEx.getDesc(objEx.item2);
    console.log("Test prop extension result: ", result);

    expect(result).toEqual("Item 2");
  });
})
