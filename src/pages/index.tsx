import {
  type GetServerSideProps,
  type InferGetServerSidePropsType,
  type NextPage,
} from "next";
import Head from "next/head";
import { useMemo, useState } from "react";
import { Github, Hash } from "lucide-react";

import { ChatGPTEditor } from "../sections/ChatGPTEditor";
import { EncoderSelect } from "~/sections/EncoderSelect";
import { TokenViewer } from "~/sections/TokenViewer";
import { TextArea } from "~/components/Input";
import { type AllOptions, isChatModel, isValidOption } from "~/models";
import { createTokenizer } from "~/models/tokenizer";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

function useQueryParamsState() {
  const router = useRouter();

  const params = useMemo((): AllOptions => {
    return isValidOption(router.query?.model)
      ? router.query.model
      : "gpt-4o";
  }, [router.query]);

  const setParams = (model: AllOptions) => {
    router.push({
      pathname: router.pathname,
      query: { model },
    });
  };

  return [params, setParams] as const;
}

const Home: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const [inputText, setInputText] = useState<string>("");
  const [model, setModel] = useQueryParamsState();
  const tokenizer = useQuery({
    queryKey: [model],
    queryFn: ({ queryKey: [model] }) => createTokenizer(model!),
  });

  const tokens = tokenizer.data?.tokenize(inputText);

  const tokenCount =
    tokens?.segments?.reduce((memo, i) => memo + i.tokens.length, 0) ?? 0;

  return (
    <>
      <Head>
        <title>Tiktokenizer — Token playground</title>
        <meta
          name="description"
          content="Inspect how OpenAI, Anthropic, and open-source tokenizers split your text, segment by segment."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-slate-50">
        <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-6">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white shadow-sm">
                <Hash className="h-4 w-4" />
              </span>
              <div className="flex flex-col leading-none">
                <span className="text-[15px] font-semibold tracking-tight text-slate-900">
                  Tiktokenizer
                </span>
                <span className="label-mono mt-1">token playground</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <EncoderSelect
                value={model}
                isLoading={tokenizer.isFetching}
                onChange={(update) => {
                  setModel(update);
                  if (isChatModel(update) !== isChatModel(model)) {
                    setInputText("");
                  }
                }}
              />
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/AayushPanchal-04"
                aria-label="GitHub profile"
                className="hidden h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 sm:flex"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1200px] px-6 pb-20 pt-10">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Count tokens across every model.
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-500">
              Paste text or compose chat messages, then inspect exactly how each
              encoder splits them into tokens — segment by segment.
            </p>
          </div>

          <div className="mt-8 grid items-start gap-6 lg:grid-cols-2">
            <section className="card flex flex-col">
              <div className="card-header">
                <h2 className="card-title">Input</h2>
                <span className="label-mono">
                  {inputText.length.toLocaleString()} chars
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-4 p-5">
                {isChatModel(model) && (
                  <ChatGPTEditor model={model} onChange={setInputText} />
                )}

                <TextArea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste or type text to tokenize…"
                  className="scrollbar-thin min-h-[280px] flex-1 resize-none rounded-lg border-slate-200 bg-slate-50/60 p-4 font-mono text-[13px] leading-relaxed text-slate-800 placeholder:text-slate-400 focus:bg-white"
                />
              </div>
            </section>

            <section className="card flex flex-col">
              <div className="card-header">
                <h2 className="card-title">Tokens</h2>
                <span className="label-mono">
                  {tokenCount.toLocaleString()} tokens
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-4 p-5">
                <TokenViewer
                  model={model}
                  data={tokens}
                  isFetching={tokenizer.isFetching}
                />
              </div>
            </section>
          </div>
        </main>

        <footer className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-3 px-6 pb-10 sm:flex-row sm:items-center">
          <p className="text-xs text-slate-400">
            Built by{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="font-medium text-slate-500 transition-colors hover:text-slate-900"
              href="https://aayushpanchal.in/"
            >
              Aayush Panchal
            </a>
          </p>
        </footer>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: { query: context.query } };
};

export default Home;
