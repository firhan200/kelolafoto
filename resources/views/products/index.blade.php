@extends('./layout')

@section('content')
<div class="flex items-center">
    <p class="text-xl mr-4">All Products</p>
    <a href="{{ url('/products/add') }}" class="btn btn-sm bg-slate-700 px-6 py-2 rounded-lg">Add New</a>
</div>
    
<table class="w-full">
    <thead>
        <tr class="text-left">
            <th class="p-4">Name</th>
            <th class="p-4">Short Description</th>
            <th class="p-4">Price</th>
        </tr>
    </thead>
    <tbody>
    @foreach($data as $product)
    <tr class="border-b-2 border-slate-700">
        <td class="p-4">{{ $product->name }}</td>
        <td class="p-4">{{ $product->short_description }}</td>
        <td class="p-4">{{ $product->price }}</td>
    </tr>
    @endforeach
    </tbody>
</table>

@endsection