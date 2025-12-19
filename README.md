# Create Bobine Module

Make an AssemblyScript module for [Bobine WebAssembly VM](https://github.com/hazae41/bobine)

## Setup

Install Deno

```bash
npm install -g deno
```

Clone this Git repository

```bash
git clone https://github.com/hazae41/create-bobine-module.git module && cd ./module
```

Reset the Git repository

```bash
rm -rf ./.git && git init
```

Install dependencies

```bash
deno install
```

If needed modify your server URL in .env

```env
SERVER=http://localhost:8080
```

Start coding in ./src/mod.ts

```tsx
import { console, packref, storage, textref, texts } from "@hazae41/stdbob"

export function sayMyName(name: textref): packref {
  const previous = storage.get(texts.fromString("name"))

  console.log(texts.fromString("Hello, " + texts.toString(name) + "!"))

  storage.set(texts.fromString("name"), name)

  return previous
}
```

Compile and deploy your module (it will display its address)

```bash
deno task prepack && deno task produce
```

Execute your module

```bash
deno task execute <address> <method> ...[params as ("null"|("blob":data)|("bigint":data)|("number":data)|("text":data))]
```

For example

```bash
deno task execute 3ca2c27fa5069305da28741b19643cef918a8c5349ce5de1422925e0772cc5db main bigint:123n blob:643cef918a8c text:"hello world"
```

Hint: for easier development, you can keep the command in a new file, copy-paste it into your terminal when you want to execute it, and edit the file when you want to modify it, this can also be used to easily keep track of different modules or different addresses

<img width="948" height="749" src="https://github.com/user-attachments/assets/cc89f189-b5bb-4d27-a540-bcf4b5139633" />
