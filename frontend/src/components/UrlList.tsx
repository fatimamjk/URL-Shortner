import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

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
    try {
      const res = await axios.get("http://localhost:3000/api/url/all");
      console.log("Fetched URLs:", res.data);
      setUrls(res.data);
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleDelete = async (code: string) => {
    try {
      console.log("Deleting URL with code:", code);
      await axios.delete(`http://localhost:3000/api/url/${code}`);
      fetchUrls();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleUpdate = async (code: string) => {
    try {
      console.log("Updating URL with code:", code, "to:", editUrl);
      await axios.put(`http://localhost:3000/api/url/${code}`, {
        url: editUrl,
      });
      setEditingCode(null);
      fetchUrls();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="space-y-4">
      {urls.map((item) => {
        console.log("Rendering item with shortCode:", item.shortCode);
        return (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="relative bg-white dark:bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
              <CardContent className="pt-4">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">Long:</span> {item.url}
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  <span className="font-semibold">Short:</span>{" "}
                  <a
                    href={`http://localhost:3000/${item.shortCode}`}
                    target="_blank"
                    className="underline hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    {item.shortCode}
                  </a>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Accesses:</span>{" "}
                  {item.accessCount}
                </p>
              </CardContent>
              <CardFooter className="flex gap-2">
                {editingCode === item.shortCode ? (
                  <>
                    <Input
                      type="text"
                      value={editUrl}
                      onChange={(e) => {
                        console.log("Editing URL:", e.target.value);
                        setEditUrl(e.target.value);
                      }}
                      className="border-none bg-gray-100 dark:bg-gray-700 rounded-lg"
                    />
                    <Button
                      onClick={() => handleUpdate(item.shortCode)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      ✅ Save
                    </Button>
                    <Button
                      onClick={() => setEditingCode(null)}
                      variant="outline"
                      className="text-gray-600 dark:text-gray-300"
                    >
                      ❌ Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        console.log("Entering edit mode for:", item.shortCode);
                        setEditingCode(item.shortCode);
                        setEditUrl(item.url);
                      }}
                      variant="outline"
                      className="text-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900"
                    >
                      ✏️ Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(item.shortCode)}
                      variant="destructive"
                      className="hover:bg-red-700"
                    >
                      🗑️ Delete
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default UrlList;
