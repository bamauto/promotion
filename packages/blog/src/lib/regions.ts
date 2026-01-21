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
