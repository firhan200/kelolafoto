import AddPost from "./AddPost";
import PostList from "./PostList";

export default function Posts(){
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="col-span-1 md:col-span-2 xl:col-span-1">
                <div className="md:sticky top-0 w-100">
                    <AddPost />
                </div>
            </div>
            <div className="md:col-span-2 xl:col-span-3">
                <PostList />
            </div>
        </div>
    )
}