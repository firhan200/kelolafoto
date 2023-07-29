import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { socket } from './../PostList/socket';

export default function AddPost(){
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const queryClient = new useQueryClient();

    const mutation = useMutation(async () => {
        const module = await import('./addNewPost');
        const res = await module.default(title, body);

        return res;
    }, {
        onSuccess:() => {
            queryClient.invalidateQueries('posts');

            socket.emit('posts', {
                title: title,
                body: body
            });

            //reset
            setTitle('');
            setBody('');
        },
    });

    async function submit(e){
        e.preventDefault();
        await mutation.mutate();
    }

    return (
        <form className="dark:text-slate-300" onSubmit={submit}>
            <div className="text-xl font-bold mb-4">Create New Post!</div>
            <div className="mb-4">
                <div className="font-bold text-md">Post Title</div>
                <input disabled={mutation.isLoading} className="p-2 dark:bg-slate-600 rounded-sm w-full shadow-xl" value={title} onChange={e => setTitle(e.target.value)} required maxLength={100}/>
            </div>
            <div className="mb-4">
                <div className="font-bold text-md">Body</div>
                <textarea disabled={mutation.isLoading} className="p-2 dark:bg-slate-600 rounded-sm w-full shadow-xl" value={body} onChange={e => setBody(e.target.value)} required maxLength={500}></textarea>
            </div>
            <div className="mb-4 text-end">
                <button disabled={mutation.isLoading} type="submit" className="btn dark:bg-slate-600 p-2 rounded-sm shadow-xl">
                    { mutation.isLoading ? 'Submitting...' : 'Submit' }
                </button>
            </div>
        </form>
    );
}