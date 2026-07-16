"use client";

import Script from "next/script";
import markup from "./markup";
import appScript from "./script-content";

export default function Home() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: markup }} />
      <Script
        id="mandarin-master-app"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: appScript }}
      />
    </>
  );
}
