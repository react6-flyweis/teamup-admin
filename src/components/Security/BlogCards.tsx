import { useState } from "react";
import CalendarIcon from "../../assets/icons/CalendarIcon";
import gamePanel1 from "@/assets/game-panel1.png";
import gamePanel2 from "@/assets/game-panel2.png";
import gamePanel3 from "@/assets/game-panel3.png";
import AddBlogModal from "./AddBlogModal";
import EditBlogModal from "./EditBlogModal";

interface Blog {
  id: number;
  image: string;
  headline: string;
  subHeadline: string;
  description: string;
  date: string;
}

const initialBlogs: Blog[] = [
  {
    id: 1,
    image: gamePanel1,
    headline: "Headline...",
    subHeadline: "Sub-headline",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    date: "March 16 2025"
  },
  {
    id: 2,
    image: gamePanel2,
    headline: "Headline...",
    subHeadline: "Sub-headline",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    date: "March 16 2025"
  },
  {
    id: 3,
    image: gamePanel3,
    headline: "Headline...",
    subHeadline: "Sub-headline",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    date: "March 16 2025"
  }
];

const BlogCards = () => {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  const handleAddBlog = (blogData: { headline: string; subHeadline: string; description: string; image: string }) => {
    const newBlog: Blog = {
      id: blogs.length + 1,
      ...blogData,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    };
    setBlogs([...blogs, newBlog]);
    setIsAddModalOpen(false);
  };

  const handleEditBlog = (updatedBlog: Blog) => {
    setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog));
    setEditingBlog(null);
  };

  return (
    <div className="text-white">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-[22px] leading-[18px] font-bold font-poppins text-white">
          Our blogs
        </h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center px-5 py-4 bg-[#E1017D] rounded-[10px] text-white font-semibold text-base font-poppins hover:bg-[#c0016a] transition-colors"
          style={{ width: 113, height: 40 }}
        >
          Add Blog
        </button>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="relative w-auto h-[600px] rounded-lg overflow-hidden">
            {/* Background Image */}
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${blog.image})` }}
            />

            {/* Glasmorphic Header */}
            <div
              className="
                absolute top-0 left-0 right-0 h-16
                bg-black/75 bg-opacity-20
                border-b border-white/20
                flex items-center justify-between  px-6
                z-10
              "
            >
              <div className="flex items-center gap-6">
                <CalendarIcon size={24} color="#FFFFFF" />
                <span className="text-xl font-normal text-white" style={{ fontFamily: 'Noir Pro' }}>
                  {blog.date}
                </span>
                <div className="w-0.5 h-7 bg-white"></div>
                <button
                  onClick={() => setEditingBlog(blog)}
                  className="text-xl font-normal text-white hover:text-gray-300 transition-colors"
                  style={{ fontFamily: 'Noir Pro' }}
                >
                  Edit
                </button>
              </div>
            </div>
            {/* Rest of card content (such as headline, description, etc.) goes here */}
          </div>
        ))}
      </div>

      {/* Add Blog Modal */}
      {isAddModalOpen && (
        <AddBlogModal
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddBlog}
        />
      )}

      {/* Edit Blog Modal */}
      {editingBlog && (
        <EditBlogModal
          blog={editingBlog}
          onClose={() => setEditingBlog(null)}
          onSave={handleEditBlog}
        />
      )}
    </div>
  );
};

export default BlogCards;
