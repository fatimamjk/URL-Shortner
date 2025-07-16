import UrlForm from "./components/UrlForm";
import UrlList from "./components/UrlList";
import { useState } from "react";

function App() {
  const [refresh, setRefresh] = useState(false);
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        🔗 URL Shortener
      </h1>
      <UrlForm onUrlCreated={() => setRefresh(!refresh)} />
      <UrlList key={refresh ? "1" : "0"} />
    </div>
  );
}

export default App;
