const dict : { [key: string]: unknown } = {};

dict['key'] = "testing";
dict['key1'] = "testing";

delete dict["key"];

console.log(dict);