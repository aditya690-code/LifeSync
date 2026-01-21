export default function Tab({ label, route }) {
    const handleClick = () => {
        window.location.href = route; 
    }

    return (
        <button onClick={handleClick} className="bg-none border-none h-fit w-fit outline-none cursor-pointer">
            {label}
        </button>
    );
}