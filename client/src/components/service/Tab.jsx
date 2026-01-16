export default function Tab({ label, route }) {
    const handleClick = () => {
        window.location.href = route; 
    }

    return (
        <button onClick={handleClick}>
            {label}
        </button>
    );
}