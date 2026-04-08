export function ProductBottle() {
  return (
    <div className="relative mx-auto flex w-full max-w-sm items-center justify-center">
      <div className="absolute inset-8 rounded-full bg-[radial-gradient(circle,_rgba(214,185,118,0.35)_0%,_rgba(214,185,118,0)_70%)] blur-3xl" />
      <div className="relative h-[26rem] w-[16rem] rounded-[3rem] border border-white/60 bg-gradient-to-b from-[#2d4b34] via-[#1f3525] to-[#122015] p-4 shadow-[0_30px_80px_rgba(24,40,24,0.35)]">
        <div className="flex h-full flex-col items-center justify-between rounded-[2.25rem] border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02))] px-5 py-6 text-center text-white">
          <div className="space-y-1">
            <p className="text-[0.65rem] uppercase tracking-[0.45em] text-white/65">Sheen Mode</p>
            <p className="text-2xl font-semibold tracking-tight">Ghanal</p>
          </div>
          <div className="relative flex h-56 w-32 items-end justify-center">
            <div className="absolute bottom-0 h-44 w-28 rounded-[2.2rem] border border-white/20 bg-[linear-gradient(180deg,#d9c89d_0%,#b2894d_45%,#6a4b21_100%)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)]" />
            <div className="absolute bottom-32 h-16 w-18 rounded-t-[1.6rem] border border-white/20 bg-[#f4ead4]" />
            <div className="absolute bottom-38 h-10 w-14 rounded-t-[1rem] bg-[#394c36]" />
            <div className="absolute bottom-12 h-24 w-24 rounded-full border border-white/15 bg-white/10 blur-xl" />
            <div className="absolute bottom-10 h-28 w-20 rounded-[1.8rem] border border-white/35 bg-[linear-gradient(180deg,rgba(255,255,255,0.3),rgba(255,255,255,0.02))]" />
          </div>
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.35em] text-white/70">Hair Oil</p>
            <p className="rounded-full border border-white/20 px-3 py-1 text-xs tracking-wide text-white/80">Natural • Homemade • Premium</p>
          </div>
        </div>
      </div>
    </div>
  );
}