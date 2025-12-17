import { bigintref, bigints, console, textref, texts } from "@hazae41/stdbob"

export function main(message: textref): bigintref {
  console.log(texts.from("Hello world!"))

  return bigints.fromBase10(texts.from("42"))
}