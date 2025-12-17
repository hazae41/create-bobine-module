import { console, textref, texts } from "@hazae41/stdbob"

export function sayMyName(name: textref): void {
  console.log(texts.fromString("Hello, " + texts.toString(name) + "!"))
}