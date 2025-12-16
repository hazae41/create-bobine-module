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
    if (text.startsWith("0x")) {
      values.push(Uint8Array.fromHex(text.slice(2)))
      continue
    }

    if (text.endsWith("n")) {
      values.push(BigInt(text.slice(0, -1)))
      continue
    }

    values.push(Number(text))
    continue
  }

  return new Pack(values)
}

console.log(await execute(module, method, Writable.writeToBytesOrThrow(parse(params))))