export type CountryCode = {
    name: string;
    code: string;
    flag: string;
    iso: string;
};

export const countryCodes: CountryCode[] = [
    { name: 'India', code: '91', flag: '🇮🇳', iso: 'IN' },
    { name: 'USA/Canada', code: '1', flag: '🇺🇸', iso: 'US' },
    { name: 'UK', code: '44', flag: '🇬🇧', iso: 'GB' },
    { name: 'Australia', code: '61', flag: '🇦🇺', iso: 'AU' },
    { name: 'Germany', code: '49', flag: '🇩🇪', iso: 'DE' },
    { name: 'France', code: '33', flag: '🇫🇷', iso: 'FR' },
    { name: 'UAE', code: '971', flag: '🇦🇪', iso: 'AE' },
    { name: 'Japan', code: '81', flag: '🇯🇵', iso: 'JP' },
    { name: 'China', code: '86', flag: '🇨🇳', iso: 'CN' },
    { name: 'Brazil', code: '55', flag: '🇧🇷', iso: 'BR' },
    { name: 'Russia', code: '7', flag: '🇷🇺', iso: 'RU' },
    { name: 'South Africa', code: '27', flag: '🇿🇦', iso: 'ZA' },
    { name: 'Singapore', code: '65', flag: '🇸🇬', iso: 'SG' },
    { name: 'Canada', code: '1', flag: '🇨🇦', iso: 'CA' },
    { name: 'Spain', code: '34', flag: '🇪🇸', iso: 'ES' },
    { name: 'Italy', code: '39', flag: '🇮🇹', iso: 'IT' },
    { name: 'Netherlands', code: '31', flag: '🇳🇱', iso: 'NL' },
    { name: 'Switzerland', code: '41', flag: '🇨🇭', iso: 'CH' },
    { name: 'Sweden', code: '46', flag: '🇸🇪', iso: 'SE' },
    { name: 'New Zealand', code: '64', flag: '🇳🇿', iso: 'NZ' },
    { name: 'Mexico', code: '52', flag: '🇲🇽', iso: 'MX' },
    { name: 'Bangladesh', code: '880', flag: '🇧🇩', iso: 'BD' },
    { name: 'Pakistan', code: '92', flag: '🇵🇰', iso: 'PK' },
    { name: 'Sri Lanka', code: '94', flag: '🇱🇰', iso: 'LK' },
    { name: 'Nepal', code: '977', flag: '🇳🇵', iso: 'NP' },
    { name: 'Other', code: '', flag: '🌍', iso: 'XX' },
];

export const getCountryFlag = (code: string) => {
    const found = countryCodes.find((c) => c.code === code);
    return found ? found.flag : '🌍';
};
