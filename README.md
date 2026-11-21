<div align="center">

# Tiktokenizer

**An online playground for inspecting tokenizers — count and visualize tokens for OpenAI models, encodings, and open-source HuggingFace models.**

[![Next.js](https://img.shields.io/badge/Next.js-13-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

</div>

---

## Overview

Tiktokenizer is a web application that calculates the correct number of tokens for a given prompt and lets you inspect exactly how text is split. It supports OpenAI's `tiktoken` encodings as well as a range of open-source tokenizers served from HuggingFace, with a live segmented view of every token and its ID.

## Features

- **Live tokenization** — tokens update instantly as you type.
- **Dual view** — segmented, color-coded text alongside raw token IDs.
- **Broad model coverage** — OpenAI encodings, chat, and embedding models plus open-source HuggingFace tokenizers.
- **Chat formatting** — preview token counts for chat-style messages.
- **Fast, typed stack** — Next.js, TypeScript, and tRPC with an edge-ready API.

## Supported models

**OpenAI encodings**

`gpt2` · `r50k_base` · `p50k_base` · `p50k_edit` · `cl100k_base` · `o200k_base`

**OpenAI chat models**

`gpt-4o` · `gpt-4` · `gpt-4-32k` · `gpt-4-1106-preview` · `gpt-3.5-turbo`

**OpenAI embedding models**

`text-embedding-3-large` · `text-embedding-3-small` · `text-embedding-ada-002`

**Open-source models (HuggingFace)**

`codellama/CodeLlama-7b-hf` · `codellama/CodeLlama-70b-hf` · `meta-llama/Meta-Llama-3-8B` · `meta-llama/Meta-Llama-3-70B` · `microsoft/phi-2` · `google/gemma-7b` · `deepseek-ai/DeepSeek-R1` · `Qwen/Qwen2.5-72B` · `tiiuae/falcon-7b` · `01-ai/Yi-6B` · `openai/whisper-tiny`

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | [Next.js](https://nextjs.org/) (Pages Router) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| API | [tRPC](https://trpc.io/) |
| Tokenizers | [openai/tiktoken](https://github.com/openai/tiktoken), [@xenova/transformers](https://github.com/xenova/transformers.js) |
| UI primitives | [Radix UI](https://www.radix-ui.com/), [cmdk](https://cmdk.paco.me/), [lucide-react](https://lucide.dev/) |

## Getting started

### Prerequisites

- Node.js 18+
- Yarn (or run the scripts with `npx yarn@1`)

### Installation

```bash
git clone https://github.com/AayushPanchal-04/Tiktokenizer-.git
cd Tiktokenizer-
yarn install
```

### Environment variables

Copy the example file and add your credentials:

```bash
cp .env.example .env
```

```dotenv
HF_API_KEY="hf_..."
```

The `HF_API_KEY` is a HuggingFace access token and is **only required to download open-source tokenizer files**. Tokenizers are fetched into `public/hf/` (git-ignored) via the download script that runs before `dev` and `build`. To use gated models such as Llama 3 and Gemma, accept their license on HuggingFace first.

> OpenAI encodings work without any API key.

### Development

```bash
yarn dev
```

The app is served at [http://localhost:3000](http://localhost:3000).

### Production build

```bash
yarn build
yarn start
```

## Scripts

| Script | Description |
| --- | --- |
| `yarn dev` | Download tokenizers, then start the dev server |
| `yarn build` | Download tokenizers, then create a production build |
| `yarn start` | Serve the production build |
| `yarn lint` | Run ESLint |
| `npx vitest` | Run the Vitest test suite |

## License

Released under the [MIT License](./LICENSE).

## Author

Built by **[Aayush Panchal](https://aayushpanchal.in/)**.
