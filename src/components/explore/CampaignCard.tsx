import Image from "next/image";
import Link from "next/link";

interface CampaignCardProps {
  id: number;
  title: string;
  image: string;
  raised: number;
  goal: number;
  daysLeft: number;
  progress: number;
  donations: string;
}

export default function CampaignCard({
  id,
  title,
  image,
  raised,
  goal,
  daysLeft,
  progress,
  donations,
}: CampaignCardProps) {
  return (
    <article className="bg-white border border-[#959aa8]/20 rounded-[40px] overflow-hidden flex flex-col pb-14">
      <Link href={`/campaign/${id}`} className="block relative aspect-[4/3]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        <span className="absolute top-5 right-5 flex items-center gap-2 px-5 py-2 rounded-full bg-[#01ee8b] text-[#474747] text-sm font-semibold">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          {donations}
        </span>
      </Link>
      <div className="p-8 flex flex-col gap-6">
        <Link href={`/campaign/${id}`}>
          <h3 className="font-bold text-[#282b33] text-xl leading-tight line-clamp-2 hover:text-[#9550ff]">
            {title}
          </h3>
        </Link>
        <div className="h-2.5 bg-[#d9d9d9]/50 rounded-xl overflow-hidden">
          <div
            className="h-full bg-[#01ee8b] rounded-xl"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center gap-5 text-[#959aa8] text-base">
          <span>Raised €{raised.toLocaleString()}</span>
          <span className="flex-1 border-t border-dashed border-[#959aa8]/50" />
          <span>€{goal.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-5 text-[#959aa8] text-base">
          <span>Days remaining</span>
          <span className="flex-1 border-t border-dashed border-[#959aa8]/50" />
          <span>{daysLeft}</span>
        </div>
        <Link
          href={`/campaign/${id}`}
          className="inline-flex items-center gap-2 w-fit px-5 py-3 rounded-full bg-[#9550ff] text-white text-lg font-semibold hover:bg-[#8440e8]"
        >
          Donate
          <svg className="w-5 h-5 rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
