// deno-lint-ignore-file no-unused-vars

/// <reference types="../../libs/bytes/lib.d.ts"/>

import { Readable, Writable } from "@hazae41/binary";
import process from "node:process";
import { generate } from "../../libs/effort/mod.ts";
import { Pack } from "../../libs/packs/mod.ts";

process.loadEnvFile(".env")

type Proof = [Array<string>, Array<[string, Uint8Array, Uint8Array]>, Array<[string, Uint8Array, Uint8Array]>, Array<Pack.Value>, bigint]

async function execute(module: string, method: string, params: Array<Pack.Value>) {
  const body = new FormData()

  body.append("module", module)
  body.append("method", method)
  body.append("params", new Blob([Writable.writeToBytesOrThrow(new Pack(params))]))
  body.append("effort", new Blob([await generate(10n ** 5n)]))

  const response = await fetch(new URL("/api/execute", process.env.SERVER), { method: "POST", body });

  if (!response.ok)
    throw new Error("Failed", { cause: response })

  const [logs, reads, writes, returned, sparks] = Readable.readFromBytesOrThrow(Pack, await response.bytes()) as Proof

  for (const log of logs)
    console.log(log)

  return returned
}

const [module, method, ...params] = process.argv.slice(2)

function parse(texts: string[]): Array<Pack.Value> {
  const values = new Array<Pack.Value>()

  for (const text of texts) {
    if (text === "null") {
      values.push(null)
      continue
    }

    if (text.startsWith("blob:")) {
      values.push(Uint8Array.fromHex(text.slice("blob:".length)))
      continue
    }

    if (text.startsWith("bigint:")) {
      values.push(BigInt(text.slice("bigint:".length)))
      continue
    }

    if (text.startsWith("number:")) {
      values.push(Number(text.slice("number:".length)))
      continue
    }

    if (text.startsWith("text:")) {
      values.push(text.slice("text:".length))
      continue
    }

    throw new Error("Unknown value type")
  }

  return values
}

function stringify(pack: Array<Pack.Value>): string {
  const entries = new Array<unknown>()

  for (const value of pack) {
    if (value == null) {
      entries.push({ type: "null" })
      continue
    }

    if (value instanceof Uint8Array) {
      entries.push({ type: "blob", value: value.toHex() })
      continue
    }

    if (typeof value === "bigint") {
      entries.push({ type: "bigint", value: value.toString() })
      continue
    }

    if (typeof value === "number") {
      entries.push({ type: "number", value: value.toString() })
      continue
    }

    if (typeof value === "string") {
      entries.push({ type: "text", value })
      continue
    }

    throw new Error("Unknown value type")
  }

  return JSON.stringify(entries)
}

console.log(stringify(await execute(module, method, parse(params))))