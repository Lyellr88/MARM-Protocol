// src/search.js
export async function performGoogleSearch(query) {
    console.warn("Google Search function not yet implemented.");
    return `[Search for "${query}" not yet implemented.]`;
}

export function queryNeedsExternalKnowledge(query) {
    // For now, let's say no query needs external knowledge by default
    // You'll add actual logic here later
    return false;
}
