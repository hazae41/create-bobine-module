import { blobref, blobs, console } from "@hazae41/stdbob"

export function main(): blobref {
  const message = blobs.save(String.UTF8.encode("Hello, Bobine!"))

  console.log(message)

  return message
}