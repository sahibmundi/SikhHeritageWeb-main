export interface AudioTrack {
  id: string;
  title: string;
  raagId: string;
  shabadId?: string;
  performer: string;
  duration: string;
  audioUrl: string;
  description: string;
}

export const audioTracks: AudioTrack[] = [
  {
    id: "audio-1",
    title: "ਸਲੋਕ ਮਹਲਾ ੯",
    raagId: "gauri",
    shabadId: "shabad-1",
    performer: "ਭਾਈ ਭੁਪਿੰਦਰ ਸਿੰਘ, ਅਮਰਬੀਰ ਸਿੰਘ",
    duration: "23:34",
    audioUrl: "/attached_assets/SALOK MAHALA 9 ਸਲੋਕ ਮਹਲਾ ੯ KIRTAN ROOP VICH BHAI BHUPINDER SINGH HAZOORI RAGI AMARBIR SINGH_1763366868711.mp3",
    description: "ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ ਦੀ ਬਾਣੀ - ਕੀਰਤਨ ਰੂਪ ਵਿੱਚ"
  },
  {
    id: "audio-2",
    title: "ਜੋ ਨਰੁ ਦੁਖ ਮੈ ਦੁਖੁ ਨਹੀ ਮਾਨੈ",
    raagId: "sorath",
    shabadId: "shabad-3",
    performer: "ਭਾਈ ਰਣਧੀਰ ਸਿੰਘ",
    duration: "9:31",
    audioUrl: "/attached_assets/Bhai Randhir Singh Sadho Ram Sharan Bisrama Part 1 of 2_1763366868728.mp3",
    description: "ਰਾਗ ਸੋਰਠਿ - ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ"
  },
  {
    id: "audio-5",
    title: "ਰਾਮ ਨਾਮੁ ਜਪਿ ਹਿਰਦੈ ਮਾਹਿ",
    raagId: "dhanasri",
    shabadId: "shabad-6",
    performer: "ਭਾਈ ਰਣਧੀਰ ਸਿੰਘ",
    duration: "11:13",
    audioUrl: "/attached_assets/Kou Mayi Bhuliyo Man Samjhave - Bhai Randhir Singh - Live Sri Harmandir Sahib_1763366868730.mp3",
    description: "ਰਾਗ ਧਨਾਸਰੀ - ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ"
  },
  {
    id: "audio-6",
    title: "ਮਨ ਕਹਾ ਬਿਸਾਰਿਓ ਰਾਮ ਨਾਮੁ",
    raagId: "gauri",
    performer: "ਭਾਈ ਰਣਧੀਰ ਸਿੰਘ",
    duration: "11:43",
    audioUrl: "/attached_assets/Man Kaha Bisario Raam Naam - Bhai Randhir Singh - Live Sri Harmandir Sahib_1763366868715.mp3",
    description: "ਰਾਗ ਗਉੜੀ - ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ"
  },
  {
    id: "audio-7",
    title: "ਮਨ ਰੇ ਕਹਾ ਭਇਓ ਤੈ ਬਉਰਾ",
    raagId: "tilang",
    performer: "ਭਾਈ ਗੁਰਦੇਵ ਸਿੰਘ",
    duration: "8:19",
    audioUrl: "/attached_assets/Shabad for Today (Thursday 19.05.2022) Man Re Kahan Bhaiyo Tai Baura -Bhai Gurdev Singh_1763366868727.mp3",
    description: "ਰਾਗ ਤਿਲੰਗ - ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ"
  },
  {
    id: "audio-8",
    title: "ਕਹਾ ਭੁਲਿਓ ਰੇ ਝੂਠੇ ਲੋਭ ਲਾਗਿ",
    raagId: "gauri",
    performer: "ਭਾਈ ਰਣਧੀਰ ਸਿੰਘ",
    duration: "10:38",
    audioUrl: "/attached_assets/Kaha Bhuliyo Re Jhoote Lobh Laag - Bhai Randhir Singh - 03 12 06 - Live Sri Harmandir Sahib_1763366868714.mp3",
    description: "ਰਾਗ ਗਉੜੀ - ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ"
  },
  {
    id: "audio-9",
    title: "ਮਾਈ ਮਨ ਮੇਰੋ ਬਸਿ ਨਾਹੀ",
    raagId: "bilawal",
    performer: "ਭਾਈ ਕਮਲਜੀਤ ਸਿੰਘ",
    duration: "13:14",
    audioUrl: "/attached_assets/Maai Man Mero Bas Nahi_1763366868718.mp3",
    description: "ਰਾਗ ਬਿਲਾਵਲੁ - ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ"
  },
  {
    id: "audio-10",
    title: "ਮਾਈ ਮੈ ਧਨੁ ਪਾਇਓ ਹਰਿ ਨਾਮੁ",
    raagId: "gauri",
    performer: "ਭਾਈ ਜਗਤਾਰ ਸਿੰਘ",
    duration: "11:14",
    audioUrl: "/attached_assets/Maai Mai Dhan Paayo Har Naam_1763366868715.mp3",
    description: "ਰਾਗ ਗਉੜੀ - ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ"
  },
  {
    id: "audio-11",
    title: "ਮਨ ਕੀ ਮਨ ਹੀ ਮਾਹੇ ਰਹੀ",
    raagId: "jaitsiri",
    performer: "ਭਾਈ ਰਣਧੀਰ ਸਿੰਘ",
    duration: "6:03",
    audioUrl: "/attached_assets/Man Ki Man Hi Mahe Rahi_1763366868721.mp3",
    description: "ਰਾਗ ਜੈਤਸਰੀ - ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ"
  },
  {
    id: "audio-12",
    title: "ਮਨ ਰੇ ਕਉਨ ਕੁਮਤਿ ਤੈਂ ਲੀਨੀ",
    raagId: "ramkali",
    performer: "ਭਾਈ ਕਮਲਜੀਤ ਸਿੰਘ",
    duration: "9:41",
    audioUrl: "/attached_assets/Man Re Kaun Kumat Tain Lini - Bhai Kamaljeet Singh Ji and Jatha (Mar 29 2011)_1763366868720.mp3",
    description: "ਰਾਗ ਰਾਮਕਲੀ - ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ"
  },
  {
    id: "audio-13",
    title: "ਮਨ ਰੇ ਪ੍ਰਭ ਕੀ ਸਰਨਿ ਬਿਚਾਰੋ",
    raagId: "maru",
    performer: "ਭਾਈ ਕਮਲਜੀਤ ਸਿੰਘ",
    duration: "10:39",
    audioUrl: "/attached_assets/Man Re Prabh Ki Saran Bicharo_1763366868719.mp3",
    description: "ਰਾਗ ਮਾਰੂ - ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ"
  },
  {
    id: "audio-14",
    title: "ਪਾਪੀ ਹਿਏ ਮਾਹਿ ਕਾਮੁ ਬਸੈ",
    raagId: "basant",
    performer: "ਭਾਈ ਕੁਲਦੀਪ ਸਿੰਘ",
    duration: "6:51",
    audioUrl: "/attached_assets/Paapi Hiye Main Kaam Basae_1763366868716.mp3",
    description: "ਰਾਗ ਬਸੰਤ - ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ"
  },
  {
    id: "audio-15",
    title: "ਰੇ ਮਨ ਰਾਮ ਸਿਉ ਕਰਿ ਪ੍ਰੀਤਿ",
    raagId: "sarang",
    performer: "ਭਾਈ ਜਗਤਾਰ ਸਿੰਘ",
    duration: "7:14",
    audioUrl: "/attached_assets/Re Man Ram Sio Kar Preet_1763366868722.mp3",
    description: "ਰਾਗ ਸਾਰੰਗ - ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ"
  },
  {
    id: "audio-16",
    title: "ਰੇ ਨਰ ਐਹ ਸਾਚੀ ਜੀਅ ਧਾਰਿ",
    raagId: "devgandhari",
    performer: "ਭਾਈ ਕੁਲਦੀਪ ਸਿੰਘ",
    duration: "5:36",
    audioUrl: "/attached_assets/Re Nar Eh Sachi Jee Dhar_1763366868717.mp3",
    description: "ਰਾਗ ਦੇਵਗੰਧਾਰੀ - ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ"
  },
  {
    id: "audio-17",
    title: "ਸਾਧੋ ਏਹੋ ਮਨੁ ਗਹਿਓ ਨ ਜਾਈ",
    raagId: "todi",
    performer: "ਭਾਈ ਰਣਧੀਰ ਸਿੰਘ",
    duration: "8:47",
    audioUrl: "/attached_assets/Sadho Eho Man Geheyo Na Jayi - Bhai Randhir Singh - Live Sri Harmandir Sahib_1763366868731.mp3",
    description: "ਰਾਗ ਟੋਡੀ - ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ"
  },
  {
    id: "audio-18",
    title: "ਬਿਰਥਾ ਕਾਹੇ ਕਉਨੁ ਸਿਉ ਮਨ ਕੀ",
    raagId: "bihagra",
    performer: "ਭਾਈ ਕੁਲਦੀਪ ਸਿੰਘ",
    duration: "7:24",
    audioUrl: "/attached_assets/Birtha Kaho Kaun Seo Man Ki Bhai Kuldeep Singh Ji Hazoori Ragi Darbar Sahib_1763366868724.mp3",
    description: "ਰਾਗ ਬਿਹਾਗੜਾ - ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ"
  },
  {
    id: "audio-19",
    title: "ਬੀਤ ਜਹੇ ਬੀਤ ਜਹੇ",
    raagId: "jaijawanti",
    performer: "ਭਾਈ ਕਮਲਜੀਤ ਸਿੰਘ",
    duration: "4:17",
    audioUrl: "/attached_assets/Beet Jehe Beet Jehe_1763366868713.mp3",
    description: "ਰਾਗ ਜੈਜਾਵੰਤੀ - ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ"
  },
  {
    id: "audio-20",
    title: "ਝੂਠੀ ਦੇਖੀ ਪ੍ਰੀਤਿ ਜਗਤ ਮੈਂ",
    raagId: "gauri",
    performer: "ਭਾਈ ਜਗਤਾਰ ਸਿੰਘ",
    duration: "11:01",
    audioUrl: "/attached_assets/jhoothi dekhi preet jagat meh bhai Jagtar Singh Ji hazoori ragi darbar sahib Amritsar_1763366868722.mp3",
    description: "ਰਾਗ ਗਉੜੀ - ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ"
  }
];
