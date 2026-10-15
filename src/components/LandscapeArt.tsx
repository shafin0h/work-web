import React from 'react';

interface LandscapeArtProps {
  id: string;
  className?: string;
}

export const LandscapeArt: React.FC<LandscapeArtProps> = ({ id, className = '' }) => {
  switch (id) {
    case 'dolomites':
      return <DolomitesScene className={className} />;
    case 'patagonia':
      return <PatagoniaScene className={className} />;
    case 'banff':
      return <BanffScene className={className} />;
    case 'pyrenees':
      return <PyreneesScene className={className} />;
    default:
      return null;
  }
};

// 1. Dolomites: Jagged spires with fiery orange sunset alpenglow & misty clouds
const DolomitesScene: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 1600 900"
    preserveAspectRatio="xMidYMid slice"
    className={`w-full h-full select-none ${className}`}
    aria-label="Italian Dolomites with evening sunset alpenglow on jagged pinnacles"
  >
    <defs>
      <linearGradient id="dolomitesSky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#8ba2be" />
        <stop offset="35%" stopColor="#a4b4c8" />
        <stop offset="65%" stopColor="#cfb8b4" />
        <stop offset="100%" stopColor="#323c4a" />
      </linearGradient>

      {/* Warm evening sunburst on crags */}
      <linearGradient id="dolomitesAlpenglow" x1="0%" y1="0%" x2="100%" y2="80%">
        <stop offset="0%" stopColor="#ff8c42" />
        <stop offset="45%" stopColor="#e85d26" />
        <stop offset="85%" stopColor="#8c2e1b" />
        <stop offset="100%" stopColor="#3d1d1b" />
      </linearGradient>

      {/* Shadowed rock faces */}
      <linearGradient id="dolomitesDarkRock" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#414a58" />
        <stop offset="50%" stopColor="#2c3340" />
        <stop offset="100%" stopColor="#171b24" />
      </linearGradient>

      <linearGradient id="dolomitesDeepRock" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#2e3543" />
        <stop offset="100%" stopColor="#141822" />
      </linearGradient>

      {/* Glowing cloud mist */}
      <linearGradient id="dolomitesMist" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f7d4c8" stopOpacity="0.85" />
        <stop offset="50%" stopColor="#e0b8ab" stopOpacity="0.75" />
        <stop offset="100%" stopColor="#c5a198" stopOpacity="0.1" />
      </linearGradient>

      <linearGradient id="dolomitesSoftMist" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
        <stop offset="30%" stopColor="#fce4db" stopOpacity="0.65" />
        <stop offset="70%" stopColor="#eed0c5" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>

      <radialGradient id="sunGlow" cx="20%" cy="40%" r="50%">
        <stop offset="0%" stopColor="#ffaa64" stopOpacity="0.6" />
        <stop offset="40%" stopColor="#ea6b35" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#ea6b35" stopOpacity="0" />
      </radialGradient>

      <filter id="blurMist" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="24" />
      </filter>
    </defs>

    {/* Sky Backdrop */}
    <rect width="1600" height="900" fill="url(#dolomitesSky)" />

    {/* Distant atmospheric haze */}
    <rect width="1600" height="900" fill="url(#sunGlow)" />

    {/* Distant jagged ridges (deep slate purple) */}
    <path
      d="M0,520 L70,480 L140,510 L220,440 L280,470 L380,390 L450,430 L520,380 L610,420 L730,340 L800,380 L920,310 L990,370 L1080,300 L1180,360 L1260,330 L1340,390 L1450,340 L1530,370 L1600,320 L1600,900 L0,900 Z"
      fill="url(#dolomitesDeepRock)"
      opacity="0.8"
    />

    {/* Middle Right Jagged Spire Cluster (dark shadow crags like Cadini di Misurina) */}
    <path
      d="M850,900 L880,510 L920,480 L940,530 L970,440 L1010,430 L1030,470 L1070,390 L1100,370 L1140,430 L1180,360 L1210,340 L1230,380 L1270,330 L1310,380 L1350,310 L1390,370 L1440,330 L1470,390 L1520,340 L1570,420 L1600,390 L1600,900 Z"
      fill="url(#dolomitesDarkRock)"
    />

    {/* Main Focal Spire Cluster with Fiery Sunset Alpenglow (Center and Left) */}
    {/* Shadow facets of the main spires */}
    <path
      d="M20,900 L50,600 L90,560 L120,620 L170,500 L210,470 L250,530 L310,420 L350,450 L390,360 L430,340 L460,400 L500,320 L540,290 L570,340 L620,270 L660,310 L710,240 L750,290 L790,260 L830,340 L880,390 L920,450 L950,900 Z"
      fill="url(#dolomitesDarkRock)"
    />

    {/* Fiery illuminated faces where the golden sun strikes the left summits */}
    <path
      d="M70,900 L110,570 L160,510 L170,500 L190,540 L240,475 L280,440 L310,420 L330,480 L380,370 L420,345 L430,340 L440,390 L490,330 L530,295 L540,290 L555,340 L605,280 L620,270 L635,320 L695,250 L710,240 L725,290 L765,270 L790,260 L810,320 L840,370 L870,420 L890,900 Z"
      fill="url(#dolomitesAlpenglow)"
      opacity="0.95"
    />

    {/* Sharp razor needle highlights on the peaks */}
    <polygon points="710,240 725,290 705,330 690,270" fill="#ffb469" />
    <polygon points="620,270 635,320 615,350 600,290" fill="#ffa759" />
    <polygon points="540,290 555,340 535,370 520,310" fill="#ff9a47" />
    <polygon points="430,340 445,390 425,410 410,360" fill="#ff8b38" />
    <polygon points="310,420 325,460 305,480 295,440" fill="#ff7f30" />
    <polygon points="170,500 185,540 165,560 155,520" fill="#f06c28" />

    {/* Rolling misty cloud bank wrapping around the crags (Identical to video 00:01) */}
    <ellipse cx="650" cy="480" rx="420" ry="110" fill="url(#dolomitesMist)" filter="url(#blurMist)" />
    <ellipse cx="480" cy="460" rx="340" ry="90" fill="url(#dolomitesSoftMist)" filter="url(#blurMist)" />
    <ellipse cx="800" cy="510" rx="380" ry="100" fill="url(#dolomitesMist)" filter="url(#blurMist)" />
    <ellipse cx="320" cy="540" rx="280" ry="80" fill="url(#dolomitesSoftMist)" filter="url(#blurMist)" />

    {/* Foreground lower ridge silhouette in deep moody slate */}
    <path
      d="M0,900 L0,720 Q350,680 720,730 T1600,700 L1600,900 Z"
      fill="#0c0e14"
      opacity="0.85"
    />

    {/* Cinematic Vignette Overlay */}
    <rect width="1600" height="900" fill="url(#vignetteGrad)" opacity="0.45" />
    <defs>
      <radialGradient id="vignetteGrad" cx="50%" cy="50%" r="70%">
        <stop offset="60%" stopColor="#000000" stopOpacity="0" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
      </radialGradient>
    </defs>
  </svg>
);

