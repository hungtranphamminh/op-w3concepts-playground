"use client";
import {
  TWSpinnerFancyText,
  TWDoneLoadFancyText,
  TWPreLoadFancyText,
} from "../TailwindUI/Spinner";

interface SingleStatusBar {
  pre: string;
  loading: string;
  complete: string;
  middle: number;
  indicator: number;
}

export default function SingleStatusBar({
  pre,
  loading,
  complete,
  middle,
  indicator,
}: SingleStatusBar) {
  return (
    <>
      {indicator <= middle - 2 && <TWPreLoadFancyText text={pre} />}
      {indicator === middle && <TWSpinnerFancyText text={loading} />}
      {indicator >= middle + 1 && <TWDoneLoadFancyText text={complete} />}
    </>
  );
}
