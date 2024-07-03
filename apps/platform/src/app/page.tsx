"use client";
import { supportedChains, Avatar } from "@allo/kit";
import Link from "next/link";
import HeroBanner from './HeroBanner';

export default function Home() {
  return (
    <section>
      <HeroBanner/>

      <h3 className="text-2xl text-center mb-8 font-semibold mt-5">Browse Rounds</h3>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
        {supportedChains.map((chain) => (
          <Link
            key={chain.id}
            href={`/${chain.id}`}
            className="flex gap-2 items-center hover:bg-gray-100 rounded-xl p-2"
          >
            <Avatar className="size-8">
              <span
                className="size-8"
                dangerouslySetInnerHTML={{ __html: fixSvg(chain.icon) }}
              />
            </Avatar>
            <div className="text-lg capitalize">{chain.name}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function fixSvg(svg: string) {
  return svg.replace(/(width|height)="[^"]*"/g, '$1="100%"');
}
