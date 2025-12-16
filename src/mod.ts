import { blobref } from "@hazae41/stdbob";

export namespace module {

  // @ts-ignore: decorator
  @external("module", "main")
  export declare function main(): blobref

}