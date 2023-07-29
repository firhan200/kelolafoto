export default function PerPost({ post }){
    return <div className="dark:bg-slate-700 p-4 mb-6 rounded-md">
        <div className="font-bold">{ post.title }</div>
        <div className="mb-4">{ post.body }</div>
    </div>
}