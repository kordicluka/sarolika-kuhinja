// DashboardNewPost.js
import DashboardNewPostForm from "@/components/dashboard/post/DashboardNewPostForm";
import "@/styles/DashboardItem.scss";
import prisma from "@/utils/db";

export default async function DashboardNewPost({ params }) {
  const { id } = params;

  let item;

  if (id !== "nova-objava") {
    item = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });

    // Parse the sections field
    if (item && item.sections) {
      try {
        item.sections = JSON.parse(item.sections);
      } catch (error) {
        console.error("Error parsing sections JSON:", error);
        item.sections = [];
      }
    }
  }

  return (
    <div className="dashboard-item">
      <div className="dashboard-item-edit">
        <DashboardNewPostForm post={item} />
      </div>
    </div>
  );
}
