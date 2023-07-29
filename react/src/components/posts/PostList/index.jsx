import { useQueryClient, useQuery } from 'react-query';
import PerPost from "../PerPost";

const API_URL = import.meta.env.VITE_API_URL

export default function PostList(){
    // Queries
    const { isFetching, data, isLoading, isError, error } = useQuery('posts', async () => {
        const res = await fetch(`${API_URL}/posts`);
        const jsonBody = await res.json();
        return jsonBody
    })

    if(isLoading){
        return <div className='dark:text-slate-300 text-center'>Loading...</div>
    }

    if(isError){
        return <div className='dark:text-slate-300 text-center'>{ error.message }</div>
    }

    return (
        <div className="dark:text-slate-300">
            <div className="text-xl font-bold">
                Feeds
                { isFetching ? <span className='dark:text-slate-300'>...</span> : '' }
            </div>
            {
                data.data.map((post) => (
                    <PerPost post={post} key={post.id}/>
                ))
            }
        </div>
    );
}