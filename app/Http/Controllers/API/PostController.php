<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Str;
use Response;

class PostController extends Controller
{
    public function index(){
        $posts = Post::orderBy('created_at', 'desc')->get();

        return Response::json([
            'success' => true,
            'data' => $posts
        ]);
    }

    public function create(Request $request){
        $post = new Post();
        $post->title = $request->title;
        $post->slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $request->title)));;
        $post->body = $request->body;
        $post->unique_id = Str::orderedUuid();
        $post->save();

        return Response::json([
            'success' => true,
            'data' => $post
        ]);
    }
}
