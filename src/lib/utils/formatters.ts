export function formatEmail(email: string): string {
    const [username, domain] = email.split('@');
    const firstPart = username.slice(0, 4); 
    const lastPart = username.slice(-1);
    const obfuscatedPart = '*****';
    return `${firstPart}${obfuscatedPart}${lastPart}@${domain}`;
}