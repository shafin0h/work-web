export interface PhotoCollection {
  id: string;
  title: string;
  subtitle: string;
  region: string;
  coordinates: string;
  elevation: string;
  date: string;
  camera: string;
  lens: string;
  settings: string;
  aspect: string;
  description: string;
  dominantColor: string;
  accentColor: string;
}

export const COLLECTIONS: PhotoCollection[] = [
  {
    id: 'dolomites',
    title: 'Clothing',
    subtitle: 'Cadore & Auronzo di Cadore',
    region: 'South Tyrol & Veneto, Italy',
    coordinates: '46°32\'58" N, 12°17\'52" E',
    elevation: '2,999 m · Cadini di Misurina',
    date: 'October 2025 · Twilight Alpenglow',
    camera: 'Sony α7R V · 61 MP Full-Frame',
    lens: 'FE 24-70mm ƒ/2.8 GM II @ 48mm',
    settings: '1/320s · ƒ/8.0 · ISO 100',
    aspect: '16:9 Cinema Pan',
    description: 'Drifting autumn vapor caught in the golden amber alpenglow across the razor-sharp limestone towers of Cadini di Misurina at twilight.',
    dominantColor: '#e07a47',
    accentColor: '#f97316'
  },
  {
    id: 'patagonia',
    title: 'Product',
    subtitle: 'Los Glaciares National Park',
    region: 'Santa Cruz Province, Argentina',
    coordinates: '49°16\'17" S, 73°02\'36" W',
    elevation: '3,405 m · Monte Fitz Roy',
    date: 'February 2026 · First Light',
    camera: 'Hasselblad X2D 100C · 100 MP',
    lens: 'XCD 55mm ƒ/2.5 V',
    settings: '1/125s · ƒ/11 · ISO 64',
    aspect: '16:9 Ultra-Resolution',
    description: 'The iconic granite tooth of Fitz Roy cloaked in ethereal pastel pink and rose sunrise light, towering above the glacial icefields of Patagonia.',
    dominantColor: '#e89da2',
    accentColor: '#f43f5e'
  },
  {
    id: 'banff',
    title: 'Course',
    subtitle: 'Canadian Rocky Mountain Parks',
    region: 'Alberta, Canada',
    coordinates: '51°10\'48" N, 115°34\'18" W',
    elevation: '2,998 m · Mount Rundle & Bow Valley',
    date: 'July 2025 · Midday Sun & Cumulus',
    camera: 'Sony α7R V · 61 MP Full-Frame',
    lens: 'FE 16-35mm ƒ/2.8 GM II @ 28mm',
    settings: '1/500s · ƒ/7.1 · ISO 100',
    aspect: '16:9 Alpine Panorama',
    description: 'Glacial meltwater meandering through vibrant evergreen pine forests, flanked by colossal limestone towers reaching into crystalline summer skies.',
    dominantColor: '#38bdf8',
    accentColor: '#0ea5e9'
  },
  {
    id: 'pyrenees',
    title: 'Others',
    subtitle: 'Parc National des Pyrénées',
    region: 'Occitanie, France & Aragon, Spain',
    coordinates: '42°46\'18" N, 0°08\'40" E',
    elevation: '3,298 m · Cirque de Gavarnie',
    date: 'November 2025 · Mist & Overcast',
    camera: 'Leica SL2 · 47 MP Full-Frame',
    lens: 'Super-Vario-Elmar-SL 16-35mm ƒ/3.5-4.5',
    settings: '1/200s · ƒ/5.6 · ISO 200',
    aspect: '16:9 Mood Monograph',
    description: 'Dense subalpine conifers ascending towards towering sheer granite escarpments veiled in low rolling storm clouds and damp alpine silence.',
    dominantColor: '#475569',
    accentColor: '#64748b'
  }
];