// 2. Patagonia: Towering rose/pink alpenglow granite spires (Fitz Roy style)
const PatagoniaScene: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 1600 900"
    preserveAspectRatio="xMidYMid slice"
    className={`w-full h-full select-none ${className}`}
    aria-label="Patagonia granite towers glowing in pink and rose alpine light"
  >
    <defs>
      {/* Sky: Delicate pastel lilac and salmon-rose */}
      <linearGradient id="patagoniaSky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#caa4bf" />
        <stop offset="35%" stopColor="#e8b5be" />
        <stop offset="70%" stopColor="#f8c8cb" />
        <stop offset="100%" stopColor="#e3a7a9" />
      </linearGradient>

      {/* Main rose alpenglow mountain facet */}
      <linearGradient id="roseAlpenglow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f39ba3" />
        <stop offset="40%" stopColor="#df7a88" />
        <stop offset="80%" stopColor="#be576d" />
        <stop offset="100%" stopColor="#6d3042" />
      </linearGradient>

      {/* Deep purple/plum shadowed mountain face */}
      <linearGradient id="patagoniaShadow" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#87576a" />
        <stop offset="50%" stopColor="#5c3848" />
        <stop offset="100%" stopColor="#2e1a25" />
      </linearGradient>

      {/* Snow highlight alpenglow */}
      <linearGradient id="snowAlpenglow" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffe7eb" />
        <stop offset="100%" stopColor="#f6bac4" />
      </linearGradient>

      {/* Wispy lenticular cloud layer */}
      <linearGradient id="lenticularCloud" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
        <stop offset="40%" stopColor="#ffe6ea" stopOpacity="0.45" />
        <stop offset="80%" stopColor="#ffd2dc" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* Sky */}
    <rect width="1600" height="900" fill="url(#patagoniaSky)" />

    {/* Wispy sunrise cirrus streaks */}
    <ellipse cx="600" cy="180" rx="700" ry="30" fill="url(#lenticularCloud)" />
    <ellipse cx="1100" cy="120" rx="500" ry="22" fill="url(#lenticularCloud)" />
    <ellipse cx="300" cy="240" rx="400" ry="20" fill="url(#lenticularCloud)" />

    {/* Distant jagged ridges */}
    <path
      d="M0,560 L140,510 L310,480 L480,520 L640,460 L800,500 L950,440 L1120,490 L1280,450 L1450,510 L1600,470 L1600,900 L0,900 Z"
      fill="#b8849b"
      opacity="0.6"
    />

    {/* Massive Central Fitz Roy Granite Spire & Peaks */}
    {/* Shadow side */}
    <path
      d="M0,900 L0,590 L120,530 L220,560 L360,460 L450,490 L580,390 L680,420 L760,280 L810,240 L850,290 L920,230 L970,270 L1020,340 L1140,290 L1210,350 L1350,380 L1480,460 L1600,430 L1600,900 Z"
      fill="url(#patagoniaShadow)"
    />

    {/* Sunlit Rose Alpenglow Facets */}
    <path
      d="M180,900 L320,500 L440,490 L540,410 L680,420 L740,290 L760,280 L800,245 L810,240 L840,290 L880,245 L920,230 L950,270 L980,260 L1010,335 L1080,310 L1140,290 L1190,345 L1300,380 L1420,450 L1560,440 L1600,500 L1600,900 Z"
      fill="url(#roseAlpenglow)"
    />

    {/* Sharp snow couloirs and icy glaciers with warm pink reflections */}
    <polygon points="760,280 770,360 750,390 735,320" fill="url(#snowAlpenglow)" />
    <polygon points="810,240 825,340 790,390 780,290" fill="url(#snowAlpenglow)" />
    <polygon points="920,230 940,320 905,370 890,280" fill="url(#snowAlpenglow)" />
    <polygon points="1020,340 1050,420 1000,440 990,370" fill="url(#snowAlpenglow)" />
    <polygon points="1140,290 1160,380 1120,410 1105,340" fill="url(#snowAlpenglow)" />

    {/* Secondary Mid-Ground Ridge with warm jagged rock texture */}
    <path
      d="M0,900 L0,680 L180,620 L380,650 L590,560 L780,610 L980,540 L1180,590 L1380,530 L1600,610 L1600,900 Z"
      fill="#884459"
      opacity="0.8"
    />

    {/* Foreground Mountain Slopes in Deep Burgundy / Plum */}
    <path
      d="M0,900 L0,760 Q400,690 850,740 T1600,720 L1600,900 Z"
      fill="#3b1725"
    />

    {/* Subtle atmospheric mist layer in valley */}
    <rect x="0" y="620" width="1600" height="120" fill="url(#patagoniaMistGrad)" opacity="0.4" />
    <defs>
      <linearGradient id="patagoniaMistGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffc0cb" stopOpacity="0" />
        <stop offset="50%" stopColor="#ffd8df" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#ffc0cb" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

