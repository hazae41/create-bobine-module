import { textref, texts } from "@hazae41/stdbob"

export function main(message: textref): textref {
  return texts.toUppercase(message)
}