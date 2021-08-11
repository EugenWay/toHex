// Import
const { ApiPromise, WsProvider } = require("@polkadot/api");
const fs = require("fs");

async function main() {
  // Here is data for encode
  const data = {
    kind: "i64",
    value: 32
  };

  // if Custom

  // structure: {
  //   MassageIn: {
  //     value: "u32",
  //     msg: "String",
  //   },
  // }

  // Construct
  const wsProvider = new WsProvider("wss://rpc.polkadot.io");

  let api;

  if (data.kind !== "utf-8" || "bytes" || "i32" || "i64" || "f32" || "f64") {
    api = await ApiPromise.create({
      provider: wsProvider,
      types: {
        ...data.structure,
      },
    });
  } else {
    api = await ApiPromise.create({
      provider: wsProvider,
    });
  }

  toHex(data, api);
}

function toHex(data, api) {
  let res;

  if (data.kind === "bytes") {
    res = api.createType("Bytes", data.value);
  } else if (data.kind === "i32") {
    res = api.createType(
      "Bytes",
      Array.from(api.createType("i32", data.value).toU8a())
    );
  } else if (data.kind === "i64") {
    res = api.createType(
      "Bytes",
      Array.from(api.createType("i64", data.value).toU8a())
    );
  } else if (data.kind === "f32") {
    res = api.createType(
      "Bytes",
      Array.from(api.createType("f32", data.value).toU8a())
    );
  } else if (data.kind === "f64") {
    res = api.createType(
      "Bytes",
      Array.from(api.createType("f64", data.value).toU8a())
    );
  } else if (data.kind === "utf-8") {
    res = data.value;
  } else {
    res = api.createType(
      "Bytes",
      Array.from(api.createType(data.kind, data.value).toU8a())
    );
  }

  fs.writeFile("res.DATA", res, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });

  console.log(res.toHex());
}

main();
