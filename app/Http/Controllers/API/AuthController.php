<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Validator;
use Auth;

class AuthController extends Controller
{
    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required',
            'password' => 'required',
            'confirm_password' => 'required|same:password'
        ]);

        if($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => 'error appeared',
                'data' => $validator->errors()
            ]);
        }

        //collect input
        $inputs = $request->all();
        $name = $inputs['name'];
        $email = $inputs['email'];
        $password = bcrypt($inputs['password']);

        //check if email already taken
        $email_exist = User::where('email', $email)->first();
        if($email_exist != null){
            return response()->json([
                'success' => false,
                'message' => 'error appeared',
                'data' => 'email already taken'
            ]);
        }

        //insert user
        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => $password,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'successfully create user',
            'data' => [
                'name' => $name,
                'email' => $email
            ]
        ]);
    }

    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'success' => false,
                'message' => 'error appeared',
                'data' => $validator->errors()
            ]);
        }

        //collect input
        $inputs = $request->all();
        $email = $inputs['email'];
        $password = $inputs['password'];

        //find user
        $user = User::where('email', $email)->first();
        if($user == null){
            return response()->json([
                'success' => false,
                'message' => 'error appear',
                'data' => 'User doest not exist'
            ]);
        }

        //attemp auth API
        $auth = Auth::attempt([
            'email' => $email,
            'password' => $password
        ]);

        //check if auth success
        if(!$auth){
            return response()->json([
                'success' => false,
                'message' => 'login failed',
                'data' => 'Email or Password Incorrect'
            ]);
        }

        //get user auth
        $auth = Auth::user();

        //login success
        return response()->json([
            'success' => true,
            'message' => 'login success',
            'data' => [
                'name' => $user->name,
                'email' => $user->email,
                'token' => $auth->createToken('auth_token')->plainTextToken
            ]
        ]);
    }
}