// 3. Banff: Emerald turquoise glacial river with foreground pine trees & snow-capped peaks
const BanffScene: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 1600 900"
    preserveAspectRatio="xMidYMid slice"
    className={`w-full h-full select-none ${className}`}
    aria-label="Banff Canadian Rockies with turquoise glacial lake and evergreen pines"
  >
    <defs>
      {/* Crisp alpine summer sky */}
      <linearGradient id="banffSky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4a8bc2" />
        <stop offset="45%" stopColor="#75aedd" />
        <stop offset="80%" stopColor="#b1d7f5" />
        <stop offset="100%" stopColor="#dbeafe" />
      </linearGradient>

      {/* Pristine glacial turquoise river */}
      <linearGradient id="banffWater" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0891b2" />
        <stop offset="35%" stopColor="#06b6d4" />
        <stop offset="70%" stopColor="#22d3ee" />
        <stop offset="100%" stopColor="#67e8f9" />
      </linearGradient>

      {/* Sunlit limestone mountain face */}
      <linearGradient id="banffRock" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8191a0" />
        <stop offset="50%" stopColor="#556677" />
        <stop offset="100%" stopColor="#2e3c4a" />
      </linearGradient>

      {/* Conifer evergreen dark forest */}
      <linearGradient id="pineGreen" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1e3d2f" />
        <stop offset="60%" stopColor="#12271e" />
        <stop offset="100%" stopColor="#0a1712" />
      </linearGradient>

      {/* Foreground lush pine needle branches */}
      <linearGradient id="foregroundPine" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#234e3b" />
        <stop offset="100%" stopColor="#0d2118" />
      </linearGradient>

      {/* Fluffy white cumulus cloud */}
      <radialGradient id="cumulusCloud" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
        <stop offset="70%" stopColor="#ffffff" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Sky */}
    <rect width="1600" height="900" fill="url(#banffSky)" />

    {/* Bright Puffy Summer Clouds (Identical to 00:03 video) */}
    <circle cx="580" cy="180" r="110" fill="url(#cumulusCloud)" />
    <circle cx="680" cy="160" r="130" fill="url(#cumulusCloud)" />
    <circle cx="790" cy="190" r="100" fill="url(#cumulusCloud)" />
    <circle cx="920" cy="210" r="85" fill="url(#cumulusCloud)" />
    <circle cx="480" cy="210" r="90" fill="url(#cumulusCloud)" />

    {/* Distant Snow-Capped Rocky Mountain Ridge */}
    <path
      d="M0,520 L80,480 L180,430 L270,390 L360,420 L480,330 L560,370 L650,300 L730,350 L840,290 L950,360 L1060,320 L1180,380 L1300,340 L1420,400 L1600,350 L1600,900 L0,900 Z"
      fill="url(#banffRock)"
    />

    {/* Snow caps on mountain summits */}
    <polygon points="480,330 520,380 440,390" fill="#f8fafc" />
    <polygon points="650,300 690,360 620,370" fill="#ffffff" />
    <polygon points="840,290 880,350 810,360" fill="#f1f5f9" />
    <polygon points="1060,320 1100,370 1030,380" fill="#ffffff" />

    {/* Mid-ground foothills with dense spruce & fir forest */}
    <path
      d="M0,640 L120,580 L290,620 L450,560 L620,590 L790,540 L980,580 L1150,550 L1350,600 L1600,560 L1600,900 L0,900 Z"
      fill="url(#pineGreen)"
    />

    {/* Glacial Valley with Winding Turquoise River (Identical to 00:03 video) */}
    <path
      d="M260,650 Q480,630 680,660 T1100,690 L1180,780 Q780,740 420,770 L260,650 Z"
      fill="url(#banffWater)"
    />
    {/* Glacial water shimmer highlights */}
    <path
      d="M450,670 Q600,655 780,680 T1040,710"
      stroke="#a5f3fc"
      strokeWidth="4"
      strokeLinecap="round"
      opacity="0.8"
      fill="none"
    />

    {/* Lower shores and valley slopes */}
    <path
      d="M0,900 L0,740 L280,700 L560,760 L920,740 L1240,790 L1600,750 L1600,900 Z"
      fill="#112219"
    />

    {/* Prominent Foreground Evergreen Pine Trees Framing the Right Side (Frame 00:03) */}
    {/* Large Pine 1 */}
    <g transform="translate(1280, 200)">
      {/* Pine Trunk */}
      <rect x="70" y="240" width="22" height="460" fill="#2d1c13" />
      {/* Pine Tier Branches */}
      <polygon points="80,10 40,70 120,70" fill="url(#foregroundPine)" />
      <polygon points="80,50 30,130 130,130" fill="url(#foregroundPine)" />
      <polygon points="80,100 20,200 140,200" fill="url(#foregroundPine)" />
      <polygon points="80,160 5,280 155,280" fill="url(#foregroundPine)" />
      <polygon points="80,230 -10,370 170,370" fill="url(#foregroundPine)" />
      <polygon points="80,310 -30,480 190,480" fill="url(#foregroundPine)" />
    </g>

    {/* Large Pine 2 (Overlapping right edge) */}
    <g transform="translate(1420, 140)">
      <rect x="80" y="260" width="26" height="500" fill="#24160e" />
      <polygon points="90,0 50,70 130,70" fill="#143224" />
      <polygon points="90,40 30,140 150,140" fill="#143224" />
      <polygon points="90,110 10,230 170,230" fill="#143224" />
      <polygon points="90,190 -10,330 190,330" fill="#143224" />
      <polygon points="90,280 -30,450 210,450" fill="#143224" />
    </g>

    {/* Left side foreground pine accents */}
    <g transform="translate(40, 520) scale(0.65)">
      <polygon points="60,0 20,90 100,90" fill="url(#foregroundPine)" />
      <polygon points="60,60 10,170 110,170" fill="url(#foregroundPine)" />
      <polygon points="60,130 -10,270 130,270" fill="url(#foregroundPine)" />
    </g>
  </svg>
);

