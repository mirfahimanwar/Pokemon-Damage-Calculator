import { TYPE_COLORS } from '../utils/damage';

export default function TypeBadge({ type, size = 'sm' }) {
    if (!type) return null;
    const colors = TYPE_COLORS[type] || { bg: '#888', text: '#fff' };
    const padding = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

    return (
        <span
            className={`inline-block rounded font-semibold tracking-wide ${padding}`}
            style={{ backgroundColor: colors.bg, color: colors.text }}
        >
            {type}
        </span>
    );
}
