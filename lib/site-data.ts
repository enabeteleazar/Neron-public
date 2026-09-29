import raw from '../site-data.json';

export type SiteData = typeof raw;

const siteData = raw as SiteData;

export default siteData;
