import { console, storage, textref, texts } from "@hazae41/stdbob"

export function sayMyName(name: textref): textref {
  const previous = storage.get<textref>(texts.fromString("name"))

  console.log(texts.fromString("Hello, " + texts.toString(name) + "!"))

  storage.set(texts.fromString("name"), name)

  return previous
}