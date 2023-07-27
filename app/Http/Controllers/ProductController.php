<?php

namespace App\Http\Controllers;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(){
        $products = Product::all();

        return View('products.index', [
            'data' => $products
        ]);
    }

    public function add(){
        return View('products.add');
    }

    public function submit(Request $request){
        //insert
        $product = Product::create([
            'name' => $request->name,
            'short_description' => $request->short_description,
            'price' => $request->price
        ]);

        return redirect('/');
    }
}
