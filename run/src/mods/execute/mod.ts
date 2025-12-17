/// <reference types="../../libs/bytes/lib.d.ts"/>

import { Readable, Writable } from "@hazae41/binary";
import process from "node:process";
import { generate } from "../../libs/effort/mod.ts";
import { Pack } from "../../libs/packs/mod.ts";

process.loadEnvFile(".env")

async function execute(module: string, method: string, params: Uint8Array<ArrayBuffer>) {
  const body = new FormData()

  body.append("module", module)
  body.append("method", method)
  body.append("params", new Blob([params]))
  body.append("effort", new Blob([await generate(10n ** 5n)]))

  const response = await fetch(new URL("/api/execute", process.env.SERVER), { method: "POST", body });

  if (!response.ok)
    throw new Error("Failed", { cause: response })

  return Readable.readFromBytesOrThrow(Pack, await response.bytes())
}

const [module, method, ...params] = process.argv.slice(2)

function parse(texts: string[]): Pack {
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

  return new Pack(values)
}

function stringify(pack: Pack): string {
  const texts = new Array<string>()

  for (const value of pack.values) {
    if (value == null) {
      texts.push("null")
      continue
    }

    if (value instanceof Uint8Array) {
      texts.push(`blob:${value.toHex()}`)
      continue
    }

    if (typeof value === "bigint") {
      texts.push(`bigint:${value.toString()}`)
      continue
    }

    if (typeof value === "number") {
      texts.push(`number:${value.toString()}`)
      continue
    }

    if (typeof value === "string") {
      texts.push(`text:"${value}"`)
      continue
    }

    throw new Error("Unknown value type")
  }

  return texts.join(" ")
}

console.log(stringify(await execute(module, method, Writable.writeToBytesOrThrow(parse(params)))))