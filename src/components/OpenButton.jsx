export default function OpenButton({ source, children, className = "", ...props }) {
  function handleClick() {
    window.open(source, "_blank", "noopener,noreferrer");
  }

  return (
    <button
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}
