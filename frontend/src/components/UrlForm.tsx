import { useState } from "react";
import axios from "axios";

interface Props {
  onUrlCreated: () => void;
}

const UrlForm: React.FC<Props> = ({ onUrlCreated }) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/url", { url });
      setUrl("");
      onUrlCreated();
    } catch (err) {
      setError("Failed to shorten URL");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
      <input
        type="url"
        placeholder="Enter URL"
        required
        className="p-2 border rounded"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Shorten URL
      </button>
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
};

export default UrlForm;