// 4. Pyrenees: Moody misty dark pine trees & dramatic sheer granite cliffside (Frames 00:04 - 00:05)
const PyreneesScene: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 1600 900"
    preserveAspectRatio="xMidYMid slice"
    className={`w-full h-full select-none ${className}`}
    aria-label="Moody atmospheric Pyrenees granite cliff and dark evergreen forest"
  >
    <defs>
      {/* Overcast atmospheric moody storm sky */}
      <linearGradient id="pyreneesSky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4f5963" />
        <stop offset="40%" stopColor="#737d87" />
        <stop offset="70%" stopColor="#9ba5ad" />
        <stop offset="100%" stopColor="#76828e" />
      </linearGradient>

      {/* Sheer dark granite cliff face */}
      <linearGradient id="graniteCliff" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4a525d" />
        <stop offset="45%" stopColor="#2d333b" />
        <stop offset="85%" stopColor="#1a1e24" />
        <stop offset="100%" stopColor="#0e1115" />
      </linearGradient>

      {/* Dark moody pine forest on lower slopes */}
      <linearGradient id="darkForest" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1e2c24" />
        <stop offset="50%" stopColor="#131e18" />
        <stop offset="100%" stopColor="#09100c" />
      </linearGradient>

      {/* Atmospheric misty cloud bank filter */}
      <linearGradient id="pyreneesFog" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#b2bdc7" stopOpacity="0" />
        <stop offset="45%" stopColor="#cad5df" stopOpacity="0.55" />
        <stop offset="85%" stopColor="#a3afba" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#8d99a4" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* Overcast Sky */}
    <rect width="1600" height="900" fill="url(#pyreneesSky)" />

    {/* Moody low storm cloud bank */}
    <ellipse cx="800" cy="220" rx="900" ry="120" fill="url(#pyreneesFog)" />
    <ellipse cx="400" cy="280" rx="600" ry="90" fill="url(#pyreneesFog)" />

    {/* Colossal Granite Crag & Cliff Wall on the Left & Center (Frames 00:04 - 00:05) */}
    <path
      d="M0,900 L0,260 L80,240 L160,280 L240,210 L330,190 L420,240 L510,170 L600,210 L700,160 L780,220 L870,180 L960,250 L1080,290 L1200,360 L1340,430 L1600,470 L1600,900 Z"
      fill="url(#graniteCliff)"
    />

    {/* Vertical rock fractures and cliff stratification lines */}
    <path
      d="M330,190 L360,380 L340,540 M510,170 L540,360 L520,580 M700,160 L730,340 L710,520 M870,180 L900,390"
      stroke="#5d6672"
      strokeWidth="2.5"
      strokeOpacity="0.4"
      fill="none"
    />

    {/* Low mist hugging the crag base */}
    <path
      d="M200,430 Q550,380 900,420 T1500,460 L1500,560 Q900,510 500,540 Z"
      fill="url(#pyreneesFog)"
      opacity="0.6"
    />

    {/* Massive Steep Conifer Forest Filling Lower Slopes & Valleys (Frames 00:04-00:05) */}
    <path
      d="M0,900 L0,520 Q320,460 680,510 T1600,460 L1600,900 Z"
      fill="url(#darkForest)"
    />

    {/* Individual Conifer Silhouettes Cascading Across the Slope */}
    <g fill="#0b140e">
      {/* Dense cluster of tall pine tree tops */}
      {[
        120, 160, 210, 260, 310, 370, 420, 480, 540, 600, 660, 720, 780, 840, 900, 960, 1030,
        1100, 1170, 1240, 1310, 1380, 1450, 1520, 1580
      ].map((x, i) => {
        const height = 45 + (i % 5) * 12;
        const yBase = 530 + Math.sin(i * 0.4) * 35;
        return (
          <polygon
            key={i}
            points={`${x},${yBase - height} ${x - 14},${yBase} ${x + 14},${yBase}`}
          />
        );
      })}

      {/* Second row of darker, closer pine crowns */}
      {[
        80, 140, 200, 280, 350, 440, 510, 590, 670, 750, 830, 920, 1000, 1090, 1180, 1270, 1360,
        1460, 1540
      ].map((x, i) => {
        const height = 65 + (i % 4) * 15;
        const yBase = 620 + Math.cos(i * 0.5) * 30;
        return (
          <polygon
            key={`r2-${i}`}
            points={`${x},${yBase - height} ${x - 18},${yBase} ${x + 18},${yBase}`}
          />
        );
      })}

      {/* Third foreground row of dense pines */}
      {[50, 130, 230, 340, 460, 580, 700, 820, 950, 1080, 1220, 1370, 1500].map((x, i) => {
        const height = 85 + (i % 3) * 20;
        const yBase = 720 + Math.sin(i * 0.7) * 25;
        return (
          <polygon
            key={`r3-${i}`}
            points={`${x},${yBase - height} ${x - 22},${yBase} ${x + 22},${yBase}`}
          />
        );
      })}
    </g>

    {/* Moody Dark Foreground Base */}
    <rect x="0" y="780" width="1600" height="120" fill="#050806" />

    {/* Overcast Dark Vignette */}
    <rect width="1600" height="900" fill="url(#pyreneesVignette)" opacity="0.4" />
    <defs>
      <radialGradient id="pyreneesVignette" cx="50%" cy="50%" r="65%">
        <stop offset="60%" stopColor="#000000" stopOpacity="0" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.75" />
      </radialGradient>
    </defs>
  </svg>
);
