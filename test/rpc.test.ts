import assert from "node:assert/strict";
import test from "node:test";
import { summarizeAccount } from "../src/rpc.js";

test("summarizes base64 account data", () => {
  const summary = summarizeAccount("DemoAddress", {
    data: [Buffer.from("hello").toString("base64"), "base64"],
    executable: false,
    lamports: 123,
    owner: "Owner111",
    rentEpoch: 7,
  });
  assert.equal(summary.dataLength, 5);
  assert.equal(summary.owner, "Owner111");
});

test("rejects unexpected encodings", () => {
  assert.throws(() => summarizeAccount("DemoAddress", { data: ["abc", "base58"], executable: false, lamports: 0, owner: "Owner", rentEpoch: 0 }), /encoding/);
});
