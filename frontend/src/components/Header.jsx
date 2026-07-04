function Header({ darkMode, setDarkMode }) {
  return (
    <div className="header">
      <h2>✨ To-Do App</h2>

      <button className="toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
}

export default Header;