import { Fragment, useState } from "react";
import { cn } from "~/utils/cn";

import { Checkbox } from "~/components/Checkbox";
import { type TokenizerResult } from "~/models/tokenizer";

const COLORS = [
  "bg-sky-100 text-sky-900",
  "bg-amber-100 text-amber-900",
  "bg-blue-100 text-blue-900",
  "bg-emerald-100 text-emerald-900",
  "bg-orange-100 text-orange-900",
  "bg-cyan-100 text-cyan-900",
  "bg-slate-100 text-slate-900",
  "bg-purple-100 text-purple-900",
  "bg-indigo-100 text-indigo-900",
  "bg-lime-100 text-lime-900",
  "bg-rose-100 text-rose-900",
  "bg-violet-100 text-violet-900",
  "bg-yellow-100 text-yellow-900",
  "bg-teal-100 text-teal-900",
  "bg-zinc-100 text-zinc-900",
  "bg-red-100 text-red-900",
  "bg-fuchsia-100 text-fuchsia-900",
  "bg-pink-100 text-pink-900",
];

function encodeWhitespace(str: string) {
  let result = str;

  result = result.replaceAll(" ", "⋅");
  result = result.replaceAll("\t", "→");
  result = result.replaceAll("\f", "\\f\f");
  result = result.replaceAll("\b", "\\b\b");
  result = result.replaceAll("\v", "\\v\v");

  result = result.replaceAll("\r", "\\r\r");
  result = result.replaceAll("\n", "\\n\n");
  result = result.replaceAll("\\r\r\\n\n", "\\r\\n\r\n");

  return result;
}

export function TokenViewer(props: {
  isFetching: boolean;
  model: string | undefined;
  data: TokenizerResult | undefined;
}) {
  const [indexHover, setIndexHover] = useState<null | number>(null);
  const [showWhitespace, setShowWhitespace] = useState(false);

  const tokenCount =
    props.data?.segments?.reduce((memo, i) => memo + i.tokens.length, 0) ?? 0;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="label-mono">Segmented text</span>
        <pre
          className={cn(
            "scrollbar-thin panel",
            props.isFetching && "opacity-60"
          )}
        >
          {tokenCount > 0 ? (
            props.data?.segments?.map(({ text }, idx) => (
              <span
                key={idx}
                onMouseEnter={() => setIndexHover(idx)}
                onMouseLeave={() => setIndexHover(null)}
                className={cn(
                  "rounded-[3px] transition-colors",
                  (indexHover == null || indexHover === idx) &&
                    COLORS[idx % COLORS.length]
                )}
              >
                {showWhitespace || indexHover === idx
                  ? encodeWhitespace(text)
                  : text}
              </span>
            ))
          ) : (
            <span className="text-slate-400">
              Paste or type text to see how it tokenizes…
            </span>
          )}
        </pre>
      </div>

      <div className="flex flex-col gap-2">
        <span className="label-mono">Token IDs</span>
        <pre
          className={cn(
            "scrollbar-thin panel",
            props.isFetching && "opacity-60"
          )}
        >
          {tokenCount > 0 ? (
            props.data?.segments?.map((segment, segmentIdx) => (
              <Fragment key={segmentIdx}>
                {segment.tokens.map((token) => (
                  <Fragment key={token.idx}>
                    <span
                      onMouseEnter={() => setIndexHover(segmentIdx)}
                      onMouseLeave={() => setIndexHover(null)}
                      className={cn(
                        "rounded-[3px] transition-colors",
                        indexHover === segmentIdx &&
                          COLORS[segmentIdx % COLORS.length]
                      )}
                    >
                      {token.id}
                    </span>
                    <span className="last-of-type:hidden">{", "}</span>
                  </Fragment>
                ))}
              </Fragment>
            ))
          ) : (
            <span className="text-slate-400">—</span>
          )}
        </pre>
      </div>

      <label className="flex w-fit cursor-pointer items-center gap-2 text-sm text-slate-600">
        <Checkbox
          id="terms"
          checked={showWhitespace}
          onClick={() => setShowWhitespace((v) => !v)}
        />
        Show whitespace
      </label>
    </div>
  );
}
