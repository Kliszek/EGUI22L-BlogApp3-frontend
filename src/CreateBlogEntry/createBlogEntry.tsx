import { useParams } from "react-router-dom";

export const CreateBlogEntry = () => {
  const { blogId } = useParams();
  
  return (
    <div>
      Creating a blog entry for blog {blogId}
    </div>
  );
};

export default CreateBlogEntry;