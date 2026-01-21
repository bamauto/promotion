export const REGIONS = {
  bundang: {
    id: 'bundang',
    name: '분당',
    nameEn: 'Bundang',
    domain: 'bundanghipublic.com',
    keyword: '하이퍼블릭',
    description: '분당 하이퍼블릭 가라오케 정보',
  },
  suwon: {
    id: 'suwon',
    name: '수원',
    nameEn: 'Suwon',
    domain: 'suwon.vip',
    keyword: '하이퍼블릭',
    description: '수원 하이퍼블릭 가라오케 정보',
  },
  dongtan: {
    id: 'dongtan',
    name: '동탄',
    nameEn: 'Dongtan',
    domain: 'dongtankaraoke.net',
    keyword: '가라오케',
    description: '동탄 가라오케 하이퍼블릭 정보',
  },
  jengja: {
    id: 'jengja',
    name: '정자',
    nameEn: 'Jengja',
    domain: 'jengjakaraoke.com',
    keyword: '하이퍼블릭',
    description: '정자 하이퍼블릭 가라오케 정보',
  },
  ingedong: {
    id: 'ingedong',
    name: '인계동',
    nameEn: 'Ingedong',
    domain: 'ingedongkaraoke.com',
    keyword: '가라오케',
    description: '인계동 가라오케 하이퍼블릭 정보',
  },
  gwanggyo: {
    id: 'gwanggyo',
    name: '광교',
    nameEn: 'Gwanggyo',
    domain: 'gwanggyokaraoke.com',
    keyword: '가라오케',
    description: '광교·광교중앙역·상현역 가라오케·하이퍼블릭 가이드',
  },
  yeongtong: {
    id: 'yeongtong',
    name: '영통',
    nameEn: 'Yeongtong',
    domain: 'yeongtongkaraoke.com',
    keyword: '가라오케',
    description: '영통 가라오케 하이퍼블릭 정보',
  },
  anyang: {
    id: 'anyang',
    name: '안양',
    nameEn: 'Anyang',
    domain: 'anyangkaraoke.com',
    keyword: '가라오케',
    description: '안양 가라오케 하이퍼블릭 정보',
  },
} as const;

export type RegionId = keyof typeof REGIONS;
export type Region = typeof REGIONS[RegionId];

export function isValidRegion(region: string): region is RegionId {
  return region in REGIONS;
}

export function getRegion(regionId: string): Region | null {
  if (isValidRegion(regionId)) {
    return REGIONS[regionId];
  }
  return null;
}

export function getAllRegionIds(): RegionId[] {
  return Object.keys(REGIONS) as RegionId[];
}

export function getRegionDomain(regionId: RegionId): string {
  return `https://${REGIONS[regionId].domain}`;
}

// 서비스 경로 정의
export const SERVICE_PATHS = {
  hyperpublic: '/hyperpublic',
  karaoke: '/karaoke',
  shirtsroom: '/shirtsroom',
  roomsalon: '/roomsalon',
  kimonoroom: '/kimonoroom',
  price: '/price-guide',
  beginner: '/beginner-guide',
} as const;

export type ServicePath = keyof typeof SERVICE_PATHS;

// 지역별 키워드 매핑 (콘텐츠 내 링크 생성용)
export const LINK_KEYWORDS: Record<string, { path: string; priority: number }> = {
  '하이퍼블릭': { path: SERVICE_PATHS.hyperpublic, priority: 1 },
  '가라오케': { path: SERVICE_PATHS.karaoke, priority: 2 },
  '노래방': { path: SERVICE_PATHS.karaoke, priority: 3 },
  '셔츠룸': { path: SERVICE_PATHS.shirtsroom, priority: 4 },
  '룸살롱': { path: SERVICE_PATHS.roomsalon, priority: 5 },
  '기모노룸': { path: SERVICE_PATHS.kimonoroom, priority: 6 },
  '가격': { path: SERVICE_PATHS.price, priority: 7 },
  '요금': { path: SERVICE_PATHS.price, priority: 8 },
  '초보자': { path: SERVICE_PATHS.beginner, priority: 9 },
  '처음': { path: SERVICE_PATHS.beginner, priority: 10 },
};
