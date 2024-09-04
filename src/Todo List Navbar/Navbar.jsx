import todoImg from "./assets/todoImg.png";

function Navbar() {
  return (
    <>
      <header className="todo-list-header">
        <nav>
          <img src={todoImg} alt="Navbar Logo" />
          <h1>TODO LIST</h1>
        </nav>
      </header>
    </>
  );
}

export default Navbar;