
export default function sortCats(d) {
    return d.sort((a, b) => (typeof b.values === 'object' ? Object.keys(b.values).length : 0 - (typeof a.values === 'object' ? Object.keys(a.values).length : 0)))
}