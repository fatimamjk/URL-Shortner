import { useEffect, useState } from "react";
import axios from "axios";

interface UrlType {
  _id: string;
  url: string;
  shortCode: string;
  accessCount: number;
}

const UrlList: React.FC = () => {
  const [urls, setUrls] = useState<UrlType[]>([]);
  const [editingCode, setEditingCode] = useState<string | null>(null);
  const [editUrl, setEditUrl] = useState("");

  const fetchUrls = async () => {
    const res = await axios.get("http://localhost:3000/api/url/all");
    setUrls(res.data);
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleDelete = async (code: string) => {
    await axios.delete(`http://localhost:3000/api/url/${code}`);
    fetchUrls();
  };

  const handleUpdate = async (code: string) => {
    await axios.put(`http://localhost:3000/api/url/${code}`, { url: editUrl });
    setEditingCode(null);
    fetchUrls();
  };

  return (
    <ul className="space-y-3">
      {urls.map((item) => (
        <li
          key={item._id}
          className="border p-3 rounded flex justify-between items-center"
        >
          <div className="text-sm">
            <p className="text-gray-700">Long: {item.url}</p>
            <p className="text-blue-700">
              Short:{" "}
              <a
                href={`http://localhost:3000/${item.shortCode}`}
                target="_blank"
              >
                {item.shortCode}
              </a>
            </p>
            <p className="text-gray-500">Accesses: {item.accessCount}</p>
          </div>

          {editingCode === item.shortCode ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={editUrl}
                onChange={(e) => setEditUrl(e.target.value)}
                className="border p-1 rounded"
              />
              <button
                onClick={() => handleUpdate(item.shortCode)}
                className="text-green-600"
              >
                ✅ Save
              </button>
              <button
                onClick={() => setEditingCode(null)}
                className="text-gray-500"
              >
                ❌ Cancel
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setEditingCode(item.shortCode);
                  setEditUrl(item.url);
                }}
                className="text-yellow-600"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(item.shortCode)}
                className="text-red-600"
              >
                🗑️ Delete
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default UrlList;
