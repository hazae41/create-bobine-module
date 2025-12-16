# Create Bobine AssemblyScript Module

Make an AssemblyScript module for [Bobine WebAssembly VM](https://github.com/hazae41/bobine)

## Setup

Install Deno

```bash
npm install -g deno
```

Clone this repository

```bash
git clone https://github.com/hazae41/create-bobine-assemblyscript-module.git module && cd ./module && rm -rf ./.git && git init
```

Install

```bash
deno install
```

If needed modify your server URL in .env

```env
SERVER=http://localhost:8080
```

Start coding in ./src/bin.ts

```tsx
import { blobref, blobs, console } from "@hazae41/stdbob"

export function main(): blobref {
  const message = blobs.save(String.UTF8.encode("Hello, Bobine!"))

  console.log(message)

  return message
}
```

Deploy your module and get its address

```bash
deno task deploy
```

Execute your module

```bash
deno task execute <address> <method> [params]
```

For example

```bash
deno task execute 3ca2c27fa5069305da28741b19643cef918a8c5349ce5de1422925e0772cc5db main
```