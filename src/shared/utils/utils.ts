
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371000; // Radio de la Tierra en metros
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distancia en metros

    return distance;
}

export const formatUTCDateToCalendarFormat = (utc_date: string | Date) => {
    const date = new Date(utc_date);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')
        }/${date.getFullYear()}`;
    return formattedDate;
}

export const formatUTCDateToTimePassed = (utc_date: string | Date): string => {
    const date = typeof utc_date === "string" ? new Date(utc_date) : utc_date;
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();

    if (diffMs < 0) return "";

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return `hace ${years} año${years > 1 ? "s" : ""}`;
    if (months > 0) return `hace ${months} mes${months > 1 ? "es" : ""}`;
    if (days > 0) return `hace ${days} día${days > 1 ? "s" : ""}`;
    if (hours > 0) return `hace ${hours} hora${hours > 1 ? "s" : ""}`;
    if (minutes > 0) return `hace ${minutes} minuto${minutes > 1 ? "s" : ""}`;
    return `hace ${seconds} segundo${seconds !== 1 ? "s" : ""}`;
};
