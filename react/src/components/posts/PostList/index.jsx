import { useQuery, useQueryClient } from 'react-query';
import PerPost from "../PerPost";
import { socket } from './socket';
import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL

export default function PostList(){
    const [isConnect, setIsConnected] = useState(false);

    const queryClient = useQueryClient();

    useEffect(() => {
        function onConnect() {
          setIsConnected(true);
        }
    
        function onDisconnect() {
          setIsConnected(false);
        }

        function listenPosts(value) {
            queryClient.invalidateQueries('posts');
        }
    
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('posts', listenPosts);

        return () => {
          socket.off('connect', onConnect);
          socket.off('disconnect', onDisconnect);
          socket.off('posts');
        };
    }, []);

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
                All Feeds
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