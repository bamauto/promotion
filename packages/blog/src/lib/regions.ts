export const REGIONS = {
  bundang: {
    id: 'bundang',
    name: '분당',
    nameEn: 'Bundang',
    domain: 'bundanghipublic.com',
    keyword: '하이퍼블릭',
    description: '분당 하이퍼블릭 가라오케 정보',
    urlPrefix: 'bundang',
    hyperpubSlug: 'hyperpub',
    pricePrefix: 'entertainment-',
  },
  suwon: {
    id: 'suwon',
    name: '수원',
    nameEn: 'Suwon',
    domain: 'suwon.vip',
    keyword: '하이퍼블릭',
    description: '수원 하이퍼블릭 가라오케 정보',
    urlPrefix: 'suwon',
    hyperpubSlug: 'highpub',
    pricePrefix: 'entertainment-',
  },
  dongtan: {
    id: 'dongtan',
    name: '동탄',
    nameEn: 'Dongtan',
    domain: 'dongtankaraoke.net',
    keyword: '가라오케',
    description: '동탄 가라오케 하이퍼블릭 정보',
    urlPrefix: 'dongtan',
    hyperpubSlug: 'highpub',
    pricePrefix: 'entertainment-',
  },
  jengja: {
    id: 'jengja',
    name: '정자',
    nameEn: 'Jengja',
    domain: 'jengjakaraoke.com',
    keyword: '하이퍼블릭',
    description: '정자 하이퍼블릭 가라오케 정보',
    urlPrefix: 'jeongja',
    hyperpubSlug: 'highpub',
    pricePrefix: 'entertainment-',
  },
  ingedong: {
    id: 'ingedong',
    name: '인계동',
    nameEn: 'Ingedong',
    domain: 'ingedongkaraoke.com',
    keyword: '가라오케',
    description: '인계동 가라오케 하이퍼블릭 정보',
    urlPrefix: 'ingedong',
    hyperpubSlug: 'hyperpublic',
    pricePrefix: '',
  },
  gwanggyo: {
    id: 'gwanggyo',
    name: '광교',
    nameEn: 'Gwanggyo',
    domain: 'gwanggyokaraoke.com',
    keyword: '가라오케',
    description: '광교·광교중앙역·상현역 가라오케·하이퍼블릭 가이드',
    urlPrefix: 'gwanggyo',
    hyperpubSlug: 'highpub',
    pricePrefix: 'entertainment-',
  },
  yeongtong: {
    id: 'yeongtong',
    name: '영통',
    nameEn: 'Yeongtong',
    domain: 'yeongtongkaraoke.com',
    keyword: '가라오케',
    description: '영통 가라오케 하이퍼블릭 정보',
    urlPrefix: 'yeongtong',
    hyperpubSlug: 'highpub',
    pricePrefix: 'entertainment-',
  },
  anyang: {
    id: 'anyang',
    name: '안양',
    nameEn: 'Anyang',
    domain: 'anyangkaraoke.com',
    keyword: '가라오케',
    description: '안양 가라오케 하이퍼블릭 정보',
    urlPrefix: 'anyang',
    hyperpubSlug: 'highpub',
    pricePrefix: 'entertainment-',
  },
  suji: {
    id: 'suji',
    name: '수지',
    nameEn: 'Suji',
    domain: 'sujikaraoke.com',
    keyword: '가라오케',
    description: '수지 가라오케 하이퍼블릭 정보',
    urlPrefix: 'suji',
    hyperpubSlug: 'highpub',
    pricePrefix: 'entertainment-',
  },
  pyeongchon: {
    id: 'pyeongchon',
    name: '평촌',
    nameEn: 'Pyeongchon',
    domain: 'pc-karaoke.com',
    keyword: '가라오케',
    description: '평촌 가라오케 하이퍼블릭 정보',
    urlPrefix: 'pyeongchon',
    hyperpubSlug: 'highpub',
    pricePrefix: 'entertainment-',
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

// 서비스 타입 정의
export type ServiceType = 'hyperpublic' | 'karaoke' | 'hostbar' | 'shirtsroom' | 'roomsalon' | 'kimonoroom' | 'price' | 'beginner';

// 지역별 서비스 경로 생성 함수
export function getServicePath(regionId: RegionId, service: ServiceType): string {
  const region = REGIONS[regionId];
  const prefix = region.urlPrefix;

  switch (service) {
    case 'hyperpublic':
      return `/${prefix}-${region.hyperpubSlug}-guide`;
    case 'karaoke':
      return `/${prefix}-karaoke-guide`;
    case 'hostbar':
      return `/${prefix}-hostbar-guide`;
    case 'shirtsroom':
      return `/${prefix}-shirtsroom-guide`;
    case 'roomsalon':
      return `/${prefix}-room-salon-guide`;
    case 'kimonoroom':
      return `/${prefix}-kimono-room-guide`;
    case 'price':
      return `/${prefix}-${region.pricePrefix}price-guide`;
    case 'beginner':
      return `/${prefix}-${region.pricePrefix}beginner-guide`;
    default:
      return '/';
  }
}

// 지역별 키워드 매핑 (콘텐츠 내 링크 생성용)
// 키워드별 서비스 타입과 우선순위
export const LINK_KEYWORDS: Record<string, { service: ServiceType; priority: number }> = {
  '하이퍼블릭': { service: 'hyperpublic', priority: 1 },
  '가라오케': { service: 'karaoke', priority: 2 },
  '노래방': { service: 'karaoke', priority: 3 },
  '셔츠룸': { service: 'shirtsroom', priority: 4 },
  '룸살롱': { service: 'roomsalon', priority: 5 },
  '기모노룸': { service: 'kimonoroom', priority: 6 },
  '가격': { service: 'price', priority: 7 },
  '요금': { service: 'price', priority: 8 },
  '초보자': { service: 'beginner', priority: 9 },
  '처음': { service: 'beginner', priority: 10 },
};
