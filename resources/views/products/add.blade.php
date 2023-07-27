@extends('./layout')

@section('content')
<div class="flex items-center">
    <p class="text-xl mr-4">Add Products</p>
    <a href="{{ url('/') }}" class="btn btn-sm bg-slate-700 px-6 py-2 rounded-lg">Back</a>
</div>
    
<form method="POST" action="{{ url('/products/add') }}" class="mt-6">
    @csrf
    <div class="mb-3 flex flex-col">
        <b>Product Name</b>
        <input name="name" type="text" class="p-4 bg-slate-700" maxlength="100" required/>
    </div>
    <div class="mb-3 flex flex-col">
        <b>Short Description</b>
        <textarea name="short_description" class="p-4 bg-slate-700" maxlength="200" required></textarea>
    </div>
    <div class="mb-3 flex flex-col">
        <b>Price</b>
        <input name="price" type="number" class="p-4 bg-slate-700" maxlength="6" required/>
    </div>
    <div class="mt-6 text-end">
        <button type="submit" class="btn btn-sm bg-slate-700 px-6 py-2 rounded-lg">Submit</button>
    </div>
</form>
    
@endsection