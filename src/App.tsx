import { useState } from "react";

const App = () => {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => setClicked((prev) => !prev);
  return (
    <div className="flex flex-col m-5 gap-4">
      <h1 className="text-3xl font-bold underline">App</h1>
      <div className="flex gap-4 items-center">
        <button
          onClick={handleClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded"
        >
          Click me
        </button>
        <p className="text-gray-700">{clicked ? "on" : "off"}</p>
      </div>
    </div>
  );
};

export default App;
