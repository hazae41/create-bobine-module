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

Deploy your module

```bash
deno task produce
```

Execute your module

```bash
deno task execute <hash> <method> <params>
```