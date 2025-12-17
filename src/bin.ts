import { console, textref, texts } from "@hazae41/stdbob"

export function main(name: textref): i64 {
  console.log(texts.from("Hello, " + texts.into(name) + "!"))

  return 42
}