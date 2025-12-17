/// <reference types="../../libs/bytes/lib.d.ts"/>

import { readFileSync } from "node:fs";
import process from "node:process";
import { generate } from "../../libs/effort/mod.ts";

process.loadEnvFile(".env")

const [file, salt = ""] = process.argv.slice(2)

const body = new FormData()

const codeAsBytes = readFileSync(file)
const saltAsBytes = Uint8Array.fromHex(salt.slice(2))

body.append("code", new Blob([codeAsBytes]))
body.append("salt", new Blob([saltAsBytes]))

const effortAsBytes = await generate(codeAsBytes.length + saltAsBytes.length)

body.append("effort", new Blob([effortAsBytes]))

const response = await fetch(new URL("/api/create", process.env.SERVER), { method: "POST", body });

if (!response.ok)
  throw new Error("Failed", { cause: response })

console.log(await response.json())